import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import CommunityChat from './CommunityChat';
import { useAuthStore } from '../stores/authStore';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#1A2F4F] text-white">
      <header className="fixed top-0 w-full z-50 bg-opacity-90 bg-[#0A1A2F] backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="space-y-1.5"
            >
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  className="block h-0.5 w-6 bg-[#D0FD3E]"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: index === 1 
                      ? { opacity: 0 }
                      : { rotate: index === 0 ? 45 : -45, y: index === 0 ? 6 : -6 }
                  }}
                />
              ))}
            </motion.div>
          </button>

          <CommunityChat />
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <Navigation onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;