import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaMedal, FaTrophy, FaChevronDown, FaChevronUp, FaGamepad, FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { mockGlobalLeaderboardData } from '../data/mockGlobalLeaderboard';
import BackButton from '../components/shared/BackButton';

const FaCrown1 = FaCrown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaMedal1 = FaMedal as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const FaChevronDown1 = FaChevronDown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaChevronUp1 = FaChevronUp as React.FC<React.SVGProps<SVGSVGElement>>;
const FaGamepad1 = FaGamepad as React.FC<React.SVGProps<SVGSVGElement>>;
const FaStar1 = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  rank: number;
  quizzesCompleted: number;
}

const BATCH_SIZE = 8;

const LeaderboardPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  React.useEffect(() => {
    if (inView && visibleCount < mockGlobalLeaderboardData.length) {
      window.requestAnimationFrame(() => {
        setVisibleCount((prev) => prev + BATCH_SIZE);
      });
    }
  }, [inView]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaCrown1 className="text-yellow-400 text-xl sm:text-2xl" />;
      case 2:
        return <FaMedal1 className="text-gray-300 text-xl sm:text-2xl" />;
      case 3:
        return <FaMedal1 className="text-amber-600 text-xl sm:text-2xl" />;
      default:
        return <span className="text-base sm:text-lg font-bold">{rank}</span>;
    }
  };

  const visibleEntries = mockGlobalLeaderboardData.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* <BackButton /> */}
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,...')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center group"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] group-hover:from-[#6366f1] group-hover:via-[#8b5cf6] group-hover:to-[#ec4899] transition-all duration-500">
            Global Leaderboard
          </h1>
          <p className="text-gray-400 group-hover:text-white transition-colors duration-300">Top performers in the AuraQ universe</p>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12">
          {/* Mobile Header (2 columns) */}
          <div className="grid grid-cols-2 gap-2 text-gray-400 text-xs font-medium mb-4 px-4 sm:hidden">
            <div>Player</div>
            <div className="text-right">Score</div>
          </div>

          {/* Desktop Header (4 columns) */}
          <div className="hidden sm:grid sm:grid-cols-4 sm:gap-4 text-gray-400 text-sm font-medium mb-4 px-4">
            <div>Rank</div>
            <div>Player</div>
            <div className="text-right">Score</div>
            <div className="text-right">Quizzes</div>
          </div>

          <div className="space-y-3">
            {visibleEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <motion.div
                    className={`group relative grid grid-cols-2 gap-2 items-center p-4 rounded-lg ${
                      entry.rank <= 3
                        ? 'bg-gradient-to-r from-[#1c1f2e]/50 to-[#1c1f2e]/30 border border-white/10'
                        : 'bg-[#1c1f2e]/40'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <img
                          src={entry.avatar}
                          alt={entry.username}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <span className="text-white truncate text-sm">{entry.username}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium text-sm">
                        {entry.score.toLocaleString()}
                      </div>
                    </div>

                    {/* Expandable Section */}
                    <motion.button
                      onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                      className="col-span-2 flex items-center justify-center mt-2 text-[#8b5cf6] hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {expandedEntry === entry.id ? <FaChevronUp1 /> : <FaChevronDown1 />}
                    </motion.button>

                    <AnimatePresence>
                      {expandedEntry === entry.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="col-span-2 overflow-hidden"
                        >
                          <div className="pt-3 pb-2 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <FaGamepad1 className="text-[#8b5cf6]" />
                                <span>Quizzes Completed</span>
                              </div>
                              <span className="text-white">{entry.quizzesCompleted}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <FaStar1 className="text-[#8b5cf6]" />
                                <span>Rank</span>
                              </div>
                              <span className="text-white">#{entry.rank}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <motion.div
                    className={`group relative grid grid-cols-4 gap-4 items-center p-4 rounded-lg ${
                      entry.rank <= 3
                        ? 'bg-gradient-to-r from-[#1c1f2e]/50 to-[#1c1f2e]/30 border border-white/10'
                        : 'bg-[#1c1f2e]/40 hover:bg-[#1c1f2e]/60'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-10 h-10 rounded-full group-hover:ring-2 group-hover:ring-[#8b5cf6]"
                      />
                      <span className="text-white group-hover:text-[#8b5cf6] transition-colors duration-300">{entry.username}</span>
                    </div>
                    <div className="text-right text-white font-medium group-hover:text-[#8b5cf6] transition-colors duration-300">
                      {entry.score.toLocaleString()}
                    </div>
                    <div className="text-right text-gray-400 group-hover:text-white transition-colors duration-300">
                      {entry.quizzesCompleted}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            {/* Load Trigger */}
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;