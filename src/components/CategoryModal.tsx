import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, addNewCategory } from '../data/mockCategories';
import { FaTimes, FaPlus, FaRocket } from 'react-icons/fa';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
}

const TimesIcon = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const PlusIcon = FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onCategoryAdded }) => {
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
    icon: 'FaBook'
  });

  const handleSubmit = () => {
    if (!newCategory.name || !newCategory.description) {
      return;
    }

    const category: Category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon || 'FaBook'
    };

    addNewCategory(category);
    onCategoryAdded(category);
    onClose();
    setNewCategory({ name: '', description: '', icon: 'FaBook' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#1c1f2e]/90 backdrop-blur-md p-6 rounded-xl border border-white/10 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Category</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <TimesIcon />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 bg-[#2d2f3d] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#6366f1] text-white"
                  rows={3}
                  placeholder="Enter category description"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] text-white rounded-lg flex items-center justify-center gap-2"
              >
                <PlusIcon />
                Add Category
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal; 