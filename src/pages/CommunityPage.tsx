import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaTrophy, FaStar, FaHashtag } from 'react-icons/fa';
import BackButton from '../components/shared/BackButton';

const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const CommentsIcon = FaComments as React.FC<React.SVGProps<SVGSVGElement>>;
const TrophyIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const HashtagIcon = FaHashtag as React.FC<React.SVGProps<SVGSVGElement>>;

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
            Community Hub
          </h1>
          <p className="text-gray-400">Connect, share, and grow with fellow quiz enthusiasts</p>
        </motion.div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#3b82f6]/20 rounded-lg">
                <UsersIcon className="text-[#3b82f6] text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1,234</div>
                <div className="text-gray-400">Active Members</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#a855f7]/20 rounded-lg">
                <CommentsIcon className="text-[#a855f7] text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">567</div>
                <div className="text-gray-400">Discussions</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#ec4899]/20 rounded-lg">
                <TrophyIcon className="text-[#ec4899] text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-gray-400">Tournaments</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#3b82f6]/20 rounded-lg">
                <StarIcon className="text-[#3b82f6] text-2xl" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-gray-400">Featured Quizzes</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trending Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Trending Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Science & Tech', 'History Buffs', 'Movie Trivia', 'Sports Fans', 'Music Lovers', 'Geography Geeks'].map((topic, index) => (
              <motion.div
                key={index}
                className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#3b82f6]/20 rounded-lg">
                    <HashtagIcon className="text-[#3b82f6] text-2xl" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">{topic}</div>
                    <div className="text-gray-400">Join the discussion</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Discussions */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Recent Discussions</h2>
          <div className="space-y-6">
            {[
              { title: 'Best Quiz Creation Tips', author: 'QuizMaster', replies: 24 },
              { title: 'Weekly Quiz Challenge', author: 'ChallengeHost', replies: 15 },
              { title: 'New Features Discussion', author: 'FeatureFan', replies: 8 },
              { title: 'Quiz Tournament Results', author: 'TournamentPro', replies: 12 }
            ].map((discussion, index) => (
              <motion.div
                key={index}
                className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{discussion.title}</h3>
                    <p className="text-gray-400">by {discussion.author}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CommentsIcon className="text-lg" />
                    <span>{discussion.replies} replies</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 