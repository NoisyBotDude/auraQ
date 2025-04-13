import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz, useNotification, useAudio } from '../contexts';

const QuizPlayPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentQuiz, currentQuestion, score, nextQuestion, updateScore } = useQuiz();
  const { addNotification } = useNotification();
  const { playSound } = useAudio();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30); // Default time per question
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  useEffect(() => {
    if (!currentQuiz) {
      // Load quiz data here
      // For now using mock data
      addNotification({
        message: 'Quiz loaded successfully!',
        type: 'success'
      });
    }
  }, [quizId]);

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
    return Math.round((timeLeft / 30) * 100); // Score based on time left
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= (currentQuiz?.questions.length || 0)) {
      navigate('/results');
      return;
    }

    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setTimeLeft(30);
    nextQuestion();
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const currentQuestionData = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12 text-black">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress and Score */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold">
            Question {currentQuestion + 1}/{currentQuiz.questions.length}
          </div>
          <div className="text-lg font-semibold text-primary-600">
            Score: {score}
          </div>
        </div>

        {/* Timer */}
        <motion.div 
          className="w-full h-2 bg-gray-200 rounded-full mb-8"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: timeLeft / 30 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              timeLeft > 10 ? 'bg-primary-500' : 'bg-red-500'
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
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">{currentQuestionData.text}</h2>

            <div className="grid gap-4">
              {currentQuestionData.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`p-4 rounded-lg text-left transition-colors ${
                    isAnswerRevealed
                      ? index === currentQuestionData.correctAnswer
                        ? 'bg-green-100 border-green-500'
                        : index === selectedAnswer
                        ? 'bg-red-100 border-red-500'
                        : 'bg-gray-100'
                      : selectedAnswer === index
                      ? 'bg-primary-100 border-primary-500'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } border-2`}
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
              className="px-8 py-3 bg-primary-500 text-white rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              {currentQuestion + 1 >= currentQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayPage; 