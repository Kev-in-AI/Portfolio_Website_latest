import { useEffect, useRef, useState } from 'react'
import './Experience.css'

const Experience = () => {
  const experienceRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (experienceRef.current) {
      observer.observe(experienceRef.current)
    }

    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current)
      }
    }
  }, [])

  const experienceData = [
    {
      id: 1,
      role: 'Software Developer Intern',
      company: 'Expando World Ltd.',
      location: 'Hong Kong',
      period: 'Jun 2025 - Aug 2025',
      summer: 'Summer 2025',
      points: [
        'Built and optimized cross-platform front-end architecture with **Next.js, React, TypeScript, TailwindCSS**, improving Time-to-Interactive, reducing code bundle size, and achieving an improvement in mobile responsiveness by **150ms** across **5+ device profiles**.',
        'Collaborated on **bug fixing, codebase maintenance**, and **UI enhancements** in a global development team, contributing to software stability and improved user experience through **Git-based workflows** and merge requests.',
        'Streamlined development and deployment by integrating **Supabase, Stripe CLI, and Docker**, and reducing environment setup time. Produced documentation that helped with onboarding queries and translations.'
      ]
    },
    {
      id: 2,
      role: 'Junior Programmer Intern',
      company: 'Radiance Tech International Ltd.',
      location: 'Hong Kong',
      period: 'Jun 2024 - Aug 2024',
      summer: 'Summer 2024',
      points: [
        'Processed, validated, and **optimized 300+ 3D asset files** using Blender, Python, and Node.js scripts, reducing asset load errors by 35%, cutting manual QA time significantly, and improving retrieval speed.',
        'Enhanced internal development workflows by automating tasks with Bash, NPM scripts, and Docker, improving build stability and lowering repetitive manual steps by 20%. **Collaborated through Git, Lark, and Notion**, enabling a significantly faster sprint turnaround.',
        'Acquired hands-on experience in **Web Development and JavaScript**, worked primarily with the **three.js libraries**, applying them to support software tasks and build foundational skills in full-stack development.'
      ]
    }
  ]

  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="experience-highlight">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <section id="experience" className="experience" ref={experienceRef}>
      <div className="experience-container">
        <div className="experience-header">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Professional Journey</h2>
        </div>

        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'} experience-item-${index + 1}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="experience-dot">
                <span className="experience-summer-label">{exp.summer}</span>
              </div>
              <div className="experience-content">
                <div className="experience-card-inner">
                  <div className="experience-info">
                    <span className="experience-period">{exp.period}</span>
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="experience-company-container">
                      <span className="experience-company">{exp.company}</span>
                    </div>
                    <div className="experience-location">
                      <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {exp.location}
                    </div>
                  </div>
                  
                  <div className={`experience-collapsible ${expandedItems[exp.id] ? 'expanded' : ''}`}>
                    <ul className="experience-points">
                      {exp.points.map((point, i) => (
                        <li key={i} className="experience-point">
                          {formatText(point)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    className="experience-expand-btn" 
                    onClick={() => toggleExpand(exp.id)}
                  >
                    {expandedItems[exp.id] ? 'Show Less' : 'Learn More'}
                    <svg 
                      className={`expand-icon ${expandedItems[exp.id] ? 'rotated' : ''}`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
