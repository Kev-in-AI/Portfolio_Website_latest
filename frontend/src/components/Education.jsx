import { useEffect, useRef, useState } from 'react'
import './Education.css'

const Education = () => {
  const educationRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

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
      { threshold: 0.3 }
    )

    if (educationRef.current) {
      observer.observe(educationRef.current)
    }

    return () => {
      if (educationRef.current) {
        observer.unobserve(educationRef.current)
      }
    }
  }, [])

  const educationData = [
    {
      id: 0,
      type: 'Undergraduate',
      institution: 'City University of Hong Kong',
      logo: '/assets/CityU Logo.png',
      image: '/assets/CityU Building.png',
      details: [
        'Bachelor of Computer and Data Engineering',
        'QS World Ranking: 63',
        'Current CGPA: 3.9/4.3',
        "Dean's List recognition for five of five semesters.",
        'Received an Entrance Scholarship valued at HKD 160,000/year for an exceptional academic record.',
        'Chan Sui Hung Best Student Award 2025, City University of Hong Kong'
      ]
    },
    {
      id: 1,
      type: 'Exchange Semester',
      institution: 'University College London',
      logo: '/assets/UCL Logo.png',
      image: '/assets/UCL Building.png',
      details: [
        'Bachelor of Computer and Data Engineering',
        'QS World Ranking: 9',
        'Current CGPA: 3.9/4.3',
        'Recipient of the highly competitive Lee Shau Kee Exchange Scholarship 2025-26 (HK$48,000)',
        "Selected as the sole nominee from CityU's College of Engineering for UCL's competitive exchange programme"
      ]
    },
    {
      id: 2,
      type: 'High School',
      institution: "St. Joseph's Boys' High School",
      logo: '/assets/SJBHS Logo.png',
      image: '/assets/SJBHS Building.png',
      details: [
        'Computer Science Stream',
        'Education World Ranking: 3 in India',
        '93.4% in Class 12 Board Exams (2023) (Top 1% of students)',
        '94.6% in Class 10 Board Exams (2021) (Top 1% of students)',
        'Organising Committee for five national and international festivals'
      ]
    }
  ]

  return (
    <section id="education" className="education" ref={educationRef}>
      <div className="education-container">
        <div className="education-header">
          <div className="header-top">
            <span className="section-label">Education</span>
            <div className="header-nav">
              {educationData.map((edu, index) => {
                const isNext = (currentPage + 1) % educationData.length === index && educationData.length > 1;
                return (
                  <button
                    key={edu.id}
                    className={`header-nav-btn ${currentPage === index ? 'active' : ''} ${isNext ? 'next-prompt' : ''}`}
                    onClick={() => setCurrentPage(index)}
                  >
                    {edu.type}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="education-quote">
            I pride myself for the quality of education that I have recieved through my life
          </p>
        </div>

        <div className="education-slider-wrapper">
          <div 
            className="education-slider" 
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {educationData.map((edu) => (
              <div key={edu.id} className="education-page">
                <div className="education-content">
                  <div className="education-visual">
                    <div className="institution-image-container">
                       <img src={edu.image} alt={edu.institution} className="institution-image" />
                    </div>
                  </div>
                  
                  <div className="education-card">
                    <div className="card-glass-effect"></div>
                    <div className="card-content">
                      <div className="institution-logo-wrapper">
                         {/* Fallback to text if logo fails or use a placeholder */}
                        <img src={edu.logo} alt={`${edu.institution} logo`} className="institution-logo" />
                      </div>
                      <h3 className="institution-name">{edu.institution}</h3>
                      <ul className="education-details-list">
                        {edu.details.map((detail, i) => {
                          const isSpecial = detail.includes('Ranking:') || detail.includes('CGPA:') || detail.includes('Board Exams');
                          if (isSpecial) {
                            const [label, ...valueParts] = detail.split(':');
                            const value = valueParts.join(':');
                            return (
                              <li key={i} className="education-detail-item">
                                <span>
                                  {label}: <span className="highlight-text">{value}</span>
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li key={i} className="education-detail-item">
                              {detail}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
