import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AgeCollectionPage from './pages/Age Collection';
import MediaQuestionPage from './pages/Ai or Not';
import FollowUpPage from './pages/Questionare';
import ResultsPage from './pages/Results';
import CompletionPage from './pages/Completion';
import './styles.css';

function App() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [responses, setResponses] = useState([]);

  const handleUserCreated = (id, age) => {
    setUserId(id);
    setUserAge(age);
  };

  const handleAnswer = (mediaId, answer) => {
    setCurrentAnswer(answer);
    setResponses(prev => [...prev, { mediaId, answer }]);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<AgeCollectionPage onUserCreated={handleUserCreated} />}
          />

          <Route
            path="/media/:mediaIndex"
            element={
              userId ? (
                <MediaQuestionPage onAnswer={handleAnswer} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/followup/:mediaIndex"
            element={
              userId && currentAnswer ? (
                <FollowUpPage userId={userId} currentAnswer={currentAnswer} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/results/:mediaIndex"
            element={
              userId ? (
                <ResultsPage currentAnswer={currentAnswer} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="/complete" element={<CompletionPage userAge={userAge} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

export default App;