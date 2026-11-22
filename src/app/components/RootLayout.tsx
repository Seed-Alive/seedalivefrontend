import { Outlet, useLocation } from 'react-router-dom';
import { TabBar } from './TabBar';

// Screens that fill the whole display and hide the tab bar.
const FULLSCREEN = ['/onboarding', '/notifications', '/devotional'];

export function RootLayout() {
  const { pathname } = useLocation();
  const fullscreen = FULLSCREEN.some((p) => pathname.startsWith(p));

  return (
    <>
      <Outlet />
      {!fullscreen && <TabBar />}
    </>
  );
}
