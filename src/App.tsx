import React, { useState, useEffect } from 'react';
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
import AuthenticationPage from './pages/AuthenticationPage';

// Shared Components
import NavBar from './components/shared/NavBar';
import ScrollToTop from './components/shared/ScrollToTop';
import Sidebar from './components/shared/Sidebar';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !['/profile', '/settings', '/create', '/quiz', '/leaderboard', '/play', '/community', '/auth'].includes(location.pathname) && 
                    !location.pathname.startsWith('/quiz/');
  const showSidebar = location.pathname !== '/' && 
                     !location.pathname.startsWith('/quiz/') && 
                     location.pathname !== '/explore' &&
                     location.pathname !== '/auth';
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <ScrollToTop />
      {showNavbar && <NavBar />}
      {showSidebar && <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}
      <main className={`transition-all duration-200 ${
        showSidebar 
          ? openSidebar 
            ? 'ml-64'  // When sidebar is open
            : 'ml-20'  // When sidebar is collapsed
          : ''         // When sidebar is hidden
      }`}>
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
          <Route path="/auth" element={<AuthenticationPage />} />
        </Routes>
      </main>
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
