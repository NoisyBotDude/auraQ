import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QuizCard from '../components/shared/QuizCard';
import { useAuth } from '../contexts';
import { FaRocket, FaUsers, FaPenFancy } from 'react-icons/fa';

const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const PenIcon = FaPenFancy as React.FC<React.SVGProps<SVGSVGElement>>;

const LandingPage: React.FC = () => {
  // Mock data for featured quizzes - replace with real data later
  const featuredQuizzes = [
    {
      id: '1',
      title: 'Science Galaxy Explorer',
      description: 'Embark on an adventure through space, physics, and chemistry!',
      category: 'Science',
      difficulty: 'medium' as const,
      questions: Array(10).fill(null),
      creatorId: 'SpaceMaster',
      likes: 245,
      plays: 1200,
      tags: ['space', 'physics', 'chemistry'],
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'History Time Traveler',
      description: 'Journey through ancient civilizations and pivotal moments in human history!',
      category: 'History',
      difficulty: 'medium' as const,
      questions: Array(10).fill(null),
      creatorId: 'TimeExplorer',
      likes: 189,
      plays: 950,
      tags: ['ancient', 'civilizations', 'world-history'],
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Math Universe Explorer',
      description: 'Dive into the fascinating world of numbers, patterns, and mathematical concepts!',
      category: 'Mathematics',
      difficulty: 'hard' as const,
      questions: Array(10).fill(null),
      creatorId: 'MathWizard',
      likes: 156,
      plays: 780,
      tags: ['algebra', 'geometry', 'calculus'],
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Literature Odyssey',
      description: 'Explore classic and contemporary literature from around the world!',
      category: 'Literature',
      difficulty: 'medium' as const,
      questions: Array(10).fill(null),
      creatorId: 'BookWorm',
      likes: 203,
      plays: 890,
      tags: ['classics', 'poetry', 'novels'],
      createdAt: new Date()
    }
  ];

  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Nebula Background */}
        <motion.div
          className="absolute w-[40rem] h-[40rem] rounded-full -top-32 -left-32 blur-[140px] z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [-50, 50, -50],
            y: [-50, 50, -50]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[40rem] h-[40rem] rounded-full -bottom-32 -right-32 blur-[160px] z-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2),transparent_70%)]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [50, -50, 50],
            y: [50, -50, 50]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
             
        {/* Main Content */}
        <div className="container mx-auto px-4 text-center z-10">
          <motion.h1
            className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            Welcome to AuraQ
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            Embark on an epic journey through knowledge. Challenge yourself, compete with friends, and unlock achievements in our galactic learning universe.
          </motion.p>

          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            {user ? (
              <Link
                to="/explore"
                className="px-8 py-3 bg-[#3b82f6] text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-[0_0_10px_#3b82f6] hover:shadow-[0_0_15px_#3b82f6] relative overflow-hidden group"
              >
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-[#a855f7] text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_15px_#a855f7] relative overflow-hidden group"
                >
                  <span className="relative z-10">Join Now</span>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-[#a855f7] text-[#a855f7] rounded-full text-lg font-semibold hover:bg-[#a855f7]/10 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Quizzes Section */}
      <section className="py-20 text-white relative">
        <div className="container mx-auto px-4 z-10 relative">
          <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] to-[#a855f7] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Featured Quizzes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                className="bg-[#1c1f2e]/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-[0_0_15px_#7f5af0] transition-all duration-300 border border-white/10 hover:border-[#a855f7] relative overflow-hidden group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/explore"
              className="inline-block px-8 py-3 rounded-full text-lg font-semibold text-white shadow-md hover:shadow-[0_0_25px_#a855f7] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Explore More Quizzes</span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why QuizVerse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="p-6 bg-black/40 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden group" 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <RocketIcon className="text-[#3b82f6] text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn Through Play</h3>
              <p className="text-gray-300">
                Transform learning into an adventure with our gamified approach to knowledge acquisition.
              </p>
            </motion.div>
            <motion.div 
              className="p-6 bg-black/40 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden group" 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <UsersIcon className="text-[#3b82f6] text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compete & Grow</h3>
              <p className="text-gray-300">Challenge friends, climb leaderboards, and track your progress across different knowledge realms.</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-black/40 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden group" 
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <PenIcon className="text-[#3b82f6] text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create & Share</h3>
              <p className="text-gray-300">Design your own quizzes and share them with the community using our intuitive creation tools.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 