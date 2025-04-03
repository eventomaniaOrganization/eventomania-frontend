import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../asset/scss/index.css';
import logo from '../asset/images/logoipsum.png'

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchQuery("");
    }
  };

  return (
    <header className="header">

       {/* Toppbar */}
      <div className="top-bar">
        <div className="left">
          <span>SE</span>
          <span>SV</span>
        </div>
        <div className="right">
          <Link to="#">Merch</Link>
          <Link to="#">Stadsguider</Link>
          <Link to="#">Presentkort</Link>
          <Link to="#">Hjälp</Link>
          <Link to="#">Sälj med oss</Link>
        </div>
      </div>


      <div className='main-header'>
        <button className='menu-toggle' onClick={() => setShowMenu(!showMenu)}>
          <i class="fa-solid fa-bars"></i>
        </button>

        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              alt="Site Logo"
            />
          </Link>
        </div>
        
        <div className= {`nav-container ${showMenu ? 'show' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link className='menu-link' to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className='menu-link' to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className='menu-link' to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className='menu-link' to="/">Kalender</Link>
            </li>
            <li className="nav-item">
              <Link className='menu-link' to="/">Erbjudande</Link>
            </li>
          </ul>
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

        <div className='auth-container'>
            <Link className='btn-gray' to="/login">
              <i class="fa-solid fa-right-to-bracket"></i>
              <span>Login</span>
            </Link>
            <Link className='btn-green' to="/signup">
              <i class="fa-solid fa-user"></i>
              <span>Sign Up</span>
            </Link>
        </div>

      </div>

    </header>
  );
}

export default Header;
