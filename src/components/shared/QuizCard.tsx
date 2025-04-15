import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaUsers, FaAtom, FaGlobe, FaFilm, FaLaptop, FaBook, FaCamera, FaHistory, FaFlask } from 'react-icons/fa';

const FaPlay1 = FaPlay as React.FC<React.SVGProps<SVGSVGElement>>;
const FaStar1 = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUsers1 = FaUsers as React.FC<React.SVGProps<SVGSVGElement>>;
const FaAtom1 = FaAtom as React.FC<React.SVGProps<SVGSVGElement>>;
const FaGlobe1 = FaGlobe as React.FC<React.SVGProps<SVGSVGElement>>;
const FaFilm1 = FaFilm as React.FC<React.SVGProps<SVGSVGElement>>;
const FaLaptop1 = FaLaptop as React.FC<React.SVGProps<SVGSVGElement>>;
const FaBook1 = FaBook as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCamera1 = FaCamera as React.FC<React.SVGProps<SVGSVGElement>>;
const FaHistory1 = FaHistory as React.FC<React.SVGProps<SVGSVGElement>>;
const FaFlask1 = FaFlask as React.FC<React.SVGProps<SVGSVGElement>>;

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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'science':
        return <FaAtom1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'geography':
        return <FaGlobe1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'entertainment':
        return <FaFilm1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'technology':
        return <FaLaptop1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'history':
        return <FaHistory1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'art':
        return <FaCamera1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      case 'biology':
        return <FaFlask1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
      default:
        return <FaBook1 className="text-[#8b5cf6] text-2xl group-hover:drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />;
    }
  };

  return (
    <motion.div
      className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10 relative overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {getCategoryIcon(quiz.category)}
          <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
        </div>
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
            <FaUsers1 className="text-[#8b5cf6] text-sm drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]" />
            <span>{quiz.plays}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaStar1 className="text-[#8b5cf6] text-sm drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]" />
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
    </motion.div>
  );
};

export default QuizCard; 