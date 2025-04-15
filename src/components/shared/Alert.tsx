import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const CheckCircleIcon = FaCheckCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const ExclamationCircleIcon = FaExclamationCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const InfoCircleIcon = FaInfoCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const TimesCircleIcon = FaTimesCircle as React.FC<React.SVGProps<SVGSVGElement>>;

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="text-red-500" />;
      case 'info':
        return <InfoCircleIcon className="text-blue-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10';
      case 'error':
        return 'bg-red-500/10';
      case 'info':
        return 'bg-blue-500/10';
      case 'warning':
        return 'bg-yellow-500/10';
      default:
        return 'bg-gray-500/10';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-500/20';
      case 'error':
        return 'border-red-500/20';
      case 'info':
        return 'border-blue-500/20';
      case 'warning':
        return 'border-yellow-500/20';
      default:
        return 'border-gray-500/20';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg backdrop-blur-md ${getBgColor()} ${getBorderColor()} border shadow-lg max-w-md`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <TimesCircleIcon />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert; 