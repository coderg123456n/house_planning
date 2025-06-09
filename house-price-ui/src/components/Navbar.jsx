// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const paths = ['/', '/predict', '/explore', '/login'];
  const labels = ['Home', 'Predict', 'Explore', 'Login'];

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🏠 HousePredictor</div>
      <ul style={styles.navLinks}>
        {paths.map((path, idx) => (
          <li key={path}>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                ...styles.link,
                borderBottom: isActive ? '2px solid white' : 'none',
                paddingBottom: isActive ? '2px' : '0'
              })}
            >
              {labels[idx]}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#1e1e1e',
    zIndex: 1000,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    boxSizing: 'border-box',
    borderBottom: '1px solid #333',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  }
};

export default Navbar;
