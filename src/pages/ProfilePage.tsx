import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts';
import { FaUser, FaCamera, FaSave, FaTimes } from 'react-icons/fa';

const FaUser1 = FaUser as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCamera1 = FaCamera as React.FC<React.SVGProps<SVGSVGElement>>;
const FaSave1 = FaSave as React.FC<React.SVGProps<SVGSVGElement>>;
const FaTimes1 = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [avatarPreview, setAvatarPreview] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=AuraQUser");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#a855f7] to-[#ec4899]">
            Profile
          </h1>
          <p className="text-gray-400">Manage your AuraQ profile</p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <div className="bg-[#1c1f2e]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
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
              </div>
            </div>

            {/* Username Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#2d2f3d]/50 rounded-lg border border-white/10">
                <FaUser1 className="text-gray-400" />
                {isEditing ? (
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none"
                    placeholder="Enter new username"
                  />
                ) : (
                  <span className="text-white">{user?.username}</span>
                )}
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
                      className="px-4 py-2 rounded-lg bg-[#3b82f6] text-white hover:bg-[#3b82f6]/80 transition-colors duration-200 flex items-center gap-2"
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
                    className="px-4 py-2 rounded-lg bg-[#3b82f6] text-white hover:bg-[#3b82f6]/80 transition-colors duration-200 flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaUser1 />
                    <span>Edit Profile</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 