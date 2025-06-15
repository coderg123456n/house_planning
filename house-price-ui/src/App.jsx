import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import PredictForm from './components/PredictForm';
import ExploreLocalities from './components/ExploreLocalities';
import LocalityDetails from './components/LocalityDetails';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage'; // ✅ Use this instead of LoginPage
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictForm />} />
          <Route path="/explore" element={<ExploreLocalities />} />
          <Route path="/locality/:name" element={<LocalityDetails />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ Combined Login/Register */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
