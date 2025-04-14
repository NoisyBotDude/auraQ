import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaUsers } from 'react-icons/fa';

const FaPlay1 = FaPlay as React.FC<React.SVGProps<SVGSVGElement>>;
const FaStar1 = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUsers1 = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    author: string;
    plays: number;
    rating: number;
  };
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-blue-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10 relative overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
          <span className={`text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </span>
        </div>

        <p className="text-gray-400 mb-4">{quiz.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#2d2f3d]/50 text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>By {quiz.author}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaUsers1 className="text-sm" />
              <span>{quiz.plays}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaStar1 className="text-yellow-400" />
              <span>{quiz.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/quiz/${quiz.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] text-white font-medium hover:opacity-90 transition-opacity duration-200"
        >
          <FaPlay1 className="text-sm" />
          <span>Start Quiz</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizCard; 