import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts';
import { Quiz, Question } from '../types';
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
  FaGalacticRepublic
} from 'react-icons/fa';


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
    if (!currentQuestion.text || currentQuestion.options.some(opt => !opt)) {
      addNotification({
        message: 'Please fill in all question fields',
        type: 'error'
      });
      return;
    }

    setQuizData(prev => ({
      ...prev,
      questions: [
        ...(prev.questions || []),
        { ...currentQuestion, id: Math.random().toString(36).substr(2, 9) }
      ]
    }));

    setCurrentQuestion({
      text: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100
    });
  };

  const handleSubmit = async () => {
    if (!quizData.title || !quizData.description || !quizData.questions?.length) {
      addNotification({
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    try {
      // Here you would typically make an API call to save the quiz
      addNotification({
        message: 'Quiz created successfully!',
        type: 'success'
      });
      navigate('/explore');
    } catch (error) {
      addNotification({
        message: 'Failed to create quiz',
        type: 'error'
      });
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

      <div className="container mx-auto px-4 max-w-3xl relative z-10 py-12">
        <motion.h1 
          className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create New Quiz
        </motion.h1>

        <motion.div 
          className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'info' ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'bg-[#6366f1]/20 text-[#6366f1]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                1
              </motion.div>
              <div className="w-20 h-1 bg-gradient-to-r from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#ec4899]/20" />
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                className="space-y-6"
              >
                <motion.div
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
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
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                    placeholder="Enter quiz title"
                    whileHover={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
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
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                    rows={4}
                    placeholder="Enter quiz description"
                    whileHover={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
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
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                    placeholder="Enter quiz category"
                    whileHover={{ scale: 1.01 }}
                  />
                </motion.div>

                <motion.div
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <BrainIcon className="text-[#6366f1]" />
                    Difficulty
                  </label>
                  <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <motion.button
                        key={level}
                        className={`px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
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
                  className="p-6 bg-[#2d2f3d]/50 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300"
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

                <div className="flex justify-end">
                  <motion.button
                    onClick={() => setStep('questions')}
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
                          <motion.button
                            className="text-[#6366f1] hover:text-[#6366f1]/80"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <EditIcon />
                          </motion.button>
                        </div>
                      </div>
                      <AnimatePresence>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
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
                        </motion.div>
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
                    className="px-6 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Quiz
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizCreationPage; 