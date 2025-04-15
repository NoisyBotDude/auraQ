import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaGamepad, 
  FaPlus, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaUsers,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../../contexts';
const HomeIcon = FaHome as React.FC<React.SVGProps<SVGSVGElement>>;
const PlayIcon = FaGamepad as React.FC<React.SVGProps<SVGSVGElement>>;
const CreateIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const LeaderboardIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const CommunityIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const ProfileIcon = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const SettingsIcon = FaCog as React.FC<React.SVGProps<SVGSVGElement>>;
const LogoutIcon = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronLeftIcon = FaChevronLeft as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronRightIcon = FaChevronRight as React.FC<React.SVGProps<SVGSVGElement>>;
const ArrowLeftIcon = FaArrowLeft as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar: React.FC<{ openSidebar: boolean, setOpenSidebar: (open: boolean) => void }> = ({ openSidebar, setOpenSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpenSidebar]);

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/play', icon: FaGamepad, label: 'Play Online' },
    { path: '/create', icon: FaPlus, label: 'Create Quiz' },
    { path: '/leaderboard', icon: FaTrophy, label: 'Leaderboard' },
    { path: '/community', icon: FaUsers, label: 'Community' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      {/* Back Button - Positioned outside the sidebar */}
      {/* <motion.button
        onClick={handleToggleSidebar}
        className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-[#1a1a2e]/90 backdrop-blur-sm hover:bg-[#2a2a3a] transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeftIcon className="text-white w-5 h-5" />
      </motion.button> */}

      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`fixed left-0 top-0 h-screen ${openSidebar ? 'w-64' : 'w-20'} bg-[#1a1a2e]/90 backdrop-blur-sm border-r border-[#2a2a3a] z-40 transition-all duration-200`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {openSidebar && (
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]"
                >
                  AuraQ
                </motion.h1>
              )}
            </AnimatePresence>
            {!isMobile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleSidebar}
                className={`p-2 rounded-lg hover:bg-[#2a2a3a] transition-colors duration-150 ${!openSidebar ? 'mx-auto' : ''}`}
                aria-label={openSidebar ? "Collapse sidebar" : "Expand sidebar"}
              >
                {openSidebar ? <ChevronLeftIcon className="text-white" /> : <ChevronRightIcon className="text-white" />}
              </motion.button>
            )}
          </div>

          <nav className="flex-1 px-2 py-2 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon as React.FC<React.SVGProps<SVGSVGElement>>;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.li key={item.path} whileHover={{ scale: 1.02 }}>
                    <Link
                      to={item.path}
                      className={`flex items-center ${!openSidebar ? 'justify-center' : 'px-4'} py-3 rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-[#2a2a3a] text-white shadow-lg shadow-[#2a2a3a]/50'
                          : 'text-gray-400 hover:bg-[#2a2a3a] hover:text-white'
                      }`}
                      title={!openSidebar ? item.label : undefined}
                      aria-label={item.label}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#3b82f6]' : ''}`} />
                      <AnimatePresence mode="wait">
                        {openSidebar && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="ml-3"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {user && (
            <div className="p-4 border-t border-[#2a2a3a]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className={`flex items-center w-full ${!openSidebar ? 'justify-center' : 'px-4'} py-3 text-red-400 hover:bg-[#2a2a3a] rounded-lg transition-colors duration-150`}
                title={!openSidebar ? "Logout" : undefined}
                aria-label="Logout"
              >
                <LogoutIcon className="w-5 h-5" />
                <AnimatePresence mode="wait">
                  {openSidebar && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="ml-3"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 