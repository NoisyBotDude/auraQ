import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz, useNotification, useAudio } from '../contexts/index';
import { mockQuizzes } from '../data/mockQuizzes';
import QuizCompletionScreen from '../components/quiz/QuizCompletionScreen';
import BackButton from '../components/shared/BackButton';

const QuizPlayPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestion, score, nextQuestion, updateScore, setQuiz, showCompletionScreen, setShowCompletionScreen } = useQuiz();
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

  useEffect(() => {
    if (quizId) {
      setIsLoading(true);
      const quiz = mockQuizzes.find(q => q.id === quizId);
      if (quiz) {
        setQuiz(quiz);
        setTimeLeft(quiz.questions[0]?.timeLimit || 30);
        addNotification({
          message: 'Quiz loaded successfully!',
          type: 'success'
        });
      } else {
        addNotification({
          message: 'Quiz not found',
          type: 'error'
        });
        navigate('/explore');
      }
      setIsLoading(false);
    }
  }, [quizId, setQuiz, addNotification, navigate]);

  useEffect(() => {
    if (!isAnswerRevealed && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswerRevealed) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswerRevealed]);

  const handleTimeUp = () => {
    setIsAnswerRevealed(true);
    playSound('timeUp');
    addNotification({
      message: 'Time\'s up!',
      type: 'info'
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswerRevealed) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswerRevealed(true);
    
    const currentQuestionData = currentQuiz?.questions[currentQuestion];
    if (currentQuestionData && answerIndex === currentQuestionData.correctAnswer) {
      playSound('correct');
      updateScore(calculateScore());
      setStreak(prev => prev + 1);
      setShowStreak(true);
      setTimeout(() => setShowStreak(false), 2000);
    } else {
      playSound('incorrect');
      setStreak(0);
    }
  };

  const calculateScore = () => {
    return Math.round((timeLeft / 30) * 100);
  };

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

  if (isLoading || !currentQuiz) {
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

  const currentQuestionData = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative overflow-hidden">
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
          className="w-full h-2 bg-[#2d2f3d] rounded-full mb-8 relative overflow-hidden"
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
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
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
              {currentQuestionData.options.map((option, index) => (
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
              navigate('/explore');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPlayPage; 