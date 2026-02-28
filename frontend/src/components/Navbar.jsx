import { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-links">
          <button onClick={() => scrollToSection('education')} className="nav-link">
            Education
          </button>
          <span className="nav-divider">|</span>
          <button onClick={() => scrollToSection('experience')} className="nav-link">
            Experience
          </button>
          <span className="nav-divider">|</span>
          <button onClick={() => scrollToSection('projects')} className="nav-link">
            Projects
          </button>
          <span className="nav-divider">|</span>
          <button onClick={() => scrollToSection('skills')} className="nav-link">
            Skills
          </button>
          <span className="nav-divider">|</span>
          <button onClick={() => scrollToSection('awards')} className="nav-link">
            Awards
          </button>
          <span className="nav-divider">|</span>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
