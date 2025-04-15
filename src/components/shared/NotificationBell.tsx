import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

const FaBell1 = FaBell as React.FC<React.SVGProps<SVGSVGElement>>;

const mockNotifications = [
  { id: 1, message: 'New quiz available: Space Exploration', time: '2 hours ago' },
  { id: 2, message: 'Your quiz has been played 10 times', time: '1 day ago' },
  { id: 3, message: 'You earned a new achievement: Quiz Master', time: '2 days ago' },
];

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = mockNotifications.length;
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={notificationRef} className="fixed bottom-4 right-4 z-50">
      <motion.button
        className="relative p-3 rounded-full backdrop-blur-md bg-purple-500/20 border border-purple-400/30 text-white shadow-lg hover:bg-purple-500/30 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBell1 className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-80 backdrop-blur-md bg-purple-500/20 border border-purple-400/30 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-purple-400/30">
              <h3 className="font-semibold text-white">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b border-purple-400/30 hover:bg-purple-500/30 transition-colors duration-300"
                >
                  <p className="text-sm text-white">{notification.message}</p>
                  <p className="text-xs text-white/60 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;