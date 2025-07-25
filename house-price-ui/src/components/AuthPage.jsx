import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate(); // ✅ Required for redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = form;

    if (!email || !password || (!isLogin && (!name || !confirm))) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin) {
      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        setError('User already exists.');
        return;
      }

      const newUser = { name, email, password };
      setUsers([...users, newUser]);
      setUser(newUser);
      setForm({ name: '', email: '', password: '', confirm: '' });

      // ✅ Redirect after successful register
      setTimeout(() => navigate('/profile'), 100);
      return;
    } else {
      const existingUser = users.find((u) => u.email === email);
      if (!existingUser) {
        setError('No user found with this email.');
        return;
      }

      if (existingUser.password !== password) {
        setError('Incorrect password.');
        return;
      }

      setUser(existingUser);
      setForm({ name: '', email: '', password: '', confirm: '' });

      // ✅ Redirect after successful login
      setTimeout(() => navigate('/profile'), 100);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLogin(true);
    navigate('/auth'); // ✅ Optional: Redirect back to auth page on logout
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? '🔐 Login' : '📝 Register'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <button type="submit" style={styles.primaryBtn}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <div style={{ marginTop: '1.5rem' }}>
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: '', email: '', password: '', confirm: '' });
              setError('');
            }}
            style={styles.toggleBtn}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  input: {
    padding: '0.9rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#2a2a2a',
    color: 'white'
  },
  primaryBtn: {
    padding: '0.9rem',
    backgroundColor: '#646cff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  },
  toggleBtn: {
    background: 'none',
    color: '#646cff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginLeft: '0.5rem'
  },
  error: {
    color: 'salmon',
    marginTop: '1rem',
    fontSize: '0.9rem'
  }
};

export default AuthPage;
