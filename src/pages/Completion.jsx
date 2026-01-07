import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CompletionPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="page-container completion-page"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="celebration-icon"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Thank You!
      </motion.h1>

      <motion.p
        className="completion-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        You've completed the AI Detection Survey.
      </motion.p>

      <motion.p
        className="completion-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your responses help us understand how people perceive AI-generated content.
      </motion.p>

      <motion.div
        className="stats-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p>As AI technology advances, it becomes increasingly important to develop critical thinking skills when consuming digital media.</p>
      </motion.div>

      <motion.button
        className="restart-button"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(100, 108, 255, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        Take Survey Again
      </motion.button>
    </motion.div>
  );
};

export default CompletionPage;