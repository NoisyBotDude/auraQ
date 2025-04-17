import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaRocket } from 'react-icons/fa';

interface TimeLimitSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>;
const ClockIcon = FaClock as React.FC<React.SVGProps<SVGSVGElement>>;

const TimeLimitSelector: React.FC<TimeLimitSelectorProps> = ({ value, onChange }) => {
  const timeOptions = [10, 15, 30, 45, 60, 90, 120];

  return (
    <div className="relative">
      <div className="flex items-center justify-between space-x-4">
        <motion.div
          className="w-16 h-16 bg-[#2d2f3d] rounded-xl flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: value,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <ClockIcon className="text-2xl text-[#6366f1]" />
        </motion.div>

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Time Limit</span>
            <span className="text-sm font-medium text-white">{value} seconds</span>
          </div>

          <div className="relative h-2 bg-[#2d2f3d] rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]"
              initial={{ width: '0%' }}
              animate={{
                width: `${(value / Math.max(...timeOptions)) * 100}%`
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="flex justify-between mt-4">
            {timeOptions.map((time) => (
              <motion.button
                key={time}
                onClick={() => onChange(time)}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center ${
                  value === time
                    ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white'
                    : 'bg-[#2d2f3d] text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: value === time ? 1.1 : 1,
                  y: value === time ? -2 : 0
                }}
              >
                <span className="text-xs font-medium">{time}</span>
                {value === time && (
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    style={{
                      background: 'radial-gradient(circle at center, #6366f1 0%, transparent 70%)'
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLimitSelector; 