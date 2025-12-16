import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Page = ({ id, title, totalPages }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    if (id < totalPages) {
      navigate(`/page/${id + 1}`);
    }
  };

  const handlePrev = () => {
    if (id > 1) {
      navigate(`/page/${id - 1}`);
    }
  };

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <h1>{title}</h1>
      <p>This is page {id}</p>
      <div className="navigation-buttons" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handlePrev} disabled={id === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={id === totalPages}>
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Page;
