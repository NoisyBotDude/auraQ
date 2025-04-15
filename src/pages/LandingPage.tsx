import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import QuizCard from '../components/shared/QuizCard';
import { useAuth } from '../contexts/index';
import { FaRocket, FaUsers, FaPenFancy, FaGamepad, FaPlus, FaHome, FaGithub, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { mockQuizzes } from '../data/mockQuizzes';
import TypewriterText from '../components/shared/TypewriterText';
import Footer from '../components/shared/Footer';

const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const PenIcon = FaPenFancy as React.FC<React.SVGProps<SVGSVGElement>>;
const GameIcon = FaGamepad as React.FC<React.SVGProps<SVGSVGElement>>;
const PlusIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;


interface LandingPageProps {
  scrollTo?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ scrollTo }) => {
  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const modeSectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollTo === 'featured' && featuredSectionRef.current) {
      featuredSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }, [scrollTo]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (descriptionRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        descriptionRef.current.style.setProperty('--mouse-x', `${x}px`);
        descriptionRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      descriptionElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (descriptionElement) {
        descriptionElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleGetStarted = () => {
    if (modeSectionRef.current) {
      modeSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>


      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden "
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
            <TypewriterText text="Welcome to AuraQ" delay={0.1} />
          </motion.h1>

          <motion.p
            ref={descriptionRef}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative group"
            variants={itemVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <span className="relative">Embark on an epic journey through knowledge. Challenge yourself, compete with friends, and unlock achievements in our galactic learning universe.</span>
            <motion.span
              className="absolute inset-0 bg-[#3b82f6]/20 rounded-lg opacity-0"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(109, 61, 181, 0.3) 0%, transparent 50%)',
              }}
            />
          </motion.p>

          <motion.div className="flex justify-center gap-4" variants={itemVariants}>
            {user ? (
              <motion.button
                onClick={handleGetStarted}
                className="get-started-button bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get started
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M13 16.172l5.364-5.364 1.414 1.414L12 20l-7.778-7.778 1.414-1.414L11 16.172V4h2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </motion.button>
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
      <section ref={featuredSectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Featured Quizzes
            </h2>
            <p className="text-gray-400">Test your knowledge with our most popular quizzes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </section>

      <section ref={modeSectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <motion.button
              className="relative group px-8 py-4 rounded-xl text-white font-bold text-lg overflow-hidden backdrop-blur-md bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <PlusIcon className="text-2xl" />
                <span>Create Quiz</span>
              </div>
              <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-white/40 transition-colors duration-300" />
            </motion.button>

            <motion.button
              className="relative group px-8 py-4 rounded-xl text-white font-bold text-lg overflow-hidden backdrop-blur-md bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/play')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#3b82f6] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <GameIcon className="text-2xl" />
                <span>Play Online</span>
              </div>
              <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-white/40 transition-colors duration-300" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12  bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">Why AuraQ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <motion.div
              className="p-6 bg-black/40 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden group"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <RocketIcon className="text-[#8b5cf6] text-3xl mb-4 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
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
              <UsersIcon className="text-[#8b5cf6] text-3xl mb-4 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
              <h3 className="text-xl font-semibold mb-2">Compete & Grow</h3>
              <p className="text-gray-300">Challenge friends, climb leaderboards, and track your progress across different knowledge realms.</p>
            </motion.div>
            <motion.div
              className="p-6 bg-black/40 backdrop-blur-md rounded-xl shadow-lg text-white relative overflow-hidden group"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <PenIcon className="text-[#8b5cf6] text-3xl mb-4 group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
              <h3 className="text-xl font-semibold mb-2">Create & Share</h3>
              <p className="text-gray-300">Design your own quizzes and share them with the community using our intuitive creation tools.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage; 