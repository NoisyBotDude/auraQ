import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaTrophy, FaStar, FaHashtag } from 'react-icons/fa';
import BackButton from '../components/shared/BackButton';

const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const CommentsIcon = FaComments as React.FC<React.SVGProps<SVGSVGElement>>;
const TrophyIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const HashtagIcon = FaHashtag as React.FC<React.SVGProps<SVGSVGElement>>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const hoverVariants = {
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      <BackButton />
      
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Community Hub
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Connect, share, and grow with fellow quiz enthusiasts
          </motion.p>
        </motion.div>

        {/* Community Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: UsersIcon, count: "1,234", label: "Active Members", color: "#3b82f6" },
            { icon: CommentsIcon, count: "567", label: "Discussions", color: "#a855f7" },
            { icon: TrophyIcon, count: "89", label: "Tournaments", color: "#ec4899" },
            { icon: StarIcon, count: "45", label: "Featured Quizzes", color: "#3b82f6" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
              variants={{
                ...itemVariants,
                ...hoverVariants
              }}
              whileHover="hover"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className={`text-[${stat.color}] text-2xl`} />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.count}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending Topics */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            Trending Topics
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {['Science & Tech', 'History Buffs', 'Movie Trivia', 'Sports Fans', 'Music Lovers', 'Geography Geeks'].map((topic, index) => (
              <motion.div
                key={index}
                className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
                variants={{
                  ...itemVariants,
                  ...hoverVariants
                }}
                whileHover="hover"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-[#3b82f6]/20 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <HashtagIcon className="text-[#3b82f6] text-2xl" />
                  </motion.div>
                  <div>
                    <div className="text-xl font-semibold text-white">{topic}</div>
                    <div className="text-gray-400">Join the discussion</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            Recent Discussions
          </motion.h2>
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { title: 'Best Quiz Creation Tips', author: 'QuizMaster', replies: 24 },
              { title: 'Weekly Quiz Challenge', author: 'ChallengeHost', replies: 15 },
              { title: 'New Features Discussion', author: 'FeatureFan', replies: 8 },
              { title: 'Quiz Tournament Results', author: 'TournamentPro', replies: 12 }
            ].map((discussion, index) => (
              <motion.div
                key={index}
                className="p-6 bg-[#1c1f2e]/80 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
                variants={{
                  ...itemVariants,
                  ...hoverVariants
                }}
                whileHover="hover"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <motion.h3 
                      className="text-xl font-semibold text-white"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {discussion.title}
                    </motion.h3>
                    <p className="text-gray-400">by {discussion.author}</p>
                  </div>
                  <motion.div 
                    className="flex items-center gap-2 text-gray-400"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CommentsIcon className="text-lg" />
                    <span>{discussion.replies} replies</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityPage; 