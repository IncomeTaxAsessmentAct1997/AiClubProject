import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStatistics, getTotalStatistics } from '../services/database';
import { mediaItems, TOTAL_MEDIA_ITEMS } from '../data/mediaItems';

const ResultsPage = ({ currentAnswer }) => {
  const navigate = useNavigate();
  const { mediaIndex } = useParams();
  const index = parseInt(mediaIndex) - 1;
  const mediaItem = mediaItems[index];

  const [stats, setStats] = useState(null);
  const [totalStats, setTotalStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statistics = await getStatistics(mediaItem.id);
        const allStatistics = await getTotalStatistics(mediaItem.id);
        setStats(statistics);
        setTotalStats(allStatistics);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [mediaItem.id]);

  const handleContinue = () => {
    const nextIndex = parseInt(mediaIndex) + 1;
    if (nextIndex <= TOTAL_MEDIA_ITEMS) {
      navigate(`/media/${nextIndex}`);
    } else {
      navigate('/complete');
    }
  };

  const isCorrect = currentAnswer === mediaItem.correctAnswer;
  const agreementPercentage = stats ? (isCorrect ? stats.percentageReal : stats.percentageAI) : 0;
  const totalAgreementPercentage = totalStats ? (isCorrect ? totalStats.percentageReal : totalStats.percentageAI) : 0;

  return (
    <motion.div
      className="page-container results-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading ? (
        <motion.div
          className="loading"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          ⏳
        </motion.div>
      ) : (
        <>
          <motion.div
            className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          >
            {isCorrect ? '✓ Correct!' : '✗ Not quite!'}
          </motion.div>

          <motion.p
            className="result-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            This was actually <strong>{mediaItem.correctAnswer}</strong>
          </motion.p>

          <motion.div
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Your age group:</h3>

            <div className="percentage-bars">
              <div className="bar-container">
                <span className="bar-label">Correct</span>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill real-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentageReal}%` }}
                    transition={{ delay: 0.8, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <motion.span
                  className="bar-percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 }}
                >
                  {stats.percentageReal}%
                </motion.span>
              </div>

              <div className="bar-container">
                <span className="bar-label">Wrong</span>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill ai-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentageAI}%` }}
                    transition={{ delay: 1, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <motion.span
                  className="bar-percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  {stats.percentageAI}%
                </motion.span>
              </div>
            </div>

            <motion.p
              className="agreement-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7 }}
            >
              <strong>{agreementPercentage}%</strong> of users your age also got it {isCorrect ? 'correct' : 'wrong'}!
            </motion.p>
          </motion.div>

          <motion.div
            className="stats-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3>All users:</h3>

            <div className="percentage-bars">
              <div className="bar-container">
                <span className="bar-label">Correct</span>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill real-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalStats.percentageReal}%` }}
                    transition={{ delay: 1, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <motion.span
                  className="bar-percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  {totalStats.percentageReal}%
                </motion.span>
              </div>

              <div className="bar-container">
                <span className="bar-label">Wrong</span>
                <div className="bar-track">
                  <motion.div
                    className="bar-fill ai-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalStats.percentageAI}%` }}
                    transition={{ delay: 1.2, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
                <motion.span
                  className="bar-percentage"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.7 }}
                >
                  {totalStats.percentageAI}%
                </motion.span>
              </div>
            </div>

            <motion.p
              className="agreement-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9 }}
            >
              <strong>{totalAgreementPercentage}%</strong> of all users also got it {isCorrect ? 'correct' : 'wrong'}!
            </motion.p>
          </motion.div>

          <motion.button
            className="continue-button"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(100, 108, 255, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            {parseInt(mediaIndex) < TOTAL_MEDIA_ITEMS ? 'Next Question' : 'See Final Results'}
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default ResultsPage;