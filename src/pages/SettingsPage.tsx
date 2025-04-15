import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts';
import { FaSun, FaMoon, FaSignOutAlt, FaMusic, FaVolumeUp, FaBell, FaTrophy } from 'react-icons/fa';
import BackButton from '../components/shared/BackButton';

const FaSun1 = FaSun as React.FC<React.SVGProps<SVGSVGElement>>;
const FaMoon1 = FaMoon as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignOutAlt1 = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FaMusic1 = FaMusic as React.FC<React.SVGProps<SVGSVGElement>>;
const FaVolumeUp1 = FaVolumeUp as React.FC<React.SVGProps<SVGSVGElement>>;
const FaBell1 = FaBell as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;

const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Add state for other toggles
  const [settings, setSettings] = useState({
    backgroundMusic: true,
    soundEffects: true,
    quizReminders: true,
    achievementAlerts: true
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <BackButton />

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] hover:bg-gradient-to-r hover:from-[#6366f1] hover:via-[#8b5cf6] hover:to-[#ec4899] transition-all duration-300">
            Settings
          </h1>
          <p className="text-gray-400">Customize your AuraQ experience</p>
        </motion.div>

        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10 group hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
            {/* Theme Toggle */}
            <div className="mb-8 group">
              <h2 className="text-xl font-semibold text-white mb-4 group-hover:text-[#3b82f6] transition-colors duration-300">Appearance</h2>
              <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 hover:bg-[#2d2f3d]/70 hover:border-[#3b82f6]/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Theme</div>
                </div>
                <motion.button
                  onClick={toggleTheme}
                  className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1 hover:bg-[#3b82f6]/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                    initial={{ y: -12 }}
                    animate={{ x: isDarkMode ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <FaMoon1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    ) : (
                      <FaSun1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Sound Settings */}
            <div className="mb-8 group">
              <h2 className="text-xl font-semibold text-white mb-4 group-hover:text-[#3b82f6] transition-colors duration-300">Sound</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 hover:bg-[#2d2f3d]/70 hover:border-[#3b82f6]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Background Music</div>
                  </div>
                  <motion.button
                    onClick={() => toggleSetting('backgroundMusic')}
                    className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1 hover:bg-[#3b82f6]/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                      initial={{ y: -12 }}
                      animate={{ x: settings.backgroundMusic ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <FaMusic1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 hover:bg-[#2d2f3d]/70 hover:border-[#3b82f6]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Sound Effects</div>
                  </div>
                  <motion.button
                    onClick={() => toggleSetting('soundEffects')}
                    className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1 hover:bg-[#3b82f6]/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                      initial={{ y: -12 }}
                      animate={{ x: settings.soundEffects ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <FaVolumeUp1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-8 group">
              <h2 className="text-xl font-semibold text-white mb-4 group-hover:text-[#3b82f6] transition-colors duration-300">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 hover:bg-[#2d2f3d]/70 hover:border-[#3b82f6]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Quiz Reminders</div>
                  </div>
                  <motion.button
                    onClick={() => toggleSetting('quizReminders')}
                    className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1 hover:bg-[#3b82f6]/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                      initial={{ y: -12 }}
                      animate={{ x: settings.quizReminders ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <FaBell1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 hover:bg-[#2d2f3d]/70 hover:border-[#3b82f6]/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Achievement Alerts</div>
                  </div>
                  <motion.button
                    onClick={() => toggleSetting('achievementAlerts')}
                    className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1 hover:bg-[#3b82f6]/30 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300"
                      initial={{ y: -12 }}
                      animate={{ x: settings.achievementAlerts ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <FaTrophy1 className="text-[#3b82f6] group-hover:text-[#3b82f6] transition-colors duration-300" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4 border-t border-white/10 group">
              <motion.button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt1 className="text-lg group-hover:rotate-0 transition-transform duration-300" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage; 