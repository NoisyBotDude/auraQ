import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Shared Components
import NavBar from './components/shared/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <QuizProvider>
            <NotificationProvider>
              <AudioProvider>
                <div>
                  
                </div>
                <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
                  {/* <NavBar /> */}
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/quiz/:quizId" element={<QuizPlayPage />} />
                    <Route path="/create" element={<QuizCreationPage />} />
                    {/* Add more routes as needed */}
                  </Routes>
                </div>
              </AudioProvider>
            </NotificationProvider>
          </QuizProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
