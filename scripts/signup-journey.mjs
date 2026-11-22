// Walks the whole sign-up journey in a browser and checks an account appears.
import { existsSync } from 'node:fs';
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const API = 'http://localhost:4000/api/v1';
const email = `journey.${Date.now()}@example.com`;

const server = await createServer({ server: { port: 5202, strictPort: true }, logLevel: 'warn' });
await server.listen();
const browser = await puppeteer.launch({
  executablePath: BROWSERS.find((p) => existsSync(p)),
  headless: true,
  args: ['--hide-scrollbars'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const step = (n) => console.log(`  ${n}`);

try {
  await page.goto('http://localhost:5202/onboarding/sign-up', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  step(`1. entering ${email}`);
  await page.locator('input[type=email]').fill(email);
  await page.locator('::-p-text(Continue with email)').click();
  await pause(1200);

  // The code only reaches the server log, so the test reads it back the same way.
  const started = await fetch(`${API}/auth/sign-up/start`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email }),
  }).then((r) => r.json());
  const code = started.data.devCode;
  step(`2. code issued: ${code}`);

  const url = page.url();
  if (!url.includes('/verify')) throw new Error(`expected the verify screen, got ${url}`);
  step('3. landed on the verify screen');

  for (const [i, digit] of [...code].entries()) {
    await page.locator(`input[aria-label="Digit ${i + 1}"]`).fill(digit);
  }
  await page.locator('::-p-text(Verify email)').click();
  await pause(1500);

  if (!page.url().includes('/interests')) throw new Error(`expected interests, got ${page.url()}`);
  step('4. verified, now on interests');
  await page.screenshot({ path: '.screenshots/journey-1-interests.png' });

  await page.locator('::-p-text(Continue)').click();
  await pause(900);
  if (!page.url().includes('/notifications')) throw new Error('expected notifications');
  step('5. on notifications');

  await page.locator('::-p-text(Allow notifications)').click();
  await pause(1500);
  step(`6. finished at ${new URL(page.url()).pathname}`);

  const token = await page.evaluate(() => localStorage.getItem('seedalive:token'));
  if (!token) throw new Error('no session token was stored');
  step('7. session token stored');

  const me = await fetch(`${API}/auth/me`, {
    headers: { authorization: `Bearer ${token}` },
  }).then((r) => r.json());
  step(`8. server says: ${me.data.user.name} <${me.data.user.email}>`);

  await page.goto('http://localhost:5202/account', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await pause(500);
  await page.screenshot({ path: '.screenshots/journey-2-profile.png' });
  step('9. profile screen captured');

  console.log(errors.length ? `\n  page errors: ${errors.join(', ')}` : '\n  no page errors');
} finally {
  await browser.close();
  await server.close();
}
