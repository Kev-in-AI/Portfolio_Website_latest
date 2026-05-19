import { useEffect, useRef, useState } from 'react'
import './Skills.css'

const Skills = () => {
  const skillsRef = useRef(null)
  const [openCategories, setOpenCategories] = useState({
    Languages: true,
    'Frameworks & Libraries': false,
    'Developer Tools': false,
    'Analytical Skills': true,
    'Hardware & Embedded Tools': false,
    'Human Languages': false
  })

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
      lead: 'Programming foundations across software, data, systems, and low-level coursework.',
      accent: '01',
      skills: ['Java', 'Python', 'C/C++', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'Assembly', 'R', 'MATLAB']
    },
    {
      category: 'Frameworks & Libraries',
      lead: 'Frontend, backend, API, and 3D tooling for full-stack product builds.',
      accent: '02',
      skills: ['React', 'React Native', 'Next.js', 'FastAPI', 'Flask', 'Node.js', 'TailwindCSS', 'Spring Boot', 'Bootstrap', 'Three.js']
    },
    {
      category: 'Developer Tools',
      lead: 'The everyday stack for shipping, debugging, databases, and hardware-connected projects.',
      accent: '03',
      skills: ['Git', 'Docker', 'Supabase', 'PostgreSQL', 'MongoDB', 'Arduino IoT Cloud', 'VS Code', 'Visual Studio', 'npm/Yarn']
    },
    {
      category: 'Analytical Skills',
      lead: 'Data reasoning, modelling, experimentation, and communication for technical decisions.',
      accent: '04',
      skills: ['Machine Learning', 'Statistical Analysis', 'Data Modelling & Visualization', 'Business Statistics', 'A/B Testing Fundamentals', 'Data Cleaning & ETL', 'Hypothesis Testing', 'Regression Analysis', 'Microsoft Office Suite (PowerPoint, Excel, Outlook, Access)']
    },
    {
      category: 'Hardware & Embedded Tools',
      lead: 'Embedded prototyping and physical systems work across sensing, power, and automation.',
      accent: '05',
      skills: ['Microcontrollers (Arduino, ESP32)', 'IoT Prototyping', 'Sensor Integration', 'Power Electronics', 'Circuit Assembly', 'HDL (Verilog/VHDL)', 'Water Pumps & Mechanical Automation', 'Energy Harvesting (Dynamo + Supercapacitors)']
    },
    {
      category: 'Human Languages',
      lead: 'Languages I use to connect across cultures, communities, and teams.',
      accent: '06',
      skills: ['Tamil (Professional Working)', 'Kannada (Professional Working)', 'English (Native or Bilingual)', 'Hindi (Full Professional)']
    }
  ]

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills-container">
        <div className="skills-header">
          <span className="section-label">Skill Pills</span>
        </div>

        <div className="skills-console">
          {skillsData.map((item, index) => (
            <div
              key={item.category}
              className={`skills-category-panel ${openCategories[item.category] ? 'open' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button className="skills-category-trigger" onClick={() => toggleCategory(item.category)}>
                <span className="skills-category-index">{item.accent}</span>
                <span className="skills-category-copy">
                  <span className="category-title">{item.category}</span>
                  <span className="category-lead">{item.lead}</span>
                </span>
                <span className="skills-count">{item.skills.length} skills</span>
              </button>

              <div className="skills-panel-body">
                <div className="skills-list">
                  {item.skills.map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
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
