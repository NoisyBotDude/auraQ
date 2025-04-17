import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../contexts/index';
const GoogleIcon = FaGoogle as React.FC<React.SVGProps<SVGSVGElement>>;
const EnvelopeIcon = FaEnvelope as React.FC<React.SVGProps<SVGSVGElement>>;
const LockIcon = FaLock as React.FC<React.SVGProps<SVGSVGElement>>;

const AuthenticationPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Accept any credentials and redirect to main landing page
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setUser({
        id: '1',
        username: 'testuser',
        avatar: {
          baseCharacter: 'default',
          accessories: [],
          colors: {},
          unlocks: [],
        },
        stats: {
          totalScore: 0,
          quizzesTaken: 0,
          winRate: 0,
          categoryScores: {},
          streakDays: 0,
          achievements: [],
        },
        inventory: [],
        friends: [],
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Accept any Google sign-in and redirect to main landing page
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      navigate('/', { replace: true });
      setUser({
        id: '1',
        username: 'testuser',
        avatar: {
          baseCharacter: 'default',
          accessories: [],
          colors: {},
          unlocks: [],
        },
        stats: {
          totalScore: 0,
          quizzesTaken: 0,
          winRate: 0,
          categoryScores: {},
          streakDays: 0,
          achievements: [],
        },
        inventory: [],
        friends: [],
      });
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md"
      >
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-[#2a2a3a]">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] mb-2">
              Welcome to AuraQ
            </h1>
            <p className="text-gray-400">Sign in to continue your journey</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 mb-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon className="text-xl" />
            <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
          </motion.button>

          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1a1a2e] text-gray-400">Or continue with email</span>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#3b82f6] transition-colors duration-200"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#3b82f6] transition-colors duration-200"
                />
              </div>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] text-white font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#3b82f6] hover:text-[#a855f7] transition-colors duration-200"
              >
                Register
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenticationPage; 