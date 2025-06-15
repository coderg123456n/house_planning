// src/components/LocalityDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

const LocalityDetails = () => {
  const { name } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    Papa.parse('/Bengaluru_House_Data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const filtered = results.data.filter((row) => {
          return row.location?.trim() === decodeURIComponent(name);
        });

        setListings(filtered);
      }
    });
  }, [name]);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Properties in {decodeURIComponent(name)}</h2>
      {listings.length === 0 ? (
        <p>No properties found in this locality.</p>
      ) : (
        listings.map((row, idx) => (
          <div key={idx} style={{ margin: '1rem 0', padding: '1rem', background: '#1e1e1e', borderRadius: '8px' }}>
            <p><strong>Size:</strong> {row.size}</p>
            <p><strong>Total sqft:</strong> {row.total_sqft}</p>
            <p><strong>Price (L):</strong> ₹{row.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default LocalityDetails;
