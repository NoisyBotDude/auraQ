import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { motion } from 'framer-motion';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      className="text-white p-4 shadow-lg backdrop-blur-md bg-black/30 rounded-full mt-4 mx-5 fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200">
          AuraQ
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/explore" className="hover:opacity-80 transition-opacity duration-200">
                Explore
              </Link>
              <Link to="/create" className="hover:opacity-80 transition-opacity duration-200">
                Create Quiz
              </Link>
              <Link to="/leaderboard" className="hover:opacity-80 transition-opacity duration-200">
                Leaderboard
              </Link>
              <div className="relative group">
                <img 
                  src={user.avatar.baseCharacter} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
                <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg py-2 invisible group-hover:visible transition-all duration-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 transition-all duration-200 shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_15px_#a855f7]"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 rounded-lg border-2 border-primary-500 hover:bg-primary-500/10 transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar; 