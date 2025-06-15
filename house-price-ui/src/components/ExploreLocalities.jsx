import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// ✅ Helper to convert location name to image file name
const getImageForLocality = (locName) => {
  if (!locName) return '/images/default.png';
  const formatted = locName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w]/g, '');
  return `/images/${formatted}.png`;
};

const ExploreLocalities = () => {
  const [budget, setBudget] = useState([6000000, 10000000]);
  const [bhk, setBhk] = useState(3);
  const [filteredLocalities, setFilteredLocalities] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse('/Bengaluru_House_Data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const localityMap = {};
        const uniqueLocations = new Set();

        results.data.forEach((row) => {
          const loc = row.location?.trim();
          const priceLakh = parseFloat(row.price);
          const sqftStr = row.total_sqft;
          const sizeStr = row.size;

          if (!loc || isNaN(priceLakh) || !sqftStr || !sizeStr) return;
          if (sqftStr.includes('-')) return;

          const sqft = parseFloat(sqftStr);
          if (isNaN(sqft)) return;

          const bhkMatch = sizeStr.match(/^(\d+)\s*BHK$/i);
          if (!bhkMatch) return;

          const parsedBhk = parseInt(bhkMatch[1]);
          if (isNaN(parsedBhk)) return;

          const avgPricePerSqft = (priceLakh * 1e5) / sqft;

          if (!localityMap[loc]) {
            localityMap[loc] = [];
          }

          localityMap[loc].push({ avgPricePerSqft, bhk: parsedBhk });
          uniqueLocations.add(loc);
        });

        setAllLocations([...uniqueLocations].sort());

        const finalData = Object.entries(localityMap).map(([name, entries]) => {
          const sameBhkEntries = entries.filter(e => e.bhk === bhk);
          if (sameBhkEntries.length === 0) return null;

          const totalPrice = sameBhkEntries.reduce((sum, e) => sum + e.avgPricePerSqft, 0);
          const avgPrice = Math.round(totalPrice / sameBhkEntries.length);

          return { name, avgPrice };
        }).filter(Boolean);

        const filtered = finalData.filter(loc => {
          const estCost = loc.avgPrice * 600 * bhk;
          return estCost >= budget[0] && estCost <= budget[1];
        });

        setFilteredLocalities(filtered);
      }
    });
  }, [bhk, budget]);

  const displayedLocalities = filteredLocalities.filter(loc =>
    selectedLocation === '' || loc.name.toLowerCase().includes(selectedLocation.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>🗺 Explore Localities</h2>

      {/* Budget Slider */}
      <div style={styles.filterSection}>
        <label>
          <strong>Budget Range:</strong> ₹{budget[0] / 1e5}L – ₹{budget[1] / 1e5}L
        </label>
        <Box width={300} mt={2}>
          <Slider
            value={budget}
            onChange={(e, newVal) => setBudget(newVal)}
            valueLabelDisplay="auto"
            step={500000}
            min={2000000}
            max={10000000}
            sx={{ color: '#646cff' }}
          />
        </Box>
      </div>

      {/* BHK Buttons */}
      <div style={styles.filterSection}>
        <label><strong>Preferred BHK:</strong></label>
        {[1, 2, 3].map(num => (
          <button
            key={num}
            style={{
              ...styles.bhkButton,
              backgroundColor: bhk === num ? '#646cff' : '#444'
            }}
            onClick={() => setBhk(num)}
          >
            {num} BHK
          </button>
        ))}
      </div>

      {/* Location Search Input */}
      <div style={styles.filterSection}>
        <label><strong>Search Location:</strong></label><br />
        <input
          type="text"
          placeholder="Start typing a location..."
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          style={styles.searchInput}
          list="location-options"
        />
        <datalist id="location-options">
          {allLocations
            .filter(loc => loc.toLowerCase().includes(selectedLocation.toLowerCase()))
            .map(loc => (
              <option key={loc} value={loc} />
            ))}
        </datalist>
      </div>

      {/* Locality Cards */}
      <div style={styles.localityList}>
        {displayedLocalities.map(loc => (
          <div key={loc.name} style={styles.card}>
            <img
              src={getImageForLocality(loc.name)}
              alt={loc.name}
              style={styles.cardImage}
              loading="lazy"
            />
            <p>📍 <strong>{loc.name}</strong></p>
            <p>Avg price: ₹{loc.avgPrice}/sqft</p>
            <p>Est. {bhk} BHK: ₹{(loc.avgPrice * 600 * bhk / 1e5).toFixed(1)}L</p>
            <button
              style={styles.seeBtn}
              onClick={() => navigate(`/locality/${encodeURIComponent(loc.name)}`)}
            >
              See properties →
            </button>
          </div>
        ))}
        {displayedLocalities.length === 0 && (
          <p style={{ color: 'gray', marginTop: '2rem' }}>
            No localities match the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    color: 'white',
    textAlign: 'left'
  },
  filterSection: {
    marginBottom: '1.5rem'
  },
  bhkButton: {
    margin: '0.5rem 0.5rem 0 0',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'white'
  },
  searchInput: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    borderRadius: '5px',
    backgroundColor: '#1e1e1e',
    color: 'white',
    border: '1px solid #444',
    minWidth: '250px'
  },
  localityList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '2rem'
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #333',
    boxShadow: '0 0 5px rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '350px',
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '0.5rem'
  },
  seeBtn: {
    marginTop: 'auto',
    padding: '0.5rem 1rem',
    backgroundColor: '#646cff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white'
  }
};

export default ExploreLocalities;
