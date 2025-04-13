import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Quiz } from '../../types';

interface QuizCardProps {
  quiz: Quiz;
  showCreator?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, showCreator = true }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${
            quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {quiz.difficulty}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{quiz.questions.length} questions</span>
            <span>•</span>
            <span>{quiz.plays} plays</span>
          </div>
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mr-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-red-500" 
                viewBox="0 0 20 20" 
                fill={quiz.likes > 0 ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd" 
                />
              </svg>
            </motion.button>
            <span>{quiz.likes}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          {showCreator && (
            <div className="text-sm text-gray-500">
              Created by <span className="font-medium">{quiz.creatorId}</span>
            </div>
          )}
          <Link
            to={`/quiz/${quiz.id}`}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizCard; 