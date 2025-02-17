import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MapPin, Trophy, ChevronDown } from 'lucide-react';

const Deploy = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const legalItems = [
    {
      title: "Privacy Policy",
      content: "We value your privacy and ensure your data is protected. Read our full Privacy Policy for details on how we handle your information.",
      link: "/privacy-policy"
    },
    {
      title: "Terms & Conditions",
      content: "By using TrashTrek, you agree to our terms and conditions. Review our guidelines to understand user responsibilities and platform rules.",
      link: "/terms-conditions"
    },
    {
      title: "TrashTrek Rulebook",
      content: "Our rulebook provides the do’s and don’ts for participating in TrashTrek’s cleanup missions and challenges. Ensure a fair and engaging experience for all!",
      link: "/trashtrek-rulebook"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-[#D0FD3E]">Get Started</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{
          title: "Standard Mode",
          description: "Real-time trash detection and collection tracking in your area.",
          icon: Smartphone,
        }, {
          title: "Adventure Mode",
          description: "Explore and clean up designated locations using our interactive map.",
          icon: MapPin,
        }, {
          title: "Challenge Mode",
          description: "Participate in monthly cleanup events and compete for bonus points.",
          icon: Trophy,
        }].map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D0FD3E]/20 flex items-center justify-center">
                <item.icon className="text-[#D0FD3E]" size={32} />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
              <button className="px-6 py-2 bg-[#D0FD3E] text-[#0A1A2F] rounded-lg font-medium hover:opacity-90 transition-opacity">
                Download App
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#D0FD3E]">Why Use Our App?</h2>
        <ul className="space-y-4 text-gray-300">
          {["Advanced AI-powered trash detection", "Real-time tracking and rewards", "Interactive community challenges", "Location-based cleanup missions"].map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#D0FD3E] rounded-full"></span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Animated Legal Section */}
      <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#D0FD3E]">Legal & Privacy</h2>
        <p className="text-gray-300 mb-6">Your privacy and security are important to us. Below are our policies and guidelines:</p>
        
        <div className="space-y-4">
          {legalItems.map((item, index) => (
            <div key={index} className="bg-[#1A2B3C] rounded-lg p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(index)}>
                <h3 className="text-lg font-semibold text-[#D0FD3E]">{item.title}</h3>
                <motion.div animate={{ rotate: openSection === index ? 180 : 0 }}>
                  <ChevronDown className="text-[#D0FD3E]" size={24} />
                </motion.div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openSection === index ? 'auto' : 0, opacity: openSection === index ? 1 : 0 }}
                className="overflow-hidden text-gray-300 mt-2"
              >
                {item.content}
                <div className="mt-2">
                  <a href={item.link} className="block mt-2 px-4 py-2 bg-[#D0FD3E] text-[#0A1A2F] rounded-lg font-medium text-center hover:opacity-90 transition-opacity">Read More</a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Deploy;
