import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz, useNotification, useAudio } from '../contexts/index';
import { mockQuizzes } from '../data/mockQuizzes';
import QuizCompletionScreen from '../components/quiz/QuizCompletionScreen';
import BackButton from '../components/shared/BackButton';
import { Question } from '../types';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';

const QuizPlayPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestion, score, nextQuestion, updateScore, setQuiz, showCompletionScreen, setShowCompletionScreen, setCurrentQuestion, setScore } = useQuiz();
  const { addNotification } = useNotification();
  const { playSound } = useAudio();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [powerUps, setPowerUps] = useState({
    skip: 1,
    hint: 2,
    time: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);

  // Memoize current question data
  const currentQuestionData: Question | undefined = useMemo(() => 
    currentQuiz?.questions[currentQuestion], 
    [currentQuiz, currentQuestion]
  );

  // Load quiz data
  useEffect(() => {
    if (quizId) {
      setIsLoading(true);
      try {
        const quiz = mockQuizzes.find(q => q.id === quizId);
        if (quiz) {
          // Reset all quiz state
          setQuiz(quiz);
          setCurrentQuestion(0);
          setScore(0);
          setTimeLeft(quiz.questions[0]?.timeLimit || 30);
          setSelectedAnswer(null);
          setIsAnswerRevealed(false);
          setShowHint(false);
          setStreak(0);
          setShowStreak(false);
          setPowerUps({
            skip: 1,
            hint: 2,
            time: 1
          });
          setShowCompletionScreen(false);
          addNotification({
            message: 'Quiz loaded successfully!',
            type: 'success'
          });
        } else {
          throw new Error('Quiz not found');
        }
      } catch (error) {
        addNotification({
          message: error instanceof Error ? error.message : 'Failed to load quiz',
          type: 'error'
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    }
  }, [quizId]);

  // Timer effect with proper dependencies
  useEffect(() => {
    if (!isAnswerRevealed && timeLeft > 0 && currentQuestionData) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAnswerRevealed, timeLeft, currentQuestionData]);

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= (currentQuiz?.questions.length || 0)) {
      setShowCompletionScreen(true);
      return;
    }

    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setTimeLeft(currentQuiz?.questions[currentQuestion + 1]?.timeLimit || 30);
    setShowHint(false);
    nextQuestion();
  };

  const handleTimeUp = useCallback(() => {
    setIsAnswerRevealed(true);
    playSound('timeUp');
    addNotification({
      message: 'Time\'s up!',
      type: 'info'
    });

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  }, [playSound, addNotification, handleNextQuestion]);

  useEffect(() => {
    if (timeLeft === 0 && !isAnswerRevealed) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswerRevealed, handleTimeUp]);

  // Reset timer when question changes
  useEffect(() => {
    if (currentQuestionData) {
      setTimeLeft(currentQuestionData.timeLimit);
    }
  }, [currentQuestionData]);

  const calculateScore = useCallback(() => {
    if (!currentQuestionData) return 0;
    return Math.round((timeLeft / currentQuestionData.timeLimit) * 100);
  }, [timeLeft, currentQuestionData]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (isAnswerRevealed || !currentQuestionData) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswerRevealed(true);
    
    if (answerIndex === currentQuestionData.correctAnswer) {
      playSound('correct');
      updateScore(calculateScore());
      setStreak(prev => prev + 1);
      setShowStreak(true);
      setTimeout(() => setShowStreak(false), 2000);
    } else {
      playSound('incorrect');
      setStreak(0);
    }
  }, [isAnswerRevealed, currentQuestionData, playSound, updateScore, calculateScore]);

  const handleSkipQuestion = () => {
    if (powerUps.skip > 0) {
      setPowerUps(prev => ({ ...prev, skip: prev.skip - 1 }));
      handleNextQuestion();
    }
  };

  const handleShowHint = () => {
    if (powerUps.hint > 0 && currentQuestionData?.hint) {
      setPowerUps(prev => ({ ...prev, hint: prev.hint - 1 }));
      setShowHint(true);
    }
  };

  const handleAddTime = () => {
    if (powerUps.time > 0) {
      setPowerUps(prev => ({ ...prev, time: prev.time - 1 }));
      setTimeLeft(prev => prev + 10);
    }
  };

  const handleBackClick = useCallback(() => {
    setShowExitConfirmation(true);
  }, []);

  const handleExitConfirm = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const handleExitCancel = useCallback(() => {
    setShowExitConfirmation(false);
  }, []);

  const handlePowerUpClick = useCallback((powerUp: string) => {
    setActivePowerUp(powerUp);
    // Add power-up logic here
    setTimeout(() => {
      setActivePowerUp(null);
    }, 2000);
  }, []);

  if (isLoading || !currentQuiz || !currentQuestionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#3b82f6] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      </div>
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Enhanced Progress and Score Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">
              Question {currentQuestion + 1}/{currentQuiz.questions.length}
            </div>
            <AnimatePresence>
              {showStreak && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full text-sm font-bold"
                >
                  {streak}x Streak! 🔥
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-lg font-semibold text-[#3b82f6]">
            Score: {score}
          </div>
        </div>

        {/* Power-ups Section */}
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShowHint}
            disabled={powerUps.hint === 0}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
              powerUps.hint > 0 ? 'bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30' : 'bg-gray-700/50 cursor-not-allowed'
            }`}
          >
            <span>💡</span>
            <span className="text-sm">Hint ({powerUps.hint})</span>
          </motion.button>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkipQuestion}
              disabled={powerUps.skip === 0}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                powerUps.skip > 0 ? 'bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30' : 'bg-gray-700/50 cursor-not-allowed'
              }`}
            >
            <span>⏭️</span>
            <span className="text-sm">Skip ({powerUps.skip})</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddTime}
            disabled={powerUps.time === 0}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
              powerUps.time > 0 ? 'bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30' : 'bg-gray-700/50 cursor-not-allowed'
            }`}
          >
            <span>⏱️</span>
            <span className="text-sm">+10s ({powerUps.time})</span>
          </motion.button>
        </div>

        {/* Enhanced Timer */}
        <motion.div 
          className="w-full h-2 bg-[#2d2f3d] rounded-full mb-8"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: timeLeft / 30 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              timeLeft > 10 ? 'bg-[#3b82f6]' : 'bg-red-500'
            }`}
            style={{ width: `100%` }}
          />
        </motion.div>

        {/* Question with Hint */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">{currentQuestionData.text}</h2>
            
            {showHint && currentQuestionData.hint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-[#3b82f6]/20 rounded-lg border border-[#3b82f6]/30"
              >
                <p className="text-sm text-[#3b82f6]">💡 Hint: {currentQuestionData.hint}</p>
              </motion.div>
            )}

            <div className="grid gap-4">
              {currentQuestionData.options.map((option: string, index: number) => (
                <motion.button
                  key={index}
                  className={`p-4 rounded-lg text-left transition-colors ${
                    isAnswerRevealed
                      ? index === currentQuestionData.correctAnswer
                        ? 'bg-green-500/20 border-green-500'
                        : index === selectedAnswer
                        ? 'bg-red-500/20 border-red-500'
                        : 'bg-[#2d2f3d] border-white/10'
                      : selectedAnswer === index
                      ? 'bg-[#3b82f6]/20 border-[#3b82f6]'
                      : 'bg-[#2d2f3d] border-white/10 hover:bg-[#3b82f6]/10'
                  } border`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswerRevealed}
                  whileHover={!isAnswerRevealed ? { scale: 1.02 } : {}}
                  whileTap={!isAnswerRevealed ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{['A', 'B', 'C', 'D'][index]}</span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Question Button with Animation */}
        {isAnswerRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-[#3b82f6] text-white rounded-full text-lg font-semibold hover:bg-[#3b82f6]/80 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {currentQuestion + 1 >= currentQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showCompletionScreen && (
          <QuizCompletionScreen
            score={score}
            onClose={() => {
              setShowCompletionScreen(false);
              navigate('/', { replace: true });
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExitConfirmation && (
          <ConfirmationDialog
            title="Leave Quiz?"
            message="Are you sure you want to leave? Your progress will be lost."
            onConfirm={handleExitConfirm}
            onCancel={handleExitCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPlayPage; 