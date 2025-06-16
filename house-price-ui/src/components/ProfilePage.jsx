// src/components/ProfilePage.jsx
import React from 'react';

const dummyData = {
  purchasedProperties: ['Flat in Andheri', 'Villa in Goa'],
  exploredLocalities: ['Koregaon Park', 'Indiranagar', 'Bandra'],
  loanDues: [
    { property: 'Flat in Andheri', due: '₹1,20,000' },
    { property: 'Villa in Goa', due: '₹3,50,000' }
  ],
  rentDues: [
    { property: 'Flat in Andheri', due: '₹18,000' },
    { property: 'Villa in Goa', due: '₹0 (Self-owned)' }
  ]
};

const ProfilePage = () => {
  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '2rem' }}>👤 Your Profile</h2>

      {/* Top Row */}
      <div style={styles.row}>
        <div style={styles.section}>
          <h3>🏡 Properties Purchased</h3>
          <ul>
            {dummyData.purchasedProperties.map((prop, index) => (
              <li key={index}>{prop}</li>
            ))}
          </ul>
        </div>
        <div style={styles.section}>
          <h3>🌐 Localities Explored</h3>
          <ul>
            {dummyData.exploredLocalities.map((loc, index) => (
              <li key={index}>{loc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={styles.row}>
        <div style={styles.section}>
          <h3>💸 Loan Due</h3>
          <ul>
            {dummyData.loanDues.map((item, index) => (
              <li key={index}>{item.property}: {item.due}</li>
            ))}
          </ul>
        </div>
        <div style={styles.section}>
          <h3>📅 Rent Due</h3>
          <ul>
            {dummyData.rentDues.map((item, index) => (
              <li key={index}>{item.property}: {item.due}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212',
    color: 'white',
    minHeight: '100vh',
    padding: '2rem'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    marginBottom: '2rem'
  },
  section: {
    flex: 1,
    padding: '1.5rem',
    border: '1px solid #333',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e'
  }
};

export default ProfilePage;
