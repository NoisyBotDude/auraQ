import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import { 
  FaRocket, 
  FaUsers, 
  FaClock, 
  FaTrophy,
  FaGlobe,
  FaBrain,
  FaFlask,
  FaCode,
  FaMusic,
  FaHistory,
  FaLanguage,
  FaRunning,
  FaGamepad,
  FaFilm,
  FaPalette,
  FaChartLine,
  FaMicrochip,
  FaRobot,
  FaSpaceShuttle,
  FaMeteor,
  FaSatellite,
  FaMoon,
  FaSun,
  FaGalacticRepublic,
  FaSpinner,
  FaSearch,
  FaCompass,
  FaHourglass,
  FaStar
} from 'react-icons/fa';
import { mockQuizzes } from '../data/mockQuizzes';

const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const UsersIcon = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const ClockIcon = FaClock as React.FC<React.SVGProps<SVGSVGElement>>;
const TrophyIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const GlobeIcon = FaGlobe as React.FC<React.SVGProps<SVGSVGElement>>;
const BrainIcon = FaBrain as React.FC<React.SVGProps<SVGSVGElement>>;
const FlaskIcon = FaFlask as React.FC<React.SVGProps<SVGSVGElement>>;
const CodeIcon = FaCode as React.FC<React.SVGProps<SVGSVGElement>>;
const MusicIcon = FaMusic as React.FC<React.SVGProps<SVGSVGElement>>;
const HistoryIcon = FaHistory as React.FC<React.SVGProps<SVGSVGElement>>;
const LanguageIcon = FaLanguage as React.FC<React.SVGProps<SVGSVGElement>>;
const RunningIcon = FaRunning as React.FC<React.SVGProps<SVGSVGElement>>;
const GameIcon = FaGamepad as React.FC<React.SVGProps<SVGSVGElement>>;
const FilmIcon = FaFilm as React.FC<React.SVGProps<SVGSVGElement>>;
const PaletteIcon = FaPalette as React.FC<React.SVGProps<SVGSVGElement>>;
const ChartIcon = FaChartLine as React.FC<React.SVGProps<SVGSVGElement>>;
const MicrochipIcon = FaMicrochip as React.FC<React.SVGProps<SVGSVGElement>>;
const RobotIcon = FaRobot as React.FC<React.SVGProps<SVGSVGElement>>;
const SpaceShuttleIcon = FaSpaceShuttle as React.FC<React.SVGProps<SVGSVGElement>>;
const MeteorIcon = FaMeteor as React.FC<React.SVGProps<SVGSVGElement>>;
const SatelliteIcon = FaSatellite as React.FC<React.SVGProps<SVGSVGElement>>;
const MoonIcon = FaMoon as React.FC<React.SVGProps<SVGSVGElement>>;
const SunIcon = FaSun as React.FC<React.SVGProps<SVGSVGElement>>;
const GalacticIcon = FaGalacticRepublic as React.FC<React.SVGProps<SVGSVGElement>>;
const SpinnerIcon = FaSpinner as React.FC<React.SVGProps<SVGSVGElement>>;
const SearchIcon = FaSearch as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const HourglassIcon = FaHourglass as React.FC<React.SVGProps<SVGSVGElement>>;
const CompassIcon = FaCompass as React.FC<React.SVGProps<SVGSVGElement>>;

const getCategoryIcon = (category: string, selectedCategory: string) => {
  const isSelected = category === selectedCategory;
  const iconClass = `text-2xl ${isSelected ? 'text-[#8b5cf6] drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'text-[#8b5cf6]/60 hover:text-[#8b5cf6] transition-colors duration-300'}`;
  
  switch (category.toLowerCase()) {
    case 'science':
      return <FlaskIcon className={iconClass} />;
    case 'technology':
      return <MicrochipIcon className={iconClass} />;
    case 'space':
      return <SpaceShuttleIcon className={iconClass} />;
    case 'astronomy':
      return <GalacticIcon className={iconClass} />;
    case 'geography':
      return <GlobeIcon className={iconClass} />;
    case 'entertainment':
      return <FilmIcon className={iconClass} />;
    case 'history':
      return <HistoryIcon className={iconClass} />;
    case 'language':
      return <LanguageIcon className={iconClass} />;
    case 'sports':
      return <RunningIcon className={iconClass} />;
    case 'gaming':
      return <GameIcon className={iconClass} />;
    case 'art':
      return <PaletteIcon className={iconClass} />;
    case 'business':
      return <ChartIcon className={iconClass} />;
    case 'music':
      return <MusicIcon className={iconClass} />;
    case 'programming':
      return <CodeIcon className={iconClass} />;
    case 'ai':
      return <RobotIcon className={iconClass} />;
    default:
      return <RocketIcon className={iconClass} />;
  }
};

const PlayOnlinePage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingQuizId, setLoadingQuizId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTime, setSelectedTime] = useState<string>('Any');
  const [selectedRating, setSelectedRating] = useState<string>('Any');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const timeRanges = ['Any', '0-5 min', '5-10 min', '10-15 min', '15+ min'];
  const ratingRanges = ['Any', '4+ Stars', '3+ Stars', '2+ Stars'];

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockQuizzes.map(quiz => quiz.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, []);

  const filteredQuizzes = useMemo(() => {
    return mockQuizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
      
      // Time duration filter
      const quizDuration = quiz.questions.length * 30; // Assuming 30 seconds per question
      const matchesTime = selectedTime === 'Any' || (
        selectedTime === '0-5 min' && quizDuration <= 300 ||
        selectedTime === '5-10 min' && quizDuration > 300 && quizDuration <= 600 ||
        selectedTime === '10-15 min' && quizDuration > 600 && quizDuration <= 900 ||
        selectedTime === '15+ min' && quizDuration > 900
      );

      // Rating filter
      const matchesRating = selectedRating === 'Any' || (
        selectedRating === '4+ Stars' && quiz.rating >= 4 ||
        selectedRating === '3+ Stars' && quiz.rating >= 3 ||
        selectedRating === '2+ Stars' && quiz.rating >= 2
      );

      return matchesSearch && matchesCategory && matchesTime && matchesRating;
    });
  }, [searchQuery, selectedCategory, selectedTime, selectedRating]);

  const handleJoinSession = (quizId: string) => {
    setLoadingQuizId(quizId);
    // Simulate loading time for better UX
    setTimeout(() => {
      navigate(`/quiz/${quizId}`);
    }, 1000);
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
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-16">
      {/* Background Elements */}
      {/* <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div> */}

      {/* Header Section */}
      <motion.div
        className="container mx-auto px-4 text-center mb-16 group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] group-hover:from-[#6366f1] group-hover:via-[#8b5cf6] group-hover:to-[#ec4899] transition-all duration-500">
          Join a Quiz Session
        </h1>
        <p className="text-gray-400 text-lg group-hover:text-white transition-colors duration-300">
          Challenge yourself and compete with others in real-time
        </p>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="container mx-auto px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-white text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 py-2 bg-black/60 rounded-lg border border-white/20 focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            {/* Categories Filter */}
            <div className="relative flex-1 md:flex-initial min-w-[120px] md:min-w-0">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === 'All'
                    ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'bg-black/40 text-gray-400 hover:bg-black/60'
                }`}
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsTimeOpen(false);
                  setIsRatingOpen(false);
                }}
              >
                <CompassIcon className="text-lg" />
                {selectedCategory === 'All' ? 'Categories' : selectedCategory}
                <motion.span
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 flex items-center gap-2 ${
                            selectedCategory === category
                              ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                              : 'text-gray-400 hover:bg-black/60 hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsCategoryOpen(false);
                          }}
                        >
                          {getCategoryIcon(category, selectedCategory)}
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Time Duration Filter */}
            <div className="relative flex-1 md:flex-initial min-w-[120px] md:min-w-0">
              <button
                key={selectedTime}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedTime === 'Any'
                      ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'bg-black/40 text-gray-400 hover:bg-black/60'
                }`}
                onClick={() => {
                  setIsTimeOpen(!isTimeOpen);
                  setIsCategoryOpen(false);
                  setIsRatingOpen(false);
                }}
              >
                <HourglassIcon className="text-lg" />
                {selectedTime === 'Any' ? 'Time' : selectedTime}
                <motion.span
                  animate={{ rotate: isTimeOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {isTimeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {timeRanges.map((time) => (
                        <button
                          key={time}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 flex items-center gap-2 ${
                            selectedTime === time
                              ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                              : 'text-gray-400 hover:bg-black/60 hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedTime(time);
                            setIsTimeOpen(false);
                          }}
                        >
                          <HourglassIcon className="text-lg" />
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rating Filter */}
            <div className="relative flex-1 md:flex-initial min-w-[120px] md:min-w-0">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedRating === 'Any'
                    ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                    : 'bg-black/40 text-gray-400 hover:bg-black/60'
                }`}
                onClick={() => {
                  setIsRatingOpen(!isRatingOpen);
                  setIsCategoryOpen(false);
                  setIsTimeOpen(false);
                }}
              >
                <StarIcon className="text-lg" />
                {selectedRating === 'Any' ? 'Rating' : selectedRating}
                <motion.span
                  animate={{ rotate: isRatingOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence>
                {isRatingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {ratingRanges.map((rating) => (
                        <button
                          key={rating}
                          className={`w-full px-4 py-2 text-left text-sm transition-all duration-300 flex items-center gap-2 ${
                            selectedRating === rating
                              ? 'bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                              : 'text-gray-400 hover:bg-black/60 hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedRating(rating);
                            setIsRatingOpen(false);
                          }}
                        >
                          <StarIcon className="text-lg" />
                          {rating}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Sessions Grid */}
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              className="relative group"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div
                className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 relative overflow-hidden"
                variants={cardHoverVariants}
              >
                {/* Card Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-white/40 transition-colors duration-300" />

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    {getCategoryIcon(quiz.category, selectedCategory)}
                    <h3 className="text-xl font-semibold">{quiz.title}</h3>
                  </div>

                  <p className="text-gray-400 mb-6">{quiz.description}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="text-[#a855f7] text-lg" />
                      <span className="text-sm text-gray-400">{Math.floor(Math.random() * 50) + 10} players</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="text-[#ec4899] text-lg" />
                      <span className="text-sm text-gray-400">{quiz.questions.length * 30}s</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="text-yellow-400 text-lg" />
                      <span className="text-sm text-gray-400">{quiz.rating.toFixed(1)} ★</span>
                    </div>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] rounded-lg text-sm font-semibold relative overflow-hidden group min-w-[100px]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleJoinSession(quiz.id)}
                      disabled={loadingQuizId === quiz.id}
                    >
                      <AnimatePresence mode="wait">
                        {loadingQuizId === quiz.id ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center"
                          >
                            <SpinnerIcon className="animate-spin text-lg" />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-10"
                          >
                            Join Session
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayOnlinePage; 