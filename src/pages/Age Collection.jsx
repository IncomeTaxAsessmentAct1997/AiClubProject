import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createUser } from '../services/database';

const AgeCollectionPage = ({ onUserCreated }) => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const userId = await createUser({ age: ageNum });
      onUserCreated(userId, ageNum);
      navigate('/media/1');
    } catch {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setAge(value);
    }
  };

  return (
    <motion.div
      className="page-container age-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to the AI Detection Survey
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Can you tell the difference between AI-generated and real content?
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="age-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <label htmlFor="age">Please enter your age to begin:</label>
        <motion.input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="age"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter your age"
          whileFocus={{ scale: 1.02, boxShadow: '0 0 20px rgba(100, 108, 255, 0.3)' }}
        />

        {error && (
          <motion.p
            className="error-message"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, boxShadow: '0 5px 30px rgba(100, 108, 255, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Starting...' : 'Start Survey'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AgeCollectionPage;