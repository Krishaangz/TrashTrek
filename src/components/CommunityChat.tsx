import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const CommunityChat = () => {
  const { user } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    if (!user || user.ecoPoints < 1000) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      // Handle opening chat when implemented
      console.log('Opening chat...');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
      >
        <MessageCircle className="text-[#D0FD3E]" />
        {user && user.ecoPoints >= 1000 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
        )}
      </button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-12 w-64 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg"
          >
            <p className="text-sm text-white">
              Unlock global chat by earning 1,000 Eco-Points! Keep making a difference!
            </p>
            <div className="mt-2 text-xs text-gray-300">
              Current: {user?.ecoPoints || 0} / 1,000 points
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityChat;