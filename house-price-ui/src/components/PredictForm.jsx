import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';

const PredictForm = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    total_sqft: '',
    bath: '',
    bhk: '',
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/predict', formData)
      .then(res => setPredictedPrice(res.data.price))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Predict House Price</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select name="location" value={formData.location} onChange={handleChange} required>
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>
        <input type="number" name="total_sqft" placeholder="Total Sqft" value={formData.total_sqft} onChange={handleChange} required />
        <input type="number" name="bath" placeholder="Bathrooms" value={formData.bath} onChange={handleChange} required />
        <input type="number" name="bhk" placeholder="BHK" value={formData.bhk} onChange={handleChange} required />
        <button type="submit">Get Price Estimate</button>
      </form>

      {predictedPrice && <ResultCard price={predictedPrice} />}
    </div>
  );
};

export default PredictForm;
