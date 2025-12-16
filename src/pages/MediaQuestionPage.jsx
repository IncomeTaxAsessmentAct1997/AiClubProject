import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mediaItems } from '../data/mediaItems';

const MediaQuestionPage = ({ onAnswer }) => {
    const navigate = useNavigate();
    const { mediaIndex } = useParams();
    const index = parseInt(mediaIndex) - 1;
    const mediaItem = mediaItems[index];

    if (!mediaItem) {
        navigate('/');
        return null;
    }

    const handleAnswer = (answer) => {
        onAnswer(mediaItem.id, answer);
        navigate(`/followup/${mediaIndex}`);
    };

    return (
        <motion.div
            className="page-container media-page"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="progress-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {mediaIndex} / {mediaItems.length}
            </motion.div>

            <motion.div
                className="media-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {mediaItem.type === 'video' ? (
                    <video
                        src={mediaItem.url}
                        controls
                        autoPlay
                        muted
                        loop
                        className="media-content"
                    />
                ) : (
                    <img
                        src={mediaItem.url}
                        alt={mediaItem.description}
                        className="media-content"
                    />
                )}
                <motion.p
                    className="media-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {mediaItem.description}
                </motion.p>
            </motion.div>

            <motion.div
                className="button-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <motion.button
                    className="answer-button ai-button"
                    onClick={() => handleAnswer('AI')}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: '0 10px 40px rgba(147, 51, 234, 0.5)',
                        background: 'linear-gradient(135deg, #9333ea, #7c3aed)'
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    AI
                </motion.button>

                <motion.button
                    className="answer-button real-button"
                    onClick={() => handleAnswer('Real')}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: '0 10px 40px rgba(16, 185, 129, 0.5)',
                        background: 'linear-gradient(135deg, #10b981, #059669)'
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Real
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default MediaQuestionPage;
