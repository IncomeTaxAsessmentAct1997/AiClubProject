import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitResponse } from '../services/database';
import { mediaItems } from '../data/mediaItems';

const FollowUpPage = ({ userId, currentAnswer }) => {
  const navigate = useNavigate();
  const { mediaIndex } = useParams();
  const index = parseInt(mediaIndex) - 1;
  const mediaItem = mediaItems[index];

  const [reasoning, setReasoning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitResponse({
        userId,
        mediaId: mediaItem.id,
        userAnswer: currentAnswer,
        reasoning: reasoning.trim() || 'No reason provided'
      });

      navigate(`/results/${mediaIndex}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      await submitResponse({
        userId,
        mediaId: mediaItem.id,
        userAnswer: currentAnswer,
        reasoning: 'No reason provided'
      });
      navigate(`/results/${mediaIndex}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="page-container followup-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="answer-badge"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        style={{
          background: currentAnswer === 'AI'
            ? 'linear-gradient(135deg, #9333ea, #7c3aed)'
            : 'linear-gradient(135deg, #10b981, #059669)'
        }}
      >
        You selected: {currentAnswer}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Why did you think it was {currentAnswer}?
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="followup-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          placeholder="Share your reasoning... (optional)"
          rows={4}
          whileFocus={{
            scale: 1.02,
            boxShadow: '0 0 30px rgba(100, 108, 255, 0.2)'
          }}
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(100, 108, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Submitting...' : 'See Results'}
        </motion.button>

        <motion.button
          type="button"
          className="skip-button"
          onClick={handleSkip}
          disabled={isSubmitting}
          whileHover={{ opacity: 0.8 }}
        >
          Skip
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default FollowUpPage;