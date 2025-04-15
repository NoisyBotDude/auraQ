import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ArrowLeftIcon = FaArrowLeft as React.FC<React.SVGProps<SVGSVGElement>>;

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 p-2 rounded-full bg-[#8b5cf6]/20 backdrop-blur-md border border-[#8b5cf6]/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:bg-[#8b5cf6]/30 transition-all duration-300"
    >
      <ArrowLeftIcon className="text-xl" />
    </button>
  );
};

export default BackButton; 