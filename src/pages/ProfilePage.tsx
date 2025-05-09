import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/index';
import { FaUser, FaCamera, FaSave, FaTimes, FaTrophy, FaStar } from 'react-icons/fa';
import BackButton from '../components/shared/BackButton';

const FaUser1 = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCamera1 = FaCamera as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSave1 = FaSave as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTimes1 = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTrophy1 = FaTrophy as React.FC<React.SVGProps<SVGSVGElement>>;
const FaStar1 = FaStar as React.FC<React.SVGProps<SVGSVGElement>>;



const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [avatarPreview, setAvatarPreview] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=AuraQUser");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [followers, setFollowers] = useState(128);
  const [following, setFollowing] = useState(64);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newUsername.trim() && newUsername !== user?.username) {
      updateUser({
        ...user,
        username: newUsername,
        avatar: {
          baseCharacter: avatarPreview,
          accessories: user?.avatar.accessories || [],
          colors: user?.avatar.colors || {},
          unlocks: user?.avatar.unlocks || []
        }
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewUsername(user?.username || '');
    setAvatarPreview("https://api.dicebear.com/7.x/avataaars/svg?seed=AuraQUser");
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      {/* Animated Nebula Background */}
      <motion.div
        className="absolute w-[40rem] h-[40rem] rounded-full -top-32 -left-32 blur-[140px] z-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [-50, 50, -50],
          y: [-50, 50, -50]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
            Profile
          </h1>
          <p className="text-gray-400">Manage your AuraQ profile</p>
        </motion.div>

        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                {isEditing && (
                  <motion.button
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaCamera1 className="text-white" />
                  </motion.button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
              </motion.div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <motion.div 
                className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 text-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-2xl font-bold text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300">42</div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Quizzes</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 text-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-2xl font-bold text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300">1,250</div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Points</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 text-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-2xl font-bold text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300">#15</div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Rank</div>
              </motion.div>
            </div>

            {/* Following/Followers Section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div 
                className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 text-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-2xl font-bold text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300">{followers}</div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Followers</div>
              </motion.div>
              <motion.div 
                className="p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 text-center group relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-2xl font-bold text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300">{following}</div>
                <div className="text-gray-400 group-hover:text-white transition-colors duration-300">Following</div>
              </motion.div>
            </div>

            {/* Username Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10 group">
                <FaUser1 className="text-gray-400 group-hover:text-[#8b5cf6] transition-colors duration-300" />
                {isEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none"
                    placeholder="Enter new username"
                  />
                ) : (
                  <span className="text-white group-hover:text-[#8b5cf6] transition-colors duration-300">{user?.username}</span>
                )}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-[#2d2f3d]/50 rounded-lg border border-white/10 group relative overflow-hidden"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
                    <FaTrophy1 className="text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-white group-hover:text-[#8b5cf6] transition-colors duration-300">Quiz Master</div>
                    <div className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Completed 10 quizzes</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 bg-[#2d2f3d]/50 rounded-lg border border-white/10 group relative overflow-hidden"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
                    <FaStar1 className="text-[#3b82f6] group-hover:text-[#8b5cf6] transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-white group-hover:text-[#8b5cf6] transition-colors duration-300">Perfect Score</div>
                    <div className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Scored 100% in a quiz</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              {isEditing ? (
                <>
                  <motion.button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaTimes1 />
                    <span>Cancel</span>
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] text-white hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaSave1 />
                    <span>Save</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899] text-white hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUser1 />
                  <span>Edit Profile</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage; 