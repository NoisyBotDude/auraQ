import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { 
  FaCompass, 
  FaPlus, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTimes,
  FaUsers
} from 'react-icons/fa';

const FaCompass1 = FaCompass as React.FC<React.SVGProps<SVGSVGElement>>;
const FaPlus1 = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUser1 = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCog1 = FaCog as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignOutAlt1 = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignInAlt1 = FaSignInAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlus1 = FaUserPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTimes1 = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUsers1 = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#1a1a2e] shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                <FaTimes1 className="text-white text-xl" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2 mb-8">
                <img src="/auraq1.png" alt="AuraQ Logo" className="w-8 h-8" />
                <span className="text-2xl font-bold text-white">AuraQ</span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {user ? (
                  <>
                    <button
                      onClick={() => handleNavigation('/explore')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaCompass1 className="text-lg" />
                      <span>Explore</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/create')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaPlus1 className="text-lg" />
                      <span>Create Quiz</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/leaderboard')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaTrophy1 className="text-lg" />
                      <span>Leaderboard</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/community')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaUsers1 className="text-lg" />
                      <span>Community</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaUser1 className="text-lg" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/settings')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaCog1 className="text-lg" />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <FaSignOutAlt1 className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
                    >
                      <FaSignInAlt1 className="text-lg" />
                      <span>Login</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/register')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-primary-500 text-white hover:bg-primary-500/10 transition-colors duration-200"
                    >
                      <FaUserPlus1 className="text-lg" />
                      <span>Register</span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 