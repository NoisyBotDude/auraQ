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
    // Add more mock quizzes here
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
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated Background Elements */}
        
        <motion.div
          className="absolute w-64 h-64 bg-primary-200 rounded-full -top-20 -left-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-secondary-200 rounded-full -bottom-32 -right-32 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container mx-auto px-4 text-center z-10">
          <motion.h1
            className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-purple-500 drop-shadow-lg"
            variants={itemVariants}
          >
            Welcome to QuizVerse
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Embark on an epic journey through knowledge. Challenge yourself, compete with friends, and unlock achievements in our galactic learning universe.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            variants={itemVariants}
          >
            {user ? (
              <Link
                to="/explore"
                className="px-8 py-3 bg-primary-500 text-white rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Start Exploring
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-primary-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-[0_0_15px_#7f5af0]"
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-primary-500 text-primary-500 rounded-full text-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Quizzes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="inline-block px-6 py-3 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
            >
              Explore More Quizzes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why QuizVerse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="p-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg text-white" whileHover={{ y: -5 }}>
              <RocketIcon className="text-secondary-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn Through Play</h3>
              <p className="text-gray-300">
                Transform learning into an adventure with our gamified approach to knowledge acquisition.
              </p>
            </motion.div>
            <motion.div className="p-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg text-white" whileHover={{ y: -5 }}>
              <UsersIcon className="text-secondary-500 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compete & Grow</h3>
              <p className="text-gray-300">Challenge friends, climb leaderboards, and track your progress across different knowledge realms.</p>
            </motion.div>
            <motion.div className="p-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg text-white" whileHover={{ y: -5 }}>
              <PenIcon className="text-secondary-500 text-3xl mb-4" />
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