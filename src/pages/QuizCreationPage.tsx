import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts';
import { Quiz, Question } from '../types';
import { mockQuizzes } from '../data/mockQuizzes';
import { 
  FaRocket, 
  FaCompass, 
  FaPlus, 
  FaTrophy, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaHome,
  FaStar,
  FaClock,
  FaTag,
  FaList,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaEdit,
  FaQuestion,
  FaCheck,
  FaTimesCircle,
  FaGlobe,
  FaBrain,
  FaLightbulb,
  FaBook,
  FaGraduationCap,
  FaAtom,
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
  FaCheckCircle
} from 'react-icons/fa';
import BackButton from '../components/shared/BackButton';


const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const CompassIcon = FaCompass as React.FC<React.SVGProps<SVGSVGElement>>;
const PlusIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const TrophyIcon = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const UserIcon = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const CogIcon = FaCog as React.FC<React.SVGProps<SVGSVGElement>>;
const GlobeIcon = FaGlobe as React.FC<React.SVGProps<SVGSVGElement>>;
const BrainIcon = FaBrain as React.FC<React.SVGProps<SVGSVGElement>>;
const TagIcon = FaTag as React.FC<React.SVGProps<SVGSVGElement>>;
const ListIcon = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
const ClockIcon = FaClock as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const QuestionIcon = FaQuestion as React.FC<React.SVGProps<SVGSVGElement>>;
const TrashIcon = FaTrash as React.FC<React.SVGProps<SVGSVGElement>>;
const EditIcon = FaEdit as React.FC<React.SVGProps<SVGSVGElement>>;
const CheckIcon = FaCheck as React.FC<React.SVGProps<SVGSVGElement>>;
const TimesCircleIcon = FaTimesCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const SatelliteIcon = FaSatellite as React.FC<React.SVGProps<SVGSVGElement>>;
const SpaceShuttleIcon = FaSpaceShuttle as React.FC<React.SVGProps<SVGSVGElement>>;
const MeteorIcon = FaMeteor as React.FC<React.SVGProps<SVGSVGElement>>;
const MoonIcon = FaMoon as React.FC<React.SVGProps<SVGSVGElement>>;
const SunIcon = FaSun as React.FC<React.SVGProps<SVGSVGElement>>;
const GalacticRepublicIcon = FaGalacticRepublic as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronUpIcon = FaChevronUp as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronDownIcon = FaChevronDown as React.FC<React.SVGProps<SVGSVGElement>>;
const CheckCircleIcon = FaCheckCircle as React.FC<React.SVGProps<SVGSVGElement>>; 


interface QuestionForm extends Omit<Question, 'id'> {
  id?: string;
}

const QuizCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [quizData, setQuizData] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    category: '',
    difficulty: 'medium',
    questions: [],
    tags: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<QuestionForm>({
    text: '',
    type: 'multiple',
    options: ['', '', '', ''],
    correctAnswer: 0,
    timeLimit: 30,
    points: 100
  });

  const [step, setStep] = useState<'info' | 'questions'>('info');
  const [tagInput, setTagInput] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState<string | null>(null);

  const handleQuizInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuizData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !quizData.tags?.includes(tagInput.trim())) {
      setQuizData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setQuizData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) {
      addNotification({
        message: 'Please enter a question text',
        type: 'error'
      });
      return;
    }

    if (currentQuestion.options.some(opt => !opt.trim())) {
      addNotification({
        message: 'Please fill in all options',
        type: 'error'
      });
      return;
    }

    if (currentQuestion.timeLimit <= 0) {
      addNotification({
        message: 'Time limit must be greater than 0',
        type: 'error'
      });
      return;
    }

    if (currentQuestion.points <= 0) {
      addNotification({
        message: 'Points must be greater than 0',
        type: 'error'
      });
      return;
    }

    const newQuestion = {
      ...currentQuestion,
      id: Math.random().toString(36).substr(2, 9)
    };

    setQuizData(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));

    setCurrentQuestion({
      text: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100
    });

    addNotification({
      message: 'Question added successfully!',
      type: 'success'
    });
  };

  const validateQuizInfo = () => {
    const errors: Record<string, string> = {};
    
    if (!quizData.title?.trim()) {
      errors.title = 'Quiz title is required';
    }
    
    if (!quizData.description?.trim()) {
      errors.description = 'Quiz description is required';
    }
    
    if (!quizData.category?.trim()) {
      errors.category = 'Quiz category is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateQuizData = () => {
    const errors: Record<string, string> = {};

    if (!quizData.title?.trim()) {
      errors.title = 'Quiz title is required';
    }

    if (!quizData.description?.trim()) {
      errors.description = 'Quiz description is required';
    }

    if (!quizData.category?.trim()) {
      errors.category = 'Quiz category is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateQuizData()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newQuiz: Quiz = {
        id: Math.random().toString(36).substr(2, 9),
        title: quizData.title || '',
        description: quizData.description || '',
        category: quizData.category || '',
        difficulty: quizData.difficulty || 'medium',
        questions: quizData.questions || [],
        creatorId: 'current-user-id',
        author: 'Current User',
        likes: 0,
        plays: 0,
        rating: 0,
        tags: quizData.tags || [],
        createdAt: new Date()
      };

      mockQuizzes.push(newQuiz);
      setCreatedQuizId(newQuiz.id);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Error creating quiz:', error);
      addNotification({
        message: 'Failed to create quiz. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

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

      <div className="container mx-auto px-4 max-w-3xl relative z-10 py-8 sm:py-12">
        <motion.h1 
          className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create New Quiz
        </motion.h1>

        <motion.div 
          className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center">
              <motion.div 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  step === 'info' ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#6366f1]/20 text-[#6366f1]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                1
              </motion.div>
              <div className="w-12 sm:w-20 h-1 bg-gradient-to-r from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#ec4899]/20" />
              <motion.div 
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  step === 'questions' ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#6366f1]/20 text-[#6366f1]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                2
              </motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4 sm:space-y-6"
              >
                <motion.div
                  className="p-4 sm:p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <RocketIcon className="text-[#6366f1]" />
                    Quiz Title
                  </label>
                  <motion.input
                    type="text"
                    name="title"
                    value={quizData.title}
                    onChange={handleQuizInfoChange}
                    className={`w-full px-4 py-2 bg-[#2d2f3d] border ${
                      validationErrors.title ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]`}
                    placeholder="Enter quiz title"
                    whileHover={{ scale: 1.01 }}
                  />
                  {validationErrors.title && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                  )}
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <CompassIcon className="text-[#6366f1]" />
                    Description
                  </label>
                  <motion.textarea
                    name="description"
                    value={quizData.description}
                    onChange={handleQuizInfoChange}
                    className={`w-full px-4 py-2 bg-[#2d2f3d] border ${
                      validationErrors.description ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]`}
                    rows={4}
                    placeholder="Enter quiz description"
                    whileHover={{ scale: 1.01 }}
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <GlobeIcon className="text-[#6366f1]" />
                    Category
                  </label>
                  <motion.input
                    type="text"
                    name="category"
                    value={quizData.category}
                    onChange={handleQuizInfoChange}
                    className={`w-full px-4 py-2 bg-[#2d2f3d] border ${
                      validationErrors.category ? 'border-red-500' : 'border-white/10'
                    } rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]`}
                    placeholder="Enter quiz category"
                    whileHover={{ scale: 1.01 }}
                  />
                  {validationErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                  )}
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <BrainIcon className="text-[#6366f1]" />
                    Difficulty
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <motion.button
                        key={level}
                        className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                          quizData.difficulty === level
                            ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                            : 'bg-[#2d2f3d] text-gray-400 hover:bg-[#6366f1]/20 hover:text-white'
                        }`}
                        onClick={() => setQuizData(prev => ({ ...prev, difficulty: level }))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {level === 'easy' && <SatelliteIcon className="text-lg" />}
                        {level === 'medium' && <SpaceShuttleIcon className="text-lg" />}
                        {level === 'hard' && <MeteorIcon className="text-lg" />}
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <TagIcon className="text-[#6366f1]" />
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {quizData.tags?.map(tag => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 bg-[#6366f1]/20 text-[#6366f1] rounded-full text-sm flex items-center gap-2"
                        whileHover={{ scale: 1.05, backgroundColor: '#6366f1', color: 'white' }}
                        transition={{ duration: 0.2 }}
                      >
                        <StarIcon className="text-xs" />
                        {tag}
                        <motion.button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-[#6366f1] hover:text-white"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <motion.input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                      placeholder="Add a tag"
                      whileHover={{ scale: 1.01 }}
                    />
                    <motion.button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusIcon />
                      Add
                    </motion.button>
                  </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <ClockIcon className="text-[#6366f1]" />
                      Time Limit (seconds)
                    </label>
                    <motion.input
                      type="text"
                      name="timeLimit"
                      value={currentQuestion.timeLimit}
                      onChange={handleQuestionChange}
                      className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                      whileHover={{ scale: 1.01 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <StarIcon className="text-[#6366f1]" />
                      Points
                    </label>
                    <motion.input
                      type="text"
                      name="points"
                      value={currentQuestion.points}
                      onChange={handleQuestionChange}
                      className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                      whileHover={{ scale: 1.01 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    onClick={() => {
                      if (validateQuizInfo()) {
                        setStep('questions');
                        setValidationErrors({}); // Clear validation errors when moving to next step
                      }
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Questions List */}
                <div className="space-y-4">
                  {quizData.questions?.map((question, index) => (
                    <motion.div
                      key={question.id}
                      className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <QuestionIcon className="text-[#6366f1]" />
                          <h3 className="font-medium text-gray-300">Question {index + 1}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                            className="text-[#6366f1] hover:text-[#8b5cf6] transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {expandedQuestion === question.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </motion.button>
                          <motion.button
                            onClick={() => {
                              setQuizData(prev => ({
                                ...prev,
                                questions: prev.questions?.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-500 hover:text-red-400"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <TrashIcon />
                          </motion.button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedQuestion === question.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-400 mb-4">{question.text}</p>
                            <div className="space-y-2">
                              {question.options.map((option, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  {i === question.correctAnswer ? (
                                    <CheckIcon className="text-green-500" />
                                  ) : (
                                    <TimesCircleIcon className="text-red-500" />
                                  )}
                                  <span className="text-gray-300">{option}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <ClockIcon className="text-[#6366f1]" />
                                <span>{question.timeLimit}s</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <StarIcon className="text-[#6366f1]" />
                                <span>{question.points} points</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Add New Question */}
                <motion.div
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="font-medium mb-4 text-gray-300 flex items-center gap-2">
                    <PlusIcon className="text-[#6366f1]" />
                    Add New Question
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <QuestionIcon className="text-[#6366f1]" />
                        Question Text
                      </label>
                      <motion.textarea
                        name="text"
                        value={currentQuestion.text}
                        onChange={handleQuestionChange}
                        className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                        rows={3}
                        placeholder="Enter question text"
                        whileHover={{ scale: 1.01 }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <ListIcon className="text-[#6366f1]" />
                        Options
                      </label>
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <motion.input
                            type="radio"
                            name="correctAnswer"
                            checked={currentQuestion.correctAnswer === index}
                            onChange={() => setCurrentQuestion(prev => ({
                              ...prev,
                              correctAnswer: index
                            }))}
                            className="mt-3 accent-[#6366f1]"
                            whileHover={{ scale: 1.1 }}
                          />
                          <motion.input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                            placeholder={`Option ${index + 1}`}
                            whileHover={{ scale: 1.01 }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ClockIcon className="text-[#6366f1]" />
                          Time Limit (seconds)
                        </label>
                        <motion.input
                          type="text"
                          name="timeLimit"
                          value={currentQuestion.timeLimit}
                          onChange={handleQuestionChange}
                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <StarIcon className="text-[#6366f1]" />
                          Points
                        </label>
                        <motion.input
                          type="text"
                          name="points"
                          value={currentQuestion.points}
                          onChange={handleQuestionChange}
                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>

                    <motion.button
                      onClick={handleAddQuestion}
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PlusIcon />
                      Add Question
                    </motion.button>
                  </div>
                </motion.div>

                <div className="flex justify-between pt-6">
                  <motion.button
                    onClick={() => setStep('info')}
                    className="px-6 py-2 border border-[#6366f1] text-[#6366f1] rounded-lg hover:bg-[#6366f1]/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    className={`px-6 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Quiz'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#1c1f2e]/90 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg w-full max-w-md mx-auto"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircleIcon className="text-green-500 text-2xl sm:text-3xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Quiz Created Successfully!</h3>
                <p className="text-gray-400 text-sm sm:text-base">Your quiz has been created and is ready to play.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <motion.button
                    onClick={() => {
                      setShowSuccessPopup(false);
                      navigate(`/quiz/${createdQuizId}`);
                    }}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Quiz
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setShowSuccessPopup(false);
                      navigate('/explore');
                    }}
                    className="w-full sm:w-auto px-6 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizCreationPage; 