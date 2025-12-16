import { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AgeCollectionPage from './pages/AgeCollectionPage'
import MediaQuestionPage from './pages/MediaQuestionPage'
import FollowUpPage from './pages/FollowUpPage'
import ResultsPage from './pages/ResultsPage'
import CompletionPage from './pages/CompletionPage'
import './App.css'

function App() {
  const location = useLocation();

  // User state
  const [userId, setUserId] = useState(null);
  const [userAge, setUserAge] = useState(null);

  // Current answer for the media question (passed to follow-up and results)
  const [currentAnswer, setCurrentAnswer] = useState(null);

  // Track responses for summary
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
          {/* Age Collection - Entry Point */}
          <Route
            path="/"
            element={
              <AgeCollectionPage onUserCreated={handleUserCreated} />
            }
          />

          {/* Media Question Pages */}
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

          {/* Follow-up Question Pages */}
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

          {/* Results Pages */}
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

          {/* Completion Page */}
          <Route
            path="/complete"
            element={
              <CompletionPage userAge={userAge} />
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
