import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const Skills = () => {
  const skillsRef = useRef(null)

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

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  const skillsData = [
    {
      category: 'Languages',
      skills: ['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'Assembly', 'R']
    },
    {
      category: 'Frameworks & Libraries',
      skills: ['React', 'React Native', 'Next.js', 'FastAPI', 'Flask', 'Node.js', 'TailwindCSS', 'Spring Boot', 'Bootstrap', 'Three.js']
    },
    {
      category: 'Developer Tools',
      skills: ['Git', 'Docker', 'Supabase', 'PostgreSQL', 'MongoDB', 'Arduino IoT Cloud', 'VS Code', 'Visual Studio', 'npm/Yarn']
    },
    {
      category: 'Analytical Skills',
      skills: ['Statistical Analysis', 'Data Modelling & Visualization', 'Business Statistics', 'Predictive Analytics', 'A/B Testing Fundamentals', 'Data Cleaning & ETL', 'Hypothesis Testing', 'Regression Analysis', 'Microsoft Office Suite (PowerPoint, Excel, Outlook, Access)']
    },
    {
      category: 'Hardware & Embedded Tools',
      skills: ['Microcontrollers (Arduino, ESP32)', 'IoT Prototyping', 'Sensor Integration', 'Power Electronics', 'Circuit Assembly', 'HDL (Verilog/VHDL)', 'Water Pumps & Mechanical Automation', 'Energy Harvesting (Dynamo + Supercapacitors)']
    }
  ]

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills-container">
        <div className="skills-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid">
          {skillsData.map((item, index) => (
            <div 
              key={index} 
              className={`skills-category-card ${item.skills.length > 10 ? 'large' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="card-glass-effect"></div>
              <div className="card-content">
                <h3 className="category-title">{item.category}</h3>
                <div className="skills-list">
                  {item.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
