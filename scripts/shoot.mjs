// Screenshots the running app so the UI can be checked by eye against Figma.
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];

const OUT = '.screenshots';
const PORT = 5199;
const dark = process.argv.includes('--dark');

// Figma draws the phone at 390 wide; 2x keeps small text readable afterwards.
const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/notifications', name: 'home-notifications' },
  { path: '/bible', name: 'bible' },
  { path: '/bible/versions', name: 'bible-versions' },
  { path: '/bible', name: 'bible-1-books', clicks: ['[aria-label="Choose book"]'] },
  { path: '/bible', name: 'bible-2-chapters', clicks: ['[aria-label="Choose book"]', '[data-book="1"]'] },
  { path: '/bible', name: 'bible-3-verses', clicks: ['[aria-label="Choose book"]', '[data-book="1"]', '[data-chapter="2"]'] },
  { path: '/bible', name: 'bible-4-jude-skips', clicks: ['[aria-label="Choose book"]', '[data-book="65"]'] },
  { path: '/bible', name: 'bible-5-jump-to-verse', clicks: ['[aria-label="Choose book"]', '[data-book="19"]', '[data-chapter="23"]', '[data-verse="4"]'] },
  { path: '/sign-in', name: 'signin-1-empty' },
  { path: '/sign-in', name: 'signin-2-rejected', type: [['input[type=email]', 'wrong@example.com'], ['input[type=password]', 'notthepassword']], clicks: ['button[type=submit]'] },
  { path: '/sign-in', name: 'signin-3-accepted', type: [['input[type=email]', 'grace.thompson@example.com'], ['input[type=password]', 'seedalive123']], clicks: ['button[type=submit]'] },
  { path: '/bible', name: 'bible-6-version-sheet', clicks: ['[aria-label="Change version"]'] },
  { path: '/bible', name: 'bible-7-switched-to-ylt', clicks: ['[aria-label="Change version"]', '[data-version="YLT"]'] },
  { path: '/bible', name: 'bible-8-text-bigger', clicks: ['[aria-label="Text size"]'] },
  { path: '/live', name: 'live' },
  { path: '/devotional', name: 'devotional' },
  { path: '/media', name: 'media' },
  { path: '/community', name: 'community' },
  { path: '/shop', name: 'shop' },
  { path: '/hymns', name: 'hymns' },
  { path: '/listen-again', name: 'listen-again' },
  { path: '/account', name: 'account' },
  { path: '/onboarding', name: 'ob-1-splash', quick: true },
  { path: '/onboarding/language', name: 'ob-2-language' },
  { path: '/onboarding/welcome', name: 'ob-3-welcome' },
  { path: '/onboarding/tour/1', name: 'ob-4-tour1' },
  { path: '/onboarding/tour/2', name: 'ob-5-tour2' },
  { path: '/onboarding/tour/3', name: 'ob-6-tour3' },
  { path: '/onboarding/sign-up', name: 'ob-7-signup' },
  { path: '/onboarding/verify', name: 'ob-8-verify' },
  { path: '/onboarding/interests', name: 'ob-9-interests' },
  { path: '/onboarding/notifications', name: 'ob-10-notifications' },
];

// Uses the Chrome or Edge already on this machine instead of downloading one.
function findBrowser() {
  const found = BROWSERS.find((p) => existsSync(p));
  if (!found) throw new Error('No Chrome or Edge found. Add its path to BROWSERS.');
  return found;
}

// Clears only this theme's images so a light run does not wipe the dark one.
function clearStale() {
  mkdirSync(OUT, { recursive: true });
  for (const f of readdirSync(OUT)) {
    const isDark = f.includes('-dark.');
    if (f.endsWith('.png') && isDark === dark) rmSync(`${OUT}/${f}`, { force: true });
  }
}

// Waits for webfonts, which change text size and would make a shot misleading.
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 150));
}

// Hides the tab bar, which floats above everything and spoils section shots.
async function hideTabBar(page) {
  await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Primary"]');
    if (nav instanceof HTMLElement) nav.style.display = 'none';
  });
}

// The UI kit page is far too tall to read at once, so each block is shot alone.
async function shootSections(page, suffix) {
  const sections = await page.$$('section');
  console.log(`ui: ${sections.length} sections`);
  for (const [i, el] of sections.entries()) {
    const title = await el.evaluate((n) => (n.textContent ?? '').trim().slice(0, 24));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const n = String(i + 1).padStart(2, '0');
    await el.screenshot({ path: `${OUT}/ui-${n}-${slug}${suffix}.png` });
  }
}

// Headless Chrome defaults to dark, so the theme is always set on purpose.
async function setTheme(page) {
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' },
  ]);
}

// Serves from source rather than dist, so a shot always matches the current code.
const server = await createServer({
  server: { port: PORT, strictPort: true },
  logLevel: 'warn',
});
await server.listen();

const browser = await puppeteer.launch({
  executablePath: findBrowser(),
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb'],
});

try {
  clearStale();

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await setTheme(page);

  const suffix = dark ? '-dark' : '';
  const base = `http://localhost:${PORT}`;
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto(`${base}/ui`, { waitUntil: 'networkidle0' });
  await settle(page);
  await hideTabBar(page);
  await shootSections(page, suffix);

  for (const route of ROUTES) {
    const until = route.quick ? 'domcontentloaded' : 'networkidle0';
    await page.goto(base + route.path, { waitUntil: until });
    await settle(page);
    // Some states need text typed in before the tap, such as signing in.
    for (const [selector, value] of route.type ?? []) {
      await page.locator(selector).fill(value);
    }
    // Some states only exist after tapping through, such as book then chapter.
    for (const selector of route.clicks ?? []) {
      await page.locator(selector).click();
      await new Promise((r) => setTimeout(r, 900));
    }
    await page.screenshot({ path: `${OUT}/route-${route.name}${suffix}.png` });
  }

  if (errors.length) {
    console.log(`\n${errors.length} console/page errors:`);
    for (const e of [...new Set(errors)].slice(0, 10)) console.log('  -', e);
  } else {
    console.log('\nno console or page errors');
  }
  console.log(`screenshots -> ${OUT}/`);
} finally {
  await browser.close();
  await server.close();
}
