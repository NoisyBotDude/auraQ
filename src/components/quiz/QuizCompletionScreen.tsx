import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Player } from '../../types';
import { mockLeaderboardData } from '../../data/mockLeaderboard';
import { FaTimes } from 'react-icons/fa';

const FaTimes1 = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;

interface QuizCompletionScreenProps {
  score: number;
  onClose: () => void;
}

const QuizCompletionScreen: React.FC<QuizCompletionScreenProps> = ({ score, onClose }) => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<Player[]>([]);

  useEffect(() => {
    // Simulate API call to get leaderboard data
    const fetchLeaderboardData = async () => {
      // Add current user's score to the leaderboard
      const updatedLeaderboard = [
        ...mockLeaderboardData,
        {
          id: 'current-user',
          username: 'You',
          score: score,
          rank: 0,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
        }
      ];

      // Sort by score and assign ranks
      const sortedLeaderboard = updatedLeaderboard
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
          ...player,
          rank: index + 1
        }));

      setLeaderboardData(sortedLeaderboard);
    };

    fetchLeaderboardData();
  }, [score]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const handleBackToExplore = () => {
    onClose();
    navigate('/', { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1c1f2e]/90 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes1 className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Quiz Completed!
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your final score: {score}
          </motion.p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Leaderboard</h3>
          <div className="grid grid-cols-4 gap-4 text-gray-400 text-sm mb-2 px-4">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">Score</span>
            <span className="text-right">Progress</span>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {leaderboardData.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-4 gap-4 items-center p-4 rounded-lg ${
                    player.id === 'current-user'
                      ? 'bg-[#3b82f6]/20 border border-[#3b82f6]'
                      : 'bg-[#2d2f3d]/50'
                  }`}
                >
                  <span className="font-bold text-[#3b82f6]">#{player.rank}</span>
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatar}
                      alt={player.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white">{player.username}</span>
                  </div>
                  <span className="text-right font-semibold text-[#3b82f6]">{player.score}</span>
                  <div className="h-2 bg-[#2d2f3d] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.score / 1000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBackToExplore}
            className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizCompletionScreen; 