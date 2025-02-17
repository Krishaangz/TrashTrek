import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Trees as Tree, Award, ArrowRight, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router-dom';
import { externalArticles } from '../data/articles';
import RankUpOverlay from '../components/RankUpOverlay';

const rankThresholds = {
  'Eco Legend': 10000,
  'Environmental Master': 5000,
  'Sustainability Champion': 2500,
  'Green Warrior': 1000,
  'Eco Guardian': 500,
  'Nature Protector': 250,
  'Earth Defender': 100,
  'Eco Rookie': 0
};

const Home = () => {
  const { user } = useAuthStore();
  const [showRankUp, setShowRankUp] = useState(false);
  const [newRank, setNewRank] = useState('');
  const [prevPoints, setPrevPoints] = useState(user?.ecoPoints || 0);

  useEffect(() => {
    if (user?.ecoPoints && user.ecoPoints > prevPoints) {
      // Check if user has reached a new rank
      const currentRank = Object.entries(rankThresholds).find(
        ([_, threshold]) => user.ecoPoints >= threshold
      )?.[0];
      
      const previousRank = Object.entries(rankThresholds).find(
        ([_, threshold]) => prevPoints >= threshold
      )?.[0];

      if (currentRank && currentRank !== previousRank) {
        setNewRank(currentRank);
        setShowRankUp(true);
      }
    }
    setPrevPoints(user?.ecoPoints || 0);
  }, [user?.ecoPoints]);

  // Determine the current rank and next rank based on the user's points
  const currentRankEntry = Object.entries(rankThresholds).find(
    ([_, threshold]) => (user?.ecoPoints || 0) >= threshold
  );

  // Find the next rank
  const nextRankEntry = Object.entries(rankThresholds)
    .reverse()
    .find(([_, threshold]) => (user?.ecoPoints || 0) < threshold);

  const pointsToNextRank = nextRankEntry 
    ? nextRankEntry[1] - (user?.ecoPoints || 0)
    : 0;

  const progressToNextRank = nextRankEntry
    ? ((user?.ecoPoints || 0) - (currentRankEntry?.[1] || 0)) / 
      (nextRankEntry[1] - (currentRankEntry?.[1] || 0)) * 100
    : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <RankUpOverlay 
        show={showRankUp} 
        newRank={newRank} 
        onClose={() => setShowRankUp(false)} 
      />

      {/* Dashboard Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-[#D0FD3E]">Dashboard</h2>
        
        {/* Rank Progress Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#D0FD3E] flex items-center gap-2">
                <Star className="w-5 h-5" />
                Current Rank
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {currentRankEntry?.[0] || 'Eco Rookie'}
              </p>
            </div>
            {nextRankEntry && (
              <div className="text-right">
                <p className="text-sm text-gray-300">Next Rank</p>
                <p className="text-lg font-semibold text-[#D0FD3E]">{nextRankEntry[0]}</p>
                <p className="text-sm text-gray-300">
                  {pointsToNextRank} points needed
                </p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextRank}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] relative"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Trophy className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Eco Points</p>
                <motion.p
                  key={user?.ecoPoints}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold"
                >
                  {user?.ecoPoints || 0}
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Tree className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Trees Planted</p>
                <p className="text-2xl font-bold">{Math.floor((user?.ecoPoints || 0) / 100)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Award className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Global Rank</p>
                <p className="text-2xl font-bold">#1,234</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trashpedia Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#D0FD3E]">Trashpedia</h2>
          <Link 
            to="/trashpedia"
            className="text-[#D0FD3E] hover:underline"
          >
            Learn More →
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
          {externalArticles.slice(0, 10).map(article => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[300px] border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-300 line-clamp-3">{article.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.slice(0, 2).map(keyword => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
