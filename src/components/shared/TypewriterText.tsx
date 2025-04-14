import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  isWelcome?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className = '', delay = 0, isWelcome = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 130); // Faster typing for "Welcome"

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isWelcome]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

export default TypewriterText; 