import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaMedal, FaTrophy } from 'react-icons/fa';
import { mockGlobalLeaderboardData } from '../data/mockGlobalLeaderboard';

const FaCrown1 = FaCrown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaMedal1 = FaMedal as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  quizzesCompleted: number;
}

const LeaderboardPage: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown1 className="text-yellow-400 text-2xl" />;
      case 2:
        return <FaMedal1 className="text-gray-300 text-2xl" />;
      case 3:
        return <FaMedal1 className="text-amber-600 text-2xl" />;
      default:
        return <span className="text-lg font-bold">{rank}</span>;
    }
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
          className="text-center "
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
            Global Leaderboard
          </h1>
          <p className="text-gray-400">Top performers in the AuraQ universe</p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
            <div className="grid grid-cols-4 gap-4 text-gray-400 text-sm font-medium mb-4 px-4">
              <div>Rank</div>
              <div>Player</div>
              <div className="text-right">Score</div>
              <div className="text-right">Quizzes</div>
            </div>

            <div className="space-y-4">
              {mockGlobalLeaderboardData.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`grid grid-cols-4 gap-4 items-center p-4 rounded-lg ${
                    entry.rank <= 3
                      ? 'bg-gradient-to-r from-[#1c1f2e]/50 to-[#1c1f2e]/30 border border-white/10'
                      : 'hover:bg-[#1c1f2e]/50 transition-colors duration-200'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={entry.avatar}
                      alt={entry.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-white">{entry.username}</span>
                  </div>
                  <div className="text-right text-white font-medium">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-right text-gray-400">
                    {entry.quizzesCompleted}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 