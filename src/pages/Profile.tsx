import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ShoppingBag, Gift, Trees as Tree } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-[#D0FD3E]/20 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-[#D0FD3E]">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#D0FD3E] mb-2">{user?.username || 'User'}</h1>
            <p className="text-gray-300">{user?.email || 'email@example.com'}</p>
            <p className="text-[#D0FD3E] mt-2">Rank: {user?.rank || 'Eco Rookie'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <section>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Settings className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Notification Preferences
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Privacy Settings
              </button>
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <ShoppingBag className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Marketplace</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Gift className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Gift Cards</p>
                <p className="text-sm text-gray-300">From 500 points</p>
              </button>
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Tree className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Plant a Tree</p>
                <p className="text-sm text-gray-300">100 points</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Profile;