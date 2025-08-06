import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          LinkedIn Clone
        </Link>
        
        {user && (
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to={`/profile/${user.username}`} className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;