import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Recycle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration logic with Supabase
    setAuth(true, { ...formData, ecoPoints: 0 });
    navigate('/home');
  };

  // Background animation variants
  const floatingIcons = Array(5).fill(null).map((_, i) => ({
    initial: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotate: Math.random() * 360,
      opacity: 0.3
    },
    animate: {
      x: [
        Math.random() * window.innerWidth,
        Math.random() * window.innerWidth,
        Math.random() * window.innerWidth
      ],
      y: [
        Math.random() * window.innerHeight,
        Math.random() * window.innerHeight,
        Math.random() * window.innerHeight
      ],
      rotate: [0, 180, 360],
      transition: {
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }));

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#1A2F4F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          initial={icon.initial}
          animate={icon.animate}
          className="absolute pointer-events-none"
        >
          <Recycle 
            className="text-[#D0FD3E]/20" 
            size={40 + Math.random() * 40} 
          />
        </motion.div>
      ))}

      {/* Glowing Orb Background Effect */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-[#D0FD3E]/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          whileHover={{ boxShadow: "0 0 30px rgba(208,253,62,0.2)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <Recycle className="text-[#D0FD3E] w-16 h-16" />
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-center mb-8 text-[#D0FD3E]"
          >
            Join TrashTrek
          </motion.h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              whileBlur="blur"
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#D0FD3E]/20"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;