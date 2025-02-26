import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchQuery("");
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link
          to="/"
        >
          <img
            src="/images/logoipsum.png"
            alt="Site Logo"
            className="logo"
          />
        </Link>
      </div>

      {/* Sökfält */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Sök
        </button>
      </div>

      <div className={`nav-container`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/Events"
            >
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/About"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Contact"
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Signup"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
