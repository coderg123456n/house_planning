import React from 'react';

const ResultCard = ({ price }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>Estimated Price</h2>
      <p style={styles.price}>{price} Lakhs</p>
    </div>
  );
};

const styles = {
  card: {
    background: '#1e1e1e',
    color: '#fff',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    textAlign: 'center',
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
};

export default ResultCard;
