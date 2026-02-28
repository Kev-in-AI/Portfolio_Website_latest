import { useRef, useEffect } from 'react'
import './About.css'

const About = () => {
  const aboutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [])

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="about-container">
        <div className="about-header">
          <span className="section-label">About</span>
          <h2 className="section-title">Crafting Digital Excellence</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              I'm a passionate developer focused on creating beautiful, 
              functional, and user-centered digital experiences. With a keen 
              eye for detail and a love for minimal design, I bring ideas to 
              life through clean code and thoughtful interfaces.
            </p>
            <p className="about-paragraph">
              My approach combines technical expertise with creative problem-solving, 
              ensuring every project is both visually stunning and highly functional.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
