import { Navigate, Route, Routes } from 'react-router-dom';
import SplashRoute from './SplashRoute';
import LanguageRoute from './LanguageRoute';
import WelcomeRoute from './WelcomeRoute';
import TourRoute from './TourRoute';
import SignUpRoute from './SignUpRoute';
import VerifyEmailRoute from './VerifyEmailRoute';
import InterestsRoute from './InterestsRoute';
import NotificationsRoute from './NotificationsRoute';

// Runs the sign-up journey, from the splash screen through to notifications.
export default function OnboardingRoute() {
  return (
    <Routes>
      <Route index element={<SplashRoute />} />
      <Route path="language" element={<LanguageRoute />} />
      <Route path="welcome" element={<WelcomeRoute />} />
      <Route path="tour" element={<Navigate to="/onboarding/tour/1" replace />} />
      <Route path="tour/:step" element={<TourRoute />} />
      <Route path="sign-up" element={<SignUpRoute />} />
      <Route path="verify" element={<VerifyEmailRoute />} />
      <Route path="interests" element={<InterestsRoute />} />
      <Route path="notifications" element={<NotificationsRoute />} />
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}
