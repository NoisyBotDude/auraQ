import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  AuthProvider,
  ThemeProvider,
  QuizProvider,
  NotificationProvider,
  AudioProvider
} from './contexts';

// Pages
import LandingPage from './pages/LandingPage';
import QuizPlayPage from './pages/QuizPlayPage';
import QuizCreationPage from './pages/QuizCreationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import PlayOnlinePage from './pages/PlayOnlinePage';
import CommunityPage from './pages/CommunityPage';

// Shared Components
import NavBar from './components/shared/NavBar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !['/profile', '/settings', '/create', '/quiz', '/leaderboard', '/play', '/community'].includes(location.pathname) && 
                    !location.pathname.startsWith('/quiz/');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {showNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz/:quizId" element={<QuizPlayPage />} />
        <Route path="/create" element={<QuizCreationPage />} />
        <Route path="/play" element={<PlayOnlinePage />} />
        <Route path="/explore" element={<LandingPage scrollTo="featured" />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <QuizProvider>
            <NotificationProvider>
              <AudioProvider>
                <AppContent />
              </AudioProvider>
            </NotificationProvider>
          </QuizProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
