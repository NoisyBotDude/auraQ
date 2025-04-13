import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeOverlay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000); // total animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[--color-space-dark] text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <div className="relative text-6xl md:text-8xl font-bold">
            {/* Welcome to text */}
            {/* <motion.span
              className="block absolute"
              initial={{ opacity: 1, y: -100, x: -80}}
              animate={{ opacity: 0, y: -400 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Welcome
            </motion.span> */}
            <motion.span
  className="block absolute"
  initial={{ y: 300, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: -400, opacity: 0 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.8,
    delay: 0.2,
  }}
>
  Welcome
</motion.span>
            <motion.span
              className="block absolute"
              initial={{ opacity: 1, y: -20, x: 80 }}
              animate={{ opacity: 0, y: -400 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              to
            </motion.span>

            {/* AuraQ Text that locks into nav */}
            <motion.span
              className="block text-purple-400"
              initial={{ scale: 1.2, y: 80}}
              animate={{
                scale: 0.6,
                y: -300, // move up towards nav
              }}
              transition={{ duration: 1.8, delay: 1 }}
            >
              AuraQ
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;