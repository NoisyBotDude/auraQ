import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz, useNotification, useAudio } from '../contexts';
import { mockQuizzes } from '../data/mockQuizzes';
import QuizCompletionScreen from '../components/quiz/QuizCompletionScreen';

const QuizPlayPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestion, score, nextQuestion, updateScore, setQuiz, showCompletionScreen, setShowCompletionScreen } = useQuiz();
  const { addNotification } = useNotification();
  const { playSound } = useAudio();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    if (quizId) {
      const quiz = mockQuizzes.find(q => q.id === quizId);
      if (quiz) {
        setQuiz(quiz);
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
    } else {
      playSound('incorrect');
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
    setTimeLeft(30);
    nextQuestion();
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#3b82f6]"></div>
      </div>
    );
  }

  const currentQuestionData = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Progress and Score */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold">
            Question {currentQuestion + 1}/{currentQuiz.questions.length}
          </div>
          <div className="text-lg font-semibold text-[#3b82f6]">
            Score: {score}
          </div>
        </div>

        {/* Timer */}
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

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">{currentQuestionData.text}</h2>

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
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Question Button */}
        {isAnswerRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-[#3b82f6] text-white rounded-full text-lg font-semibold hover:bg-[#3b82f6]/80 transition-colors"
            >
              {currentQuestion + 1 >= currentQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
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