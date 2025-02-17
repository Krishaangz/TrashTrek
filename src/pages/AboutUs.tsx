import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Info, MessageCircle, AlertTriangle, File, Video, Mic, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiResponses } from '../data/aiResponses';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';

const AboutUs = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [issueType, setIssueType] = useState('Bug Report');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showAIError, setShowAIError] = useState(false);
  const { scrollYProgress } = useScroll();

  // Animated values for parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Intersection observer hooks for animations
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Spring animations for interactive elements
  const [{ scale }, api] = useSpring(() => ({
    scale: 1,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const handleAIQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim().length < 3) {
      setShowAIError(true);
      setTimeout(() => setShowAIError(false), 3000);
      return;
    }

    setIsLoading(true);
    
    // Process the query
    const words = aiQuery.toLowerCase().split(' ');
    let bestMatch: string | null = null;
    let maxMatches = 0;

    aiResponses.forEach(response => {
      const matches = response.keywords.filter(keyword => 
        words.some(word => word.includes(keyword.toLowerCase()))
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = response.response;
      }
    });

    // Simulate AI processing delay
    setTimeout(() => {
      setAiResponse(bestMatch || "I apologize, but I can only answer questions related to TrashTrek. Please ask about our features, points system, or environmental initiatives.");
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit an issue');
      return;
    }

    try {
      const formData = {
        user_email: user.email,
        issue_type: issueType,
        description: issueDescription,
        attachments: attachments.map(file => file.name).join(', '),
      };

      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
      );

      toast.success('Issue reported successfully!');
      setIssueType('Bug Report');
      setIssueDescription('');
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to submit issue. Please try again.');
    }
  };

  // Animated background elements
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D0FD3E]/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* About TrashTrek */}
        <section className="mb-12">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 50 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4 mb-6"
          >
            <Info className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">About TrashTrek</h2>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={storyInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#D0FD3E]">Our Story</h3>
                <div className="relative">
                  <motion.div
                    style={{ y: yBg }}
                    className="absolute inset-0 bg-gradient-to-b from-[#D0FD3E]/10 to-transparent rounded-lg"
                  />
                  <div className="relative z-10">
                    <p className="text-gray-300 mb-4">
                      TrashTrek was born from the vision of Krishang Saharia, a 15-year-old environmental enthusiast from Bhilai, India. 
                      What started as a school project has grown into a global movement to make environmental cleanup engaging and rewarding.
                    </p>
                    <div className="bg-white/5 p-4 rounded-lg mb-4">
                      <p className="text-gray-300">
                        "We believe that small actions can create big changes. TrashTrek is more than an app - it's a community of eco-warriors making a difference."
                      </p>
                      <p className="text-[#D0FD3E] mt-2">- Krishang Saharia, Founder</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                ref={missionRef}
                initial={{ x: 20, opacity: 0 }}
                animate={missionInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#D0FD3E]">Our Mission</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Gamify Environmental Cleanup', desc: 'Transform waste collection into an engaging, rewarding experience' },
                    { title: 'Educate & Inspire', desc: 'Spread awareness about sustainable practices and their impact' },
                    { title: 'Build Global Community', desc: 'Connect eco-conscious individuals worldwide' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={missionInView ? { x: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 bg-[#D0FD3E]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#D0FD3E]">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-gray-300">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Interactive Vision Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={missionInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-r from-[#0A1A2F] to-[#1A2F4F]">
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(0deg, #D0FD3E10 0%, transparent 100%)',
                      'linear-gradient(180deg, #D0FD3E10 0%, transparent 100%)',
                      'linear-gradient(360deg, #D0FD3E10 0%, transparent 100%)',
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-4 text-[#D0FD3E]">Our Vision</h3>
                  <p className="text-gray-300">
                    We envision a future where environmental consciousness is not just a choice, but a way of life. Through technology and community engagement, we're building a platform that makes sustainable living accessible, engaging, and rewarding for everyone.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Help Center */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4 mb-6"
          >
            <MessageCircle className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">Help Center</h2>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="border border-white/10 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
              <div className="bg-white/5 rounded-lg p-4">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isLoading ? [1, 1.02, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0 }}
                >
                  {aiResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mb-4 p-3 bg-[#D0FD3E]/10 rounded-lg"
                    >
                      <p className="text-gray-300">{aiResponse}</p>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleAIQuery} className="relative">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask about TrashTrek features, points, or initiatives..."
                      className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors pr-12"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#D0FD3E] hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Send size={20} />
                    </button>
                    {showAIError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -top-8 left-0 text-red-400 text-sm"
                      >
                        Please enter a longer question
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              </div>
            </div>

            {/* FAQs and Contact Support Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/faqs')}
                className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                FAQs
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </section>

        {/* Report Issues */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4 mb-6"
          >
            <AlertTriangle className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">Report Issues</h2>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <form onSubmit={handleSubmitIssue} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Issue Type
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                >
                  <option>Bug Report</option>
                  <option>Content Report</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                  placeholder="Describe the issue in detail..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Attachments
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <File className="text-[#D0FD3E]" />
                    <span>Add Files</span>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Video className="text-[#D0FD3E]" />
                    <span>Add Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Mic className="text-[#D0FD3E]" />
                    <span>Add Audio</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between bg-white/5 p-2 rounded-lg"
                      >
                        <span className="text-gray-300">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              <animated.button
                type="submit"
                style={{
                  scale,
                }}
                onMouseEnter={() => api.start({ scale: 1.02 })}
                onMouseLeave={() => api.start({ scale: 1 })}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg transition-opacity"
              >
                Submit Report
              </animated.button>
            </form>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutUs;