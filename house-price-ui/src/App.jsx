// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import PredictForm from './components/PredictForm';
import ExploreLocalities from './components/ExploreLocalities';
import './App.css'; // include styles

const Home = () => <h2>Welcome to House Predictor 🏡</h2>;
const Explore = () => <h2>Explore Properties 🔍</h2>;
const Login = () => <h2>Login Page 🔐</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictForm />} />
          <Route path="/explore" element={<ExploreLocalities />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
