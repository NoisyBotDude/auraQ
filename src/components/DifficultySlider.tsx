import React from 'react';
import { motion } from 'framer-motion';
import { FaSatellite, FaSpaceShuttle, FaMeteor, FaRocket } from 'react-icons/fa';

interface DifficultySliderProps {
  value: 'easy' | 'medium' | 'hard';
  onChange: (value: 'easy' | 'medium' | 'hard') => void;
}

const RocketIcon = FaRocket as React.FC<React.SVGProps<SVGSVGElement>>
const SatelliteIcon = FaSatellite as React.FC<React.SVGProps<SVGSVGElement>>
const SpaceShuttleIcon = FaSpaceShuttle as React.FC<React.SVGProps<SVGSVGElement>>
const MeteorIcon = FaMeteor as React.FC<React.SVGProps<SVGSVGElement>>

const DifficultySlider: React.FC<DifficultySliderProps> = ({ value, onChange }) => {
  const difficulties = [
    { value: 'easy', icon: SatelliteIcon, color: '#10B981' },
    { value: 'medium', icon: SpaceShuttleIcon, color: '#6366F1' },
    { value: 'hard', icon: MeteorIcon, color: '#EF4444' }
  ] as const;

  const getProgress = () => {
    switch (value) {
      case 'easy': return 0;
      case 'medium': return 50;
      case 'hard': return 100;
    }
  };

  return (
    <div className="relative w-full py-8">
      {/* Track */}
      <div className="absolute h-2 w-[calc(100%-4rem)] left-8 bg-[#2d2f3d] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#EF4444]"
          initial={{ width: '0%' }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Difficulty Markers */}
      <div className="relative flex justify-between px-4">
        {difficulties.map(({ value: val, icon: Icon, color }) => (
          <motion.button
            key={val}
            onClick={() => onChange(val)}
            className={`relative flex flex-col items-center group ${
              value === val ? 'scale-110' : ''
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon Container */}
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                value === val
                  ? 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899]'
                  : 'bg-[#2d2f3d]'
              } shadow-lg`}
              animate={{
                scale: value === val ? 1.2 : 1,
                y: value === val ? -4 : 0
              }}
            >
              <Icon
                className={`text-xl ${
                  value === val ? 'text-white' : 'text-gray-400'
                }`}
              />
            </motion.div>

            {/* Label */}
            <motion.span
              className={`mt-2 text-sm font-medium capitalize ${
                value === val ? 'text-white' : 'text-gray-400'
              }`}
              animate={{
                scale: value === val ? 1.1 : 1
              }}
            >
              {val}
            </motion.span>

            {/* Glow Effect */}
            {value === val && (
              <motion.div
                className="absolute inset-0 -z-10 opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySlider; 