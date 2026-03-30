import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={closeMobileMenu}>
            <span className="brand-icon"></span>
            <span className="brand-text">Enrollment Portal</span>
          </Link>
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Menu Dashboard */}
          <div className="nav-item">
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') || isActive('/') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          </div>

          {/* Menu Policy Inquiry dengan Sub Menu */}
          <div className="nav-item dropdown">
            <button 
              className={`nav-link dropdown-btn ${isActive('/policy') ? 'active' : ''}`}
              onClick={() => toggleSubMenu('policy')}
            >
              Policy Inquiry {openMenu === 'policy' ? '▲' : '▼'}
            </button>
            <div className={`dropdown-menu ${openMenu === 'policy' ? 'show' : ''}`}>
              <Link to="/policy/payor" className="dropdown-item" onClick={closeMobileMenu}>
                Registrasi Payor
              </Link>
              <Link to="/policy/plan" className="dropdown-item" onClick={closeMobileMenu}>
                Registrasi Plan
              </Link>
              <Link to="/policy/participant" className="dropdown-item" onClick={closeMobileMenu}>
                Registrasi Participant
              </Link>
            </div>
          </div>

          {/* Menu Claim Inquiry dengan Sub Menu */}
          <div className="nav-item dropdown">
            <button 
              className={`nav-link dropdown-btn ${isActive('/claim') ? 'active' : ''}`}
              onClick={() => toggleSubMenu('claim')}
            >
              Claim Inquiry {openMenu === 'claim' ? '▲' : '▼'}
            </button>
            <div className={`dropdown-menu ${openMenu === 'claim' ? 'show' : ''}`}>
              <Link to="/claim/summary" className="dropdown-item" onClick={closeMobileMenu}>
                Summary
              </Link>
              <Link to="/claim/history" className="dropdown-item" onClick={closeMobileMenu}>
                History Claim
              </Link>
            </div>
          </div>

          {/* Menu Report */}
          <div className="nav-item">
            <Link 
              to="/report" 
              className={`nav-link ${isActive('/report') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Report
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;