import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSignOut } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`navbar ${expanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleNavbar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="nav-items">
        <Link to="/chatbot" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faComments} className="icon" />
          {expanded && (
            <>
              Chatbot
            </>
          )}
        </Link>
        <Link to="/" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faSignOut} className="icon" />
          {expanded && (
            <>
              Logout
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
