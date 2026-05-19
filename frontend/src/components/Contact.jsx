import { useState, useRef, useEffect } from 'react'
import './Contact.css'

const Contact = () => {
  const contactRef = useRef(null)

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

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current)
      }
    }
  }, [])

  const contactLinks = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/jk-kevin',
      url: 'https://www.linkedin.com/in/jk-kevin',
      icon: (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      id: 'email',
      label: 'Email',
      value: 'kevinmanickam.jk@gmail.com',
      url: 'mailto:kevinmanickam.jk@gmail.com',
      icon: (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: '@j.k.kevin',
      url: 'https://www.instagram.com/j.k.kevin',
      icon: (
        <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }
  ]

  return (
    <section id="contact" className="contact" ref={contactRef}>
      <div className="contact-container">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's build something interesting.</h2>
            <p className="contact-subtitle">
              Always happy to chat about internships, projects, ideas, or anything fun to build.
            </p>
          </div>

          <div className="contact-links-grid">
            {contactLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link-card"
              >
                <div className="contact-link-icon-wrapper">
                  {link.icon}
                </div>
                <div className="contact-link-info">
                  <span className="contact-link-label">{link.label}</span>
                  <span className="contact-link-value">{link.value}</span>
                </div>
                <div className="contact-link-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
