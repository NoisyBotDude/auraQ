import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../contexts';
import { mockQuizzes } from '../data/mockQuizzes';
import QuizCompletionScreen from '../components/quiz/QuizCompletionScreen';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setQuiz, currentQuestion, nextQuestion, updateScore, score, showCompletionScreen, setShowCompletionScreen } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const quiz = mockQuizzes.find(q => q.id === id);
    if (quiz) {
      setQuiz(quiz);
    } else {
      navigate('/explore');
    }
  }, [id, setQuiz, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswerSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswerSubmitted) {
      handleAnswerSubmit();
    }
  }, [timeLeft, isAnswerSubmitted]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswerSubmitted(true);
    const currentQuiz = mockQuizzes.find(q => q.id === id);
    if (currentQuiz) {
      const question = currentQuiz.questions[currentQuestion];
      if (selectedAnswer === question.correctAnswer) {
        updateScore(question.points);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setTimeLeft(30);
    nextQuestion();
  };

  const currentQuiz = mockQuizzes.find(q => q.id === id);
  if (!currentQuiz) return null;

  const question = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10">
            {/* Quiz Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-white">{currentQuiz.title}</h1>
                <p className="text-gray-400">{currentQuiz.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#3b82f6]">{score}</div>
                <div className="text-gray-400">Score</div>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-8">
              <div className="w-full h-2 bg-[#2d2f3d] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7]"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(timeLeft / 30) * 100}%` }}
                  transition={{ duration: timeLeft, ease: "linear" }}
                />
              </div>
              <div className="text-right mt-2 text-gray-400">{timeLeft}s</div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </h2>
              <p className="text-lg text-gray-300 mb-6">{question.text}</p>

              {/* Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      isAnswerSubmitted
                        ? index === question.correctAnswer
                          ? 'bg-green-500/20 border-green-500'
                          : selectedAnswer === index
                          ? 'bg-red-500/20 border-red-500'
                          : 'bg-[#2d2f3d] border-white/10'
                        : selectedAnswer === index
                        ? 'bg-[#3b82f6]/20 border-[#3b82f6]'
                        : 'bg-[#2d2f3d] border-white/10 hover:bg-[#3b82f6]/10'
                    } border`}
                    onClick={() => !isAnswerSubmitted && setSelectedAnswer(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isAnswerSubmitted}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              {!isAnswerSubmitted ? (
                <motion.button
                  className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors disabled:opacity-50"
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Answer
                </motion.button>
              ) : (
                <motion.button
                  className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCompletionScreen && (
        <QuizCompletionScreen
          score={score}
          onClose={() => setShowCompletionScreen(false)}
        />
      )}
    </div>
  );
};

export default QuizPage; 