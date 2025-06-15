import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const amenities = [
    { icon: '🎓', title: 'Top Schools', desc: 'Access to nearby quality education.' },
    { icon: '🏥', title: 'Hospitals & Clinics', desc: 'Emergency and routine healthcare nearby.' },
    { icon: '🚗', title: 'Parking', desc: 'Spacious and secure vehicle parking areas.' },
    { icon: '🛣', title: 'City Connectivity', desc: 'Quick access to metro, highways, and transit.' }
  ];

  const futureProjects = [
    { icon: '📈', title: 'Rent Estimator', desc: 'Predict rent prices using AI models.' },
    { icon: '🏗', title: 'Construction Tracker', desc: 'Live progress of under-construction projects.' },
    { icon: '📍', title: 'Virtual Tours', desc: 'Walk through neighborhoods from your screen.' },
    { icon: '📱', title: 'AR Mobile App', desc: 'Visualize homes using Augmented Reality.' }
  ];

  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🏡 Welcome to <span style={{ color: '#646cff' }}>Smart Property Finder</span></h1>
        <p style={styles.subtitle}>
          "Estimate property prices instantly and explore top areas"
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn} onClick={() => navigate('/predict')}>Try It Now →</button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/explore')}>Explore Localities</button>
        </div>
      </div>

      {/* How it works */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔄 How it works</h2>
        <div style={styles.steps}>
          <span style={styles.step}>🧠 Enter Info</span>
          <span style={styles.arrow}>→</span>
          <span style={styles.step}>📊 Predict Price</span>
          <span style={styles.arrow}>→</span>
          <span style={styles.step}>🏘 Explore</span>
        </div>
      </div>

      {/* Basic Amenities */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🏥 Basic Amenities</h2>
        <div style={styles.cardGrid}>
          {amenities.map((item, i) => (
            <button key={i} style={styles.cardBtn} onClick={() => {}}>
              <div style={styles.featureIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Future Projects */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Future Projects</h2>
        <div style={styles.cardGrid}>
          {futureProjects.map((item, i) => (
            <button key={i} style={styles.cardBtn} onClick={() => {}}>
              <div style={styles.featureIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔍 Why Us?</h2>
        <ul style={styles.features}>
          <li>✅ ML-powered predictions</li>
          <li>✅ Data-driven suggestions</li>
          <li>✅ User-friendly, mobile responsive</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    color: 'white',
    backgroundColor: '#121212',
    minHeight: '100vh',
    textAlign: 'center'
  },
  hero: {
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '1rem',
    color: '#ccc'
  },
  buttonGroup: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    backgroundColor: '#646cff',
    color: 'white',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  secondaryBtn: {
    backgroundColor: '#333',
    color: 'white',
    padding: '0.8rem 1.5rem',
    border: '1px solid #646cff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  section: {
    marginTop: '4rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '1.2rem'
  },
  steps: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    fontSize: '1.2rem'
  },
  step: {
    backgroundColor: '#1e1e1e',
    padding: '0.8rem 1.2rem',
    borderRadius: '6px'
  },
  arrow: {
    fontSize: '1.5rem'
  },
  features: {
    listStyle: 'none',
    padding: 0,
    fontSize: '1.1rem',
    lineHeight: '2rem'
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '1.5rem'
  },
  cardBtn: {
    backgroundColor: '#1e1e1e',
    padding: '1.2rem',
    borderRadius: '12px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  }
};

// Hover effect using global CSS
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(100, 108, 255, 0.4);
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;
