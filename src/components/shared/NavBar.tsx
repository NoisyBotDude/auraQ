import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCompass, 
  FaPlus, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaUsers
} from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const FaCompass1 = FaCompass as React.FC<React.SVGProps<SVGSVGElement>>;
const FaPlus1 = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUser1 = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCog1 = FaCog as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignOutAlt1 = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSignInAlt1 = FaSignInAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlus1 = FaUserPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const FaBars1 = FaBars as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTimes1 = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUsers1 = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isShrunk, setIsShrunk] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleNav = () => {
    setIsShrunk(!isShrunk);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className="text-white p-4 shadow-lg backdrop-blur-md bg-black/30 rounded-full mt-4 mx-5 fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity duration-200">
            <img src="/auraq1.png" alt="AuraQ Logo" className="w-8 h-8" />
            AuraQ
          </Link>

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBars1 className="text-xl" />
              </motion.button>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <motion.div
                className="flex items-center space-x-6"
                initial={{ opacity: 1, x: 0 }}
                animate={{ 
                  opacity: isShrunk ? 0 : 1,
                  x: isShrunk ? 20 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                {user ? (
                  <>
                    <Link to="/explore" className="flex items-center gap-2 hover:scale-105 hover:text-[#3b82f6] transition-all duration-200">
                      <FaCompass1 className="text-lg" />
                      <span>Explore</span>
                    </Link>
                    <Link to="/create" className="flex items-center gap-2 hover:scale-105 hover:text-[#3b82f6] transition-all duration-200">
                      <FaPlus1 className="text-lg" />
                      <span>Create Quiz</span>
                    </Link>
                    <Link to="/leaderboard" className="flex items-center gap-2 hover:scale-105 hover:text-[#3b82f6] transition-all duration-200">
                      <FaTrophy1 className="text-lg" />
                      <span>Leaderboard</span>
                    </Link>
                    <Link to="/community" className="flex items-center gap-2 hover:scale-105 hover:text-[#3b82f6] transition-all duration-200">
                      <FaUsers1 className="text-lg" />
                      <span>Community</span>
                    </Link>
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                      >
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=AuraQUser" 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-[#3b82f6] transition-all duration-200"
                        />
                      </button>
                      <AnimatePresence>
                        {isProfileOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-2"
                          >
                            <Link 
                              to="/profile" 
                              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 hover:text-[#3b82f6] transition-colors duration-150"
                            >
                              <FaUser1 className="text-sm" />
                              <span>Profile</span>
                            </Link>
                            <Link 
                              to="/settings" 
                              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 hover:text-[#3b82f6] transition-colors duration-150"
                            >
                              <FaCog1 className="text-sm" />
                              <span>Settings</span>
                            </Link>
                            <button 
                              onClick={logout}
                              className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-white/10 hover:text-[#3b82f6] transition-colors duration-150"
                            >
                              <FaSignOutAlt1 className="text-sm" />
                              <span>Logout</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 hover:scale-105 transition-all duration-200 shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_15px_#a855f7]"
                    >
                      <FaSignInAlt1 className="text-lg" />
                      <span>Login</span>
                    </Link>
                    <Link 
                      to="/register"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary-500 hover:bg-primary-500/10 hover:scale-105 transition-all duration-200"
                    >
                      <FaUserPlus1 className="text-lg" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </motion.div>
            )}

            {!isMobile && (
              <motion.button
                onClick={toggleNav}
                className="p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isShrunk ? <FaBars1 className="text-xl" /> : <FaTimes1 className="text-xl" />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default NavBar; 