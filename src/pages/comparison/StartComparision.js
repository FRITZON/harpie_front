import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'

const StartComparison = () => {
  const navigate = useNavigate()

  return (
    <div className="start-comparison-container">
      <svg className="background-animation" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--secondary-color)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--secondary-color)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--secondary-color)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M-10,20 Q30,0 50,10 T90,20 T130,10"
          className="animated-path path1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M-10,50 C20,20 50,70 80,50 S140,30 170,50"
          className="animated-path path2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 13, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
        
        <motion.path
          d="M-10,80 Q20,65 50,80 T110,70 T170,80"
          className="animated-path path3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: [0.47, 0, 0.745, 0.715] }}
        />
      </svg>

      <div className="content">
        <motion.h1
          className="title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          Ready to get started?
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          We'll ask you a few questions about your assets to better assist you.
        </motion.p>
        <motion.button
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/comparison/questions')}
        >
          Begin Comparison
        </motion.button>
      </div>

    </div>
  );
};

export default StartComparison;