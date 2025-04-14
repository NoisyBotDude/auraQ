import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

const FaSun1 = FaSun as React.FC<React.SVGProps<SVGSVGElement>>;
const FaMoon1 = FaMoon as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignOutAlt1 = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;

const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
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

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
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
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10">
            {/* Theme Toggle */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>
              <div className="flex items-center justify-between p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">Theme</div>
                </div>
                <motion.button
                  onClick={toggleTheme}
                  className="relative w-16 h-8 rounded-full bg-[#3b82f6]/20 p-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center"
                    initial={{ y: -12 }}
                    animate={{ x: isDarkMode ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <FaMoon1 className="text-[#3b82f6]" />
                    ) : (
                      <FaSun1 className="text-[#3b82f6]" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4 border-t border-white/10">
              <motion.button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt1 className="text-lg" />
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