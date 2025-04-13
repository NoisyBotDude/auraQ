import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { motion } from 'framer-motion';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav 
      className="bg-primary-900 text-white p-4 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          QuizVerse
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/explore" className="hover:text-primary-200 transition-colors">
                Explore
              </Link>
              <Link to="/create" className="hover:text-primary-200 transition-colors">
                Create Quiz
              </Link>
              <Link to="/leaderboard" className="hover:text-primary-200 transition-colors">
                Leaderboard
              </Link>
              <div className="relative group">
                <img 
                  src={user.avatar.baseCharacter} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 invisible group-hover:visible">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-800 hover:bg-primary-100"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-gray-800 hover:bg-primary-100"
                  >
                    Settings
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-primary-100"
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
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 rounded-lg border-2 border-primary-500 hover:bg-primary-500 transition-colors"
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