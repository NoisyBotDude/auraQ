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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Create New Quiz</h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'info' ? 'bg-primary-500 text-black' : 'bg-primary-100 text-primary-500'
                }`}
              >
                1
              </div>
              <div className="w-20 h-1 bg-primary-100" />
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'questions' ? 'bg-primary-500 text-black' : 'bg-primary-100 text-primary-500'
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
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quiz Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={quizData.title}
                      onChange={handleQuizInfoChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter quiz title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={quizData.description}
                      onChange={handleQuizInfoChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      rows={4}
                      placeholder="Enter quiz description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={quizData.category}
                      onChange={handleQuizInfoChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter quiz category"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={quizData.difficulty}
                      onChange={handleQuizInfoChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {quizData.tags?.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-primary-600 hover:text-primary-800"
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
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Add a tag"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep('questions')}
                      className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="space-y-6">
                  {/* Questions List */}
                  {quizData.questions?.map((question, index) => (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <p className="mt-2">{question.text}</p>
                    </div>
                  ))}

                  {/* Add New Question */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Add New Question</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Text
                        </label>
                        <textarea
                          name="text"
                          value={currentQuestion.text}
                          onChange={handleQuestionChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          rows={3}
                          placeholder="Enter question text"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                              className="mt-3"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Limit (seconds)
                          </label>
                          <input
                            type="number"
                            name="timeLimit"
                            value={currentQuestion.timeLimit}
                            onChange={handleQuestionChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Points
                          </label>
                          <input
                            type="number"
                            name="points"
                            value={currentQuestion.points}
                            onChange={handleQuestionChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleAddQuestion}
                        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      onClick={() => setStep('info')}
                      className="px-6 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Create Quiz
                    </button>
                  </div>
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