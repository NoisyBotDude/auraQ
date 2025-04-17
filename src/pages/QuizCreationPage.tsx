import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts';
import { Quiz, Question, QuestionType, Category } from '../types';
import { mockQuizzes } from '../data/mockQuizzes';
import { mockCategories } from '../data/mockCategories';
import DifficultySlider from '../components/DifficultySlider';
import TimeLimitSelector from '../components/TimeLimitSelector';
import CategoryModal from '../components/CategoryModal';
import { 
  FaRocket, 
  FaCompass, 
  FaPlus, 
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
  FaChartLine,
  FaCheckCircle,
  FaCaretDown,
  FaSort,
  FaLightbulb,
  FaTimes,
  FaFilter,
  FaFont,
  FaParagraph,
  FaCalendar,
  FaUpload,
  FaTable,
  FaCheckSquare,
  FaRuler,
  FaSortAmountDown,
  FaLink,
  FaImage,
  FaMinus,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import BackButton from '../components/shared/BackButton';


const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const CompassIcon = FaCompass as React.FC<React.SVGProps<SVGSVGElement>>;
const PlusIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
const GlobeIcon = FaGlobe as React.FC<React.SVGProps<SVGSVGElement>>;
const BrainIcon = FaBrain as React.FC<React.SVGProps<SVGSVGElement>>;
const TagIcon = FaTag as React.FC<React.SVGProps<SVGSVGElement>>;
const ListIcon = FaList as React.FC<React.SVGProps<SVGSVGElement>>;
const ClockIcon = FaClock as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const QuestionIcon = FaQuestion as React.FC<React.SVGProps<SVGSVGElement>>;
const TrashIcon = FaTrash as React.FC<React.SVGProps<SVGSVGElement>>;
const CheckIcon = FaCheck as React.FC<React.SVGProps<SVGSVGElement>>;
const TimesCircleIcon = FaTimesCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronUpIcon = FaChevronUp as React.FC<React.SVGProps<SVGSVGElement>>;
const ChevronDownIcon = FaChevronDown as React.FC<React.SVGProps<SVGSVGElement>>;
const CheckCircleIcon = FaCheckCircle as React.FC<React.SVGProps<SVGSVGElement>>; 
const CaretDownIcon = FaCaretDown as React.FC<React.SVGProps<SVGSVGElement>>; 
const EditIcon = FaEdit as React.FC<React.SVGProps<SVGSVGElement>>;
const LightbulbIcon = FaLightbulb as React.FC<React.SVGProps<SVGSVGElement>>;
const FontIcon = FaFont as React.FC<React.SVGProps<SVGSVGElement>>;
const ParagraphIcon = FaParagraph as React.FC<React.SVGProps<SVGSVGElement>>;
const CalendarIcon = FaCalendar as React.FC<React.SVGProps<SVGSVGElement>>;
const UploadIcon = FaUpload as React.FC<React.SVGProps<SVGSVGElement>>;
const TableIcon = FaTable as React.FC<React.SVGProps<SVGSVGElement>>;
const TimesIcon = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const FilterIcon = FaFilter as React.FC<React.SVGProps<SVGSVGElement>>;
const CheckSquareIcon = FaCheckSquare as React.FC<React.SVGProps<SVGSVGElement>>;
const RulerIcon = FaRuler as React.FC<React.SVGProps<SVGSVGElement>>;
const SortAmountDownIcon = FaSortAmountDown as React.FC<React.SVGProps<SVGSVGElement>>;
const LinkIcon = FaLink as React.FC<React.SVGProps<SVGSVGElement>>;
const MinusIcon = FaMinus as React.FC<React.SVGProps<SVGSVGElement>>;

interface QuestionForm {
  id?: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number | number[] | string | string[];
  timeLimit: number;
  points: number;
  explanation?: string;
  hint?: string;
  matchingPairs?: { left: string; right: string }[];
  scaleRange?: {
    min: number;
    max: number;
    labels?: {
      start: string;
      end: string;
    };
  };
  gridOptions?: { rows: string[]; columns: string[] };
  dateRange?: { min?: string; max?: string };
  timeRange?: { min?: string; max?: string };
  fileTypes?: string[];
  maxFileSize?: number;
  required?: boolean;
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
    type: 'single',
    options: ['', '', '', ''],
    correctAnswer: 0,
    timeLimit: 30,
    points: 100,
    hint: ''
  });

  const [step, setStep] = useState<'info' | 'questions'>('info');
  const [tagInput, setTagInput] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(true);

  const questionTypes: { value: QuestionType; label: string; icon: any; description: string }[] = [
    {
      value: 'single',
      label: 'Single Choice',
      icon: CheckCircleIcon,
      description: 'Choose one from multiple options'
    },
    {
      value: 'multiple',
      label: 'Multiple Choice',
      icon: CheckSquareIcon,
      description: 'Select multiple correct answers'
    },
    {
      value: 'short_answer',
      label: 'Short Answer',
      icon: FontIcon,
      description: 'A brief text response'
    },
    {
      value: 'scale',
      label: 'Linear Scale',
      icon: RulerIcon,
      description: 'Rate on a numeric scale'
    },
    {
      value: 'truefalse',
      label: 'True/False',
      icon: CheckIcon,
      description: 'Simple true or false question'
    },
    {
      value: 'date',
      label: 'Date',
      icon: CalendarIcon,
      description: 'Pick a date'
    }
  ];

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

  const handleQuestionTypeChange = (type: QuestionType) => {
    setCurrentQuestion(prev => {
      let options = ['', '', '', ''];
      let correctAnswer: number | number[] = 0;
      let scaleRange = undefined;

      switch (type) {
        case 'truefalse':
          options = ['True', 'False'];
          correctAnswer = 0;
          break;
        case 'multiple':
          correctAnswer = [];
          break;
        case 'scale':
          scaleRange = {
            min: 1,
            max: 5,
            labels: { start: '', end: '' }
          };
          break;
      }

      return {
        ...prev,
        type,
        options,
        correctAnswer,
        scaleRange
      };
    });
  };

  const handleEditQuestion = (questionId: string) => {
    const question = quizData.questions?.find(q => q.id === questionId);
    if (question) {
      setCurrentQuestion(question);
      setEditingQuestionId(questionId);
      setExpandedQuestion(questionId);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions?.filter(q => q.id !== questionId) || []
    }));
    if (editingQuestionId === questionId) {
      setEditingQuestionId(null);
      setIsQuestionFormOpen(true);
      setCurrentQuestion({
        text: '',
        type: 'single',
        options: ['', '', '', ''],
        correctAnswer: 0,
        timeLimit: 30,
        points: 100,
        hint: ''
      });
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) {
      addNotification({
        message: 'Please enter a question text',
        type: 'error'
      });
      return;
    }

    // Validate based on question type
    switch (currentQuestion.type) {
      case 'single':
      case 'multiple':
        if (currentQuestion.options.some(opt => !opt.trim())) {
          addNotification({
            message: 'Please fill in all options',
            type: 'error'
          });
          return;
        }
        if (currentQuestion.type === 'multiple' && !Array.isArray(currentQuestion.correctAnswer)) {
          setCurrentQuestion(prev => ({
            ...prev,
            correctAnswer: []
          }));
        }
        break;
      case 'short_answer':
      case 'paragraph':
        if (!currentQuestion.correctAnswer || (typeof currentQuestion.correctAnswer === 'string' && !currentQuestion.correctAnswer.trim())) {
          addNotification({
            message: 'Please provide a correct answer',
            type: 'error'
          });
          return;
        }
        break;
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

    const newQuestion: Question = {
      id: editingQuestionId || Math.random().toString(36).substr(2, 9),
      text: currentQuestion.text,
      type: currentQuestion.type,
      options: currentQuestion.type === 'truefalse' ? ['True', 'False'] : currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      timeLimit: currentQuestion.timeLimit,
      points: currentQuestion.points,
      explanation: currentQuestion.explanation,
      hint: currentQuestion.hint,
      matchingPairs: currentQuestion.matchingPairs,
      scaleRange: currentQuestion.scaleRange,
      gridOptions: currentQuestion.gridOptions,
      dateRange: currentQuestion.dateRange,
      timeRange: currentQuestion.timeRange,
      fileTypes: currentQuestion.fileTypes,
      maxFileSize: currentQuestion.maxFileSize,
      required: currentQuestion.required
    };

    setQuizData(prev => ({
      ...prev,
      questions: editingQuestionId
        ? prev.questions?.map(q => q.id === editingQuestionId ? newQuestion : q) || []
        : [...(prev.questions || []), newQuestion]
    }));

    // Reset form after adding question
    setCurrentQuestion({
      text: '',
      type: 'single',
      options: ['', '', '', ''],
      correctAnswer: 0,
      timeLimit: 30,
      points: 100,
      hint: ''
    });
    setEditingQuestionId(null);
    setIsQuestionFormOpen(true);

    addNotification({
      message: editingQuestionId ? 'Question updated successfully!' : 'Question added successfully!',
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

  const handleCategorySelect = (categoryId: string) => {
    const category = mockCategories.find(c => c.id === categoryId);
    if (category) {
      setQuizData(prev => ({
        ...prev,
        category: category.id
      }));
    }
  };

  const handleCategoryAdded = (category: Category) => {
    setQuizData(prev => ({
      ...prev,
      category: category.id
    }));
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
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select
                        value={quizData.category || ''}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className={`w-full px-4 py-2 bg-[#2d2f3d] border ${
                          validationErrors.category ? 'border-red-500' : 'border-white/10'
                        } rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white appearance-none`}
                      >
                        <option value="">Select a category</option>
                        {mockCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <CaretDownIcon className="text-gray-400" />
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowCategoryModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusIcon />
                    </motion.button>
                  </div>
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
                  <DifficultySlider
                    value={quizData.difficulty || 'medium'}
                    onChange={(value) => setQuizData(prev => ({ ...prev, difficulty: value }))}
                  />
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
                          {questionTypes.find(t => t.value === question.type)?.icon({
                            className: "text-[#6366f1]"
                          })}
                          <h3 className="font-medium text-gray-300">Question {index + 1}</h3>
                          <span className="text-sm text-gray-400">({question.type})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingQuestionId === question.id ? (
                            <motion.button
                              onClick={() => {
                                setEditingQuestionId(null);
                                setCurrentQuestion({
                                  text: '',
                                  type: 'single',
                                  options: ['', '', '', ''],
                                  correctAnswer: 0,
                                  timeLimit: 30,
                                  points: 100,
                                  hint: ''
                                });
                              }}
                              className="text-yellow-500 hover:text-yellow-400"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <TimesIcon />
                            </motion.button>
                          ) : (
                            <>
                              <motion.button
                                onClick={() => handleEditQuestion(question.id)}
                                className="text-[#6366f1] hover:text-[#8b5cf6]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <EditIcon />
                              </motion.button>
                              <motion.button
                                onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                                className="text-[#6366f1] hover:text-[#8b5cf6]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {expandedQuestion === question.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                              </motion.button>
                            </>
                          )}
                          <motion.button
                            onClick={() => handleDeleteQuestion(question.id)}
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
                            {editingQuestionId === question.id ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    < FilterIcon className="text-[#6366f1]" />
                                    Question Type
                                  </label>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {questionTypes.map(({ value, label, icon: Icon }) => (
                                      <motion.button
                                        key={value}
                                        onClick={() => handleQuestionTypeChange(value)}
                                        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                                          currentQuestion.type === value
                                            ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                            : 'bg-[#2d2f3d] text-gray-400 hover:bg-[#6366f1]/20 hover:text-white'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Icon />
                                        <span className="text-sm">{label}</span>
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <QuestionIcon className="text-[#6366f1]" />
                                    Question Text
                                  </label>
                                  <motion.textarea
                                    name="text"
                                    value={currentQuestion.text}
                                    onChange={handleQuestionChange}
                                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                                    rows={3}
                                    placeholder="Enter question text"
                                    whileHover={{ scale: 1.01 }}
                                  />
                                </div>

                                {/* Dynamic Question Options Based on Type */}
                                {currentQuestion.type === 'single' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Options
                                    </label>
                                    <div className="space-y-3">
                                      {currentQuestion.options.map((option, index) => (
                                        <motion.div
                                          key={index}
                                          className="relative group"
                                          whileHover={{ scale: 1.01 }}
                                        >
                                          <div className="flex items-center gap-3">
                                            <motion.div
                                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                currentQuestion.correctAnswer === index
                                                  ? 'border-[#6366f1] bg-[#6366f1]'
                                                  : 'border-white/20 group-hover:border-[#6366f1]/50'
                                              }`}
                                              whileHover={{ scale: 1.1 }}
                                              whileTap={{ scale: 0.9 }}
                                            >
                                              {currentQuestion.correctAnswer === index && (
                                                <motion.div
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                >
                                                  <CheckIcon className="text-white text-sm" />
                                                </motion.div>
                                              )}
                                            </motion.div>
                                            
                                            <motion.input
                                              type="text"
                                              value={option}
                                              onChange={(e) => handleOptionChange(index, e.target.value)}
                                              className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 group-hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                                              placeholder={`Option ${index + 1}`}
                                              whileFocus={{ scale: 1.02 }}
                                            />

                                            <motion.button
                                              onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                                              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                currentQuestion.correctAnswer === index
                                                  ? 'bg-[#6366f1] text-white'
                                                  : 'bg-[#2d2f3d] text-gray-400 hover:bg-[#6366f1]/20 hover:text-white'
                                              }`}
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                            >
                                              Correct
                                            </motion.button>
                                          </div>

                                          {currentQuestion.correctAnswer === index && (
                                            <motion.div
                                              className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#6366f1] shadow-lg"
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            />
                                          )}
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {currentQuestion.type === 'multiple' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Options (Select all correct answers)
                                    </label>
                                      {currentQuestion.options.map((option, index) => (
                                      <div key={index} className="flex gap-2 mb-2">
                                            <motion.input
                                          type="checkbox"
                                          checked={Array.isArray(currentQuestion.correctAnswer) && (currentQuestion.correctAnswer as number[]).includes(index)}
                                          onChange={(e) => {
                                            const currentIndex = index;
                                                const currentAnswers = Array.isArray(currentQuestion.correctAnswer) 
                                                  ? currentQuestion.correctAnswer as number[]
                                                  : [];
                                                
                                            const newCorrectAnswers = e.target.checked
                                              ? [...currentAnswers, currentIndex]
                                              : currentAnswers.filter(i => i !== currentIndex);
                                                
                                                setCurrentQuestion(prev => ({
                                                  ...prev,
                                                  correctAnswer: newCorrectAnswers
                                                }));
                                              }}
                                          className="mt-3 accent-[#6366f1]"
                                          whileHover={{ scale: 1.1 }}
                                        />
                                        <motion.input
                                          type="text"
                                          value={option}
                                          onChange={(e) => handleOptionChange(index, e.target.value)}
                                          className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                                          placeholder={`Option ${index + 1}`}
                                          whileHover={{ scale: 1.01 }}
                                        />
                                          </div>
                                    ))}
                                  </div>
                                )}

                                {currentQuestion.type === 'short_answer' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Correct Answer
                                    </label>
                                    <motion.input
                                      type="text"
                                      value={typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : ''}
                                      onChange={(e) => setCurrentQuestion(prev => ({
                                        ...prev,
                                        correctAnswer: e.target.value
                                      }))}
                                      className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                                      placeholder="Enter the correct answer"
                                      whileHover={{ scale: 1.01 }}
                                    />
                                  </div>
                                )}

                                {currentQuestion.type === 'scale' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Scale Settings
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm text-gray-400">Min Value</label>
                                        <motion.input
                                          type="number"
                                          value={currentQuestion.scaleRange?.min || 1}
                                          onChange={(e) => {
                                            const min = parseInt(e.target.value);
                                            setCurrentQuestion(prev => ({
                                              ...prev,
                                              scaleRange: {
                                                min,
                                                max: prev.scaleRange?.max || 5,
                                                labels: {
                                                  start: prev.scaleRange?.labels?.start || '',
                                                  end: prev.scaleRange?.labels?.end || ''
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          min="1"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm text-gray-400">Max Value</label>
                                        <motion.input
                                          type="number"
                                          value={currentQuestion.scaleRange?.max || 5}
                                          onChange={(e) => {
                                            const max = parseInt(e.target.value);
                                            setCurrentQuestion(prev => ({
                                              ...prev,
                                              scaleRange: {
                                                min: prev.scaleRange?.min || 1,
                                                max,
                                                labels: {
                                                  start: prev.scaleRange?.labels?.start || '',
                                                  end: prev.scaleRange?.labels?.end || ''
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          min="2"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                      <div>
                                        <label className="text-sm text-gray-400">Start Label</label>
                                        <motion.input
                                          type="text"
                                          value={currentQuestion.scaleRange?.labels?.start || ''}
                                          onChange={(e) => {
                                            const start = e.target.value;
                                            setCurrentQuestion(prev => ({
                                              ...prev,
                                              scaleRange: {
                                                min: prev.scaleRange?.min || 1,
                                                max: prev.scaleRange?.max || 5,
                                                labels: {
                                                  start,
                                                  end: prev.scaleRange?.labels?.end || ''
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          placeholder="e.g., Poor"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm text-gray-400">End Label</label>
                                        <motion.input
                                          type="text"
                                          value={currentQuestion.scaleRange?.labels?.end || ''}
                                          onChange={(e) => {
                                            const end = e.target.value;
                                            setCurrentQuestion(prev => ({
                                              ...prev,
                                              scaleRange: {
                                                min: prev.scaleRange?.min || 1,
                                                max: prev.scaleRange?.max || 5,
                                                labels: {
                                                  start: prev.scaleRange?.labels?.start || '',
                                                  end
                                                }
                                              }
                                            }));
                                          }}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          placeholder="e.g., Excellent"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {currentQuestion.type === 'truefalse' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Correct Answer
                                    </label>
                                    <div className="flex gap-4">
                                      <motion.button
                                        onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 0 }))}
                                        className={`flex-1 px-4 py-2 rounded-lg ${
                                          currentQuestion.correctAnswer === 0
                                            ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                            : 'bg-[#2d2f3d] text-gray-400'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        True
                                      </motion.button>
                                      <motion.button
                                        onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 1 }))}
                                        className={`flex-1 px-4 py-2 rounded-lg ${
                                          currentQuestion.correctAnswer === 1
                                            ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                            : 'bg-[#2d2f3d] text-gray-400'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        False
                                      </motion.button>
                                    </div>
                                  </div>
                                )}

                                {currentQuestion.type === 'date' && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ListIcon className="text-[#6366f1]" />
                                      Date Range (Optional)
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm text-gray-400">Min Date</label>
                                        <motion.input
                                          type="date"
                                          value={currentQuestion.dateRange?.min || ''}
                                          onChange={(e) => setCurrentQuestion(prev => ({
                                            ...prev,
                                            dateRange: {
                                              ...prev.dateRange,
                                              min: e.target.value
                                            }
                                          }))}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm text-gray-400">Max Date</label>
                                        <motion.input
                                          type="date"
                                          value={currentQuestion.dateRange?.max || ''}
                                          onChange={(e) => setCurrentQuestion(prev => ({
                                            ...prev,
                                            dateRange: {
                                              ...prev.dateRange,
                                              max: e.target.value
                                            }
                                          }))}
                                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                          whileHover={{ scale: 1.01 }}
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      <label className="text-sm text-gray-400">Correct Date</label>
                                      <motion.input
                                        type="date"
                                        value={typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : ''}
                                        onChange={(e) => setCurrentQuestion(prev => ({
                                          ...prev,
                                          correctAnswer: e.target.value
                                        }))}
                                        className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                                        whileHover={{ scale: 1.01 }}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <ClockIcon className="text-[#6366f1]" />
                                      Time Limit
                                    </label>
                                    <TimeLimitSelector
                                      value={currentQuestion.timeLimit}
                                      onChange={(value) => setCurrentQuestion(prev => ({ ...prev, timeLimit: value }))}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                      <StarIcon className="text-[#6366f1]" />
                                      Points
                                    </label>
                                    <div className="relative">
                                      <div className="flex items-center gap-4">
                                        <motion.button
                                          onClick={() => setCurrentQuestion(prev => ({ ...prev, points: Math.max(1, prev.points - 10) }))}
                                          className="p-2 bg-[#2d2f3d] rounded-lg hover:bg-[#6366f1]/20 transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <MinusIcon className="text-[#6366f1]" />
                                        </motion.button>
                                        
                                        <div className="flex-1">
                                          <motion.div
                                            className="h-2 bg-[#2d2f3d] rounded-full overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                          >
                                            <motion.div
                                              className="h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]"
                                              style={{ width: `${(currentQuestion.points / 100) * 100}%` }}
                                              initial={{ width: 0 }}
                                              animate={{ width: `${(currentQuestion.points / 100) * 100}%` }}
                                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                          </motion.div>
                                        </div>

                                        <motion.button
                                          onClick={() => setCurrentQuestion(prev => ({ ...prev, points: Math.min(100, prev.points + 10) }))}
                                          className="p-2 bg-[#2d2f3d] rounded-lg hover:bg-[#6366f1]/20 transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <PlusIcon className="text-[#6366f1]" />
                                        </motion.button>
                                      </div>

                                      <motion.div
                                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#2d2f3d] rounded-lg text-white text-sm font-medium shadow-lg"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                      >
                                        {currentQuestion.points} points
                                      </motion.div>

                                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                                        <span>1</span>
                                        <span>50</span>
                                        <span>100</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                                    <LightbulbIcon className="text-[#6366f1]" />
                                    Hint (Optional)
                                  </label>
                                  <motion.textarea
                                    name="hint"
                                    value={currentQuestion.hint}
                                    onChange={handleQuestionChange}
                                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                                    rows={2}
                                    placeholder="Enter a hint for this question (optional)"
                                    whileHover={{ scale: 1.01 }}
                                  />
                                </div>

                                <motion.button
                                  onClick={handleAddQuestion}
                                  className="w-full px-4 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg flex items-center justify-center gap-2"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <EditIcon />
                                  Update Question
                                </motion.button>
                              </div>
                            ) : (
                              <>
                                <p className="text-gray-400 mb-4">{question.text}</p>
                                {question.hint && (
                                  <div className="flex items-center gap-2 text-sm text-yellow-400 mb-4">
                                    <LightbulbIcon />
                                    <span>Hint: {question.hint}</span>
                                  </div>
                                )}
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
                              </>
                            )}
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
                        <FilterIcon className="text-[#6366f1]" />
                        Question Type
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {questionTypes.map(({ value, label, icon: Icon }) => (
                          <motion.button
                            key={value}
                            onClick={() => handleQuestionTypeChange(value)}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                              currentQuestion.type === value
                                ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                : 'bg-[#2d2f3d] text-gray-400 hover:bg-[#6366f1]/20 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon />
                            <span className="text-sm">{label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

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

                    {/* Dynamic Question Options Based on Type */}
                    {currentQuestion.type === 'single' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Options
                        </label>
                        <div className="space-y-3">
                          {currentQuestion.options.map((option, index) => (
                            <motion.div
                              key={index}
                              className="relative group"
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    currentQuestion.correctAnswer === index
                                      ? 'border-[#6366f1] bg-[#6366f1]'
                                      : 'border-white/20 group-hover:border-[#6366f1]/50'
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {currentQuestion.correctAnswer === index && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    >
                                      <CheckIcon className="text-white text-sm" />
                                    </motion.div>
                                  )}
                                </motion.div>
                                
                                <motion.input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400 transition-all duration-200 group-hover:border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
                                  placeholder={`Option ${index + 1}`}
                                  whileFocus={{ scale: 1.02 }}
                                />

                                <motion.button
                                  onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                    currentQuestion.correctAnswer === index
                                      ? 'bg-[#6366f1] text-white'
                                      : 'bg-[#2d2f3d] text-gray-400 hover:bg-[#6366f1]/20 hover:text-white'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Correct
                                </motion.button>
                              </div>

                              {currentQuestion.correctAnswer === index && (
                                <motion.div
                                  className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#6366f1] shadow-lg"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'multiple' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Options (Select all correct answers)
                        </label>
                          {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <motion.input
                              type="checkbox"
                              checked={Array.isArray(currentQuestion.correctAnswer) && (currentQuestion.correctAnswer as number[]).includes(index)}
                              onChange={(e) => {
                                const currentIndex = index;
                                const currentAnswers = Array.isArray(currentQuestion.correctAnswer) 
                                  ? currentQuestion.correctAnswer as number[]
                                  : [];
                                
                                const newCorrectAnswers = e.target.checked
                                  ? [...currentAnswers, currentIndex]
                                  : currentAnswers.filter(i => i !== currentIndex);
                                
                                setCurrentQuestion(prev => ({
                                  ...prev,
                                  correctAnswer: newCorrectAnswers
                                }));
                              }}
                              className="mt-3 accent-[#6366f1]"
                              whileHover={{ scale: 1.1 }}
                            />
                            <motion.input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                              placeholder={`Option ${index + 1}`}
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === 'short_answer' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Correct Answer
                        </label>
                        <motion.input
                          type="text"
                          value={typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : ''}
                          onChange={(e) => setCurrentQuestion(prev => ({
                            ...prev,
                            correctAnswer: e.target.value
                          }))}
                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                          placeholder="Enter the correct answer"
                          whileHover={{ scale: 1.01 }}
                        />
                      </div>
                    )}

                    {currentQuestion.type === 'scale' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Scale Settings
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">Min Value</label>
                            <motion.input
                              type="number"
                              value={currentQuestion.scaleRange?.min || 1}
                              onChange={(e) => {
                                const min = parseInt(e.target.value);
                                setCurrentQuestion(prev => ({
                                  ...prev,
                                  scaleRange: {
                                    min,
                                    max: prev.scaleRange?.max || 5,
                                    labels: {
                                      start: prev.scaleRange?.labels?.start || '',
                                      end: prev.scaleRange?.labels?.end || ''
                                    }
                                  }
                                }));
                              }}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              min="1"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Max Value</label>
                            <motion.input
                              type="number"
                              value={currentQuestion.scaleRange?.max || 5}
                              onChange={(e) => {
                                const max = parseInt(e.target.value);
                                setCurrentQuestion(prev => ({
                                  ...prev,
                                  scaleRange: {
                                    min: prev.scaleRange?.min || 1,
                                    max,
                                    labels: {
                                      start: prev.scaleRange?.labels?.start || '',
                                      end: prev.scaleRange?.labels?.end || ''
                                    }
                                  }
                                }));
                              }}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              min="2"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="text-sm text-gray-400">Start Label</label>
                            <motion.input
                              type="text"
                              value={currentQuestion.scaleRange?.labels?.start || ''}
                              onChange={(e) => {
                                const start = e.target.value;
                                setCurrentQuestion(prev => ({
                                  ...prev,
                                  scaleRange: {
                                    min: prev.scaleRange?.min || 1,
                                    max: prev.scaleRange?.max || 5,
                                    labels: {
                                      start,
                                      end: prev.scaleRange?.labels?.end || ''
                                    }
                                  }
                                }));
                              }}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              placeholder="e.g., Poor"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">End Label</label>
                            <motion.input
                              type="text"
                              value={currentQuestion.scaleRange?.labels?.end || ''}
                              onChange={(e) => {
                                const end = e.target.value;
                                setCurrentQuestion(prev => ({
                                  ...prev,
                                  scaleRange: {
                                    min: prev.scaleRange?.min || 1,
                                    max: prev.scaleRange?.max || 5,
                                    labels: {
                                      start: prev.scaleRange?.labels?.start || '',
                                      end
                                    }
                                  }
                                }));
                              }}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              placeholder="e.g., Excellent"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'truefalse' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Correct Answer
                        </label>
                        <div className="flex gap-4">
                          <motion.button
                            onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 0 }))}
                            className={`flex-1 px-4 py-2 rounded-lg ${
                              currentQuestion.correctAnswer === 0
                                ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                : 'bg-[#2d2f3d] text-gray-400'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            True
                          </motion.button>
                          <motion.button
                            onClick={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: 1 }))}
                            className={`flex-1 px-4 py-2 rounded-lg ${
                              currentQuestion.correctAnswer === 1
                                ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                                : 'bg-[#2d2f3d] text-gray-400'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            False
                          </motion.button>
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'date' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ListIcon className="text-[#6366f1]" />
                          Date Range (Optional)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400">Min Date</label>
                            <motion.input
                              type="date"
                              value={currentQuestion.dateRange?.min || ''}
                              onChange={(e) => setCurrentQuestion(prev => ({
                                ...prev,
                                dateRange: {
                                  ...prev.dateRange,
                                  min: e.target.value
                                }
                              }))}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-400">Max Date</label>
                            <motion.input
                              type="date"
                              value={currentQuestion.dateRange?.max || ''}
                              onChange={(e) => setCurrentQuestion(prev => ({
                                ...prev,
                                dateRange: {
                                  ...prev.dateRange,
                                  max: e.target.value
                                }
                              }))}
                              className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                              whileHover={{ scale: 1.01 }}
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="text-sm text-gray-400">Correct Date</label>
                          <motion.input
                            type="date"
                            value={typeof currentQuestion.correctAnswer === 'string' ? currentQuestion.correctAnswer : ''}
                            onChange={(e) => setCurrentQuestion(prev => ({
                              ...prev,
                              correctAnswer: e.target.value
                            }))}
                            className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                            whileHover={{ scale: 1.01 }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <ClockIcon className="text-[#6366f1]" />
                          Time Limit
                        </label>
                        <TimeLimitSelector
                          value={currentQuestion.timeLimit}
                          onChange={(value) => setCurrentQuestion(prev => ({ ...prev, timeLimit: value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                          <StarIcon className="text-[#6366f1]" />
                          Points
                        </label>
                        <div className="relative">
                          <div className="flex items-center gap-4">
                            <motion.button
                              onClick={() => setCurrentQuestion(prev => ({ ...prev, points: Math.max(1, prev.points - 10) }))}
                              className="p-2 bg-[#2d2f3d] rounded-lg hover:bg-[#6366f1]/20 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                              <MinusIcon className="text-[#6366f1]" />
                            </motion.button>
                            
                            <div className="flex-1">
                                    <motion.div
                                className="h-2 bg-[#2d2f3d] rounded-full overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                              >
                                <motion.div
                                  className="h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]"
                                  style={{ width: `${(currentQuestion.points / 100) * 100}%` }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(currentQuestion.points / 100) * 100}%` }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                    </motion.div>
                            </div>

                            <motion.button
                              onClick={() => setCurrentQuestion(prev => ({ ...prev, points: Math.min(100, prev.points + 10) }))}
                              className="p-2 bg-[#2d2f3d] rounded-lg hover:bg-[#6366f1]/20 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <PlusIcon className="text-[#6366f1]" />
                            </motion.button>
                          </div>

                          <motion.div
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#2d2f3d] rounded-lg text-white text-sm font-medium shadow-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          >
                            {currentQuestion.points} points
                                </motion.div>
                                
                          <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>1</span>
                            <span>50</span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <LightbulbIcon className="text-[#6366f1]" />
                        Hint (Optional)
                      </label>
                      <motion.textarea
                        name="hint"
                        value={currentQuestion.hint}
                        onChange={handleQuestionChange}
                        className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white placeholder-gray-400"
                        rows={2}
                        placeholder="Enter a hint for this question (optional)"
                        whileHover={{ scale: 1.01 }}
                      />
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

      {/* Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCategoryAdded={handleCategoryAdded}
      />
    </div>
  );
};

export default QuizCreationPage; 