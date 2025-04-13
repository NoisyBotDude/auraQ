import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../contexts';
import { Quiz, Question } from '../types';

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
          className="text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create New Quiz
        </motion.h1>

        <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'info' ? 'bg-[#3b82f6] text-white' : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                }`}
              >
                1
              </div>
              <div className="w-20 h-1 bg-[#3b82f6]/20" />
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'questions' ? 'bg-[#3b82f6] text-white' : 'bg-[#3b82f6]/20 text-[#3b82f6]'
                }`}
              >
                2
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'info' ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={quizData.title}
                    onChange={handleQuizInfoChange}
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={quizData.description}
                    onChange={handleQuizInfoChange}
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                    rows={4}
                    placeholder="Enter quiz description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={quizData.category}
                    onChange={handleQuizInfoChange}
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                    placeholder="Enter quiz category"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleQuizInfoChange}
                    className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {quizData.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#3b82f6]/20 text-[#3b82f6] rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-[#3b82f6] hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                      placeholder="Add a tag"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep('questions')}
                    className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Questions List */}
                {quizData.questions?.map((question, index) => (
                  <div key={question.id} className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10">
                    <h3 className="font-medium text-gray-300">Question {index + 1}</h3>
                    <p className="mt-2 text-gray-400">{question.text}</p>
                  </div>
                ))}

                {/* Add New Question */}
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-medium mb-4 text-gray-300">Add New Question</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Question Text
                      </label>
                      <textarea
                        name="text"
                        value={currentQuestion.text}
                        onChange={handleQuestionChange}
                        className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                        rows={3}
                        placeholder="Enter question text"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Options
                      </label>
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={currentQuestion.correctAnswer === index}
                            onChange={() => setCurrentQuestion(prev => ({
                              ...prev,
                              correctAnswer: index
                            }))}
                            className="mt-3 accent-[#3b82f6]"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white placeholder-gray-400"
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Time Limit (seconds)
                        </label>
                        <input
                          type="number"
                          name="timeLimit"
                          value={currentQuestion.timeLimit}
                          onChange={handleQuestionChange}
                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Points
                        </label>
                        <input
                          type="number"
                          name="points"
                          value={currentQuestion.points}
                          onChange={handleQuestionChange}
                          className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#3b82f6] text-white"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddQuestion}
                      className="w-full px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
                    >
                      Add Question
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setStep('info')}
                    className="px-6 py-2 border border-[#3b82f6] text-[#3b82f6] rounded-lg hover:bg-[#3b82f6]/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3b82f6]/80 transition-colors"
                  >
                    Create Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuizCreationPage; 