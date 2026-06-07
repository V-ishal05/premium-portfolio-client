import './Navbar.css';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="custom-navbar">
        <h2 className="logo">VK // Portfolio</h2>

        <div className="nav-links desktop-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#leadership">Leadership</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {menuOpen && (
        <>
          <div className="nav-overlay" onClick={closeMenu}></div>

          <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
            <button className="close-menu" onClick={closeMenu}>
              <FaTimes />
            </button>

            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#education" onClick={closeMenu}>Education</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#leadership" onClick={closeMenu}>Leadership</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#certifications" onClick={closeMenu}>Certifications</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;