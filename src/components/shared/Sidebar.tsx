import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaGamepad, 
  FaPlus, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaUsers,
  FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../contexts';
const HomeIcon = FaHome as React.FC<React.SVGProps<SVGSVGElement>>;
const GamepadIcon = FaGamepad as React.FC<React.SVGProps<SVGSVGElement>>;
const PlusIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const TrophyIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const UserIcon = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const CogIcon = FaCog as React.FC<React.SVGProps<SVGSVGElement>>;
const SignOutIcon = FaSignOutAlt as React.FC<React.SVGProps<SVGSVGElement>>;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/play', icon: GamepadIcon, label: 'Play Online' },
    { path: '/create', icon: PlusIcon, label: 'Create Quiz' },
    { path: '/leaderboard', icon: TrophyIcon, label: 'Leaderboard' },
    { path: '/community', icon: UsersIcon, label: 'Community' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
    { path: '/settings', icon: CogIcon, label: 'Settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a2e] border-r border-[#2a2a3a] z-50"
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
            AuraQ
          </h1>
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.li key={item.path} whileHover={{ scale: 1.02 }}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#2a2a3a] text-white'
                        : 'text-gray-400 hover:bg-[#2a2a3a] hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
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
              className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-[#2a2a3a] rounded-lg transition-colors duration-200"
            >
              <SignOutIcon className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar; 