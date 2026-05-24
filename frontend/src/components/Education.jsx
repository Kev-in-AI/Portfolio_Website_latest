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
      code: 'HKG',
      years: '2023 - Present',
      logo: '/assets/CityU Logo.png',
      flag: '/assets/Flag_of_Hong_Kong.svg.webp',
      image: '/assets/CityU Building.png',
      details: [
        'Bachelor of Computer and Data Engineering',
        'QS World Ranking: 63',
        'Current CGPA: 3.9/4.3',
        "Dean's List across five semesters",
        'Entrance Scholarship: HK$160,000/year',
        'Chan Sui Hung Best Student Award 2025'
      ]
    },
    {
      id: 1,
      type: 'Exchange Semester',
      institution: 'University College London',
      code: 'LON',
      years: '2026',
      logo: '/assets/UCL Logo.png',
      flag: '/assets/Flag_of_the_United_Kingdom.svg.webp',
      image: '/assets/UCL Building.png',
      details: [
        'Bachelor of Computer and Data Engineering',
        'QS World Ranking: 9',
        'Current CGPA: 3.9/4.3',
        'Lee Shau Kee Exchange Scholarship: HK$48,000',
        "Sole College of Engineering nominee for UCL exchange"
      ]
    },
    {
      id: 2,
      type: 'High School',
      institution: "St. Joseph's Boys' High School",
      code: 'BLR',
      years: '2011 - 2023',
      logo: '/assets/SJBHS Logo.png',
      flag: '/assets/Flag_of_India.svg.webp',
      image: '/assets/SJBHS Building.png',
      details: [
        'Computer Science Stream',
        'Education World Ranking: 3 in India',
        'Class 12 Boards: 93.4% (Top 1%)',
        'Class 10 Boards: 94.6% (Top 1%)',
        'Organising committee for five national and international festivals'
      ]
    }
  ]

  const activeEducation = educationData[currentPage]

  return (
    <section id="education" className="education" ref={educationRef}>
      <div className="education-container">
        <div className="education-header">
          <span className="section-label">Education Passport</span>
        </div>

        <div className="education-passport">
          <div className="passport-stamp-strip" aria-label="Education passport stamps">
            <span className="passport-strip-kicker">Choose a stamp</span>
            {educationData.map((edu, index) => (
              <button
                key={edu.id}
                className={`passport-stamp ${currentPage === index ? 'active' : ''}`}
                data-code={edu.code}
                style={{ '--stamp-flag': `url("${edu.flag}")` }}
                onClick={() => setCurrentPage(index)}
              >
                <span className="passport-stamp-logo">
                  <img src={edu.logo} alt={`${edu.institution} logo`} />
                </span>
                <span className="passport-stamp-copy">
                  <span className="passport-stamp-type">{edu.type}</span>
                  <span className="passport-stamp-name">{edu.institution}</span>
                </span>
              </button>
            ))}
          </div>

          <article className="passport-page" key={activeEducation.id}>
            <div className="passport-page-inner">
              <img className="passport-background-image" src={activeEducation.image} alt="" aria-hidden="true" />

              <div className="passport-info-panel">
                <div className="passport-seal-row">
                  <div className="passport-seal">
                    <img src={activeEducation.logo} alt={`${activeEducation.institution} logo`} />
                  </div>
                  <div className="passport-validity">
                    Validity
                    <strong>{activeEducation.years}</strong>
                  </div>
                </div>

                <p className="passport-type">{activeEducation.type}</p>
                <h3 className="passport-institution">{activeEducation.institution}</h3>

                <ul className="passport-details">
                  {activeEducation.details.map((detail, i) => {
                    const isSpecial = detail.includes('Ranking:') || detail.includes('CGPA:') || detail.includes('Board Exams')
                    if (isSpecial) {
                      const [label, ...valueParts] = detail.split(':')
                      const value = valueParts.join(':')
                      return (
                        <li key={i} className="passport-detail">
                          {label}: <span className="highlight-text">{value}</span>
                        </li>
                      )
                    }
                    return (
                      <li key={i} className="passport-detail">
                        {detail}
                      </li>
                    )
                  })}
                </ul>

                <div className="passport-stamp-footer">
                  <span>Verified</span>
                  <span>{activeEducation.code}</span>
                  <span>{activeEducation.type}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Education
