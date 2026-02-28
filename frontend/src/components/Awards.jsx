import { useEffect, useRef, useState } from 'react'
import './Awards.css'

const RollingDigit = ({ digit, isVisible }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (isVisible) {
      setOffset(Number(digit))
    } else {
      setOffset(0)
    }
  }, [digit, isVisible])

  return (
    <div className="rolling-digit-container">
      <div 
        className="rolling-digit-strip" 
        style={{ transform: `translateY(-${offset * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <div key={n} className="digit-item">{n}</div>
        ))}
      </div>
    </div>
  )
}

const RollingCounter = ({ target, isVisible }) => {
  const digits = String(target).split('')
  
  return (
    <div className="rolling-counter">
      <span className="counter-prefix">x</span>
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} isVisible={isVisible} />
      ))}
    </div>
  )
}

const Modal = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null

  // Convert Google Drive view link to preview link for iframe
  const getEmbedUrl = (link) => {
    if (link.includes('drive.google.com')) {
      return link.replace(/\/view.*$/, '/preview')
    }
    return link
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <iframe
          src={getEmbedUrl(url)}
          title="Certificate Preview"
          className="modal-iframe"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  )
}

const Awards = () => {
  const awardsRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currency, setCurrency] = useState('HKD')
  const [typedAmount, setTypedAmount] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [modalConfig, setModalConfig] = useState({ isOpen: false, url: '' })
  
  // Calculate the number to display based on currency
  const getAmount = () => {
    return currency === 'HKD' ? '690,500' : '7,200,000'
  }
  
  // Typing animation effect
  useEffect(() => {
    if (!isVisible || currentPage !== 0) {
      // Don't clear typedAmount if we just switched pages, 
      // but only start typing if we are on page 0 and it's visible.
      if (!isVisible) setTypedAmount('')
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    const targetAmount = getAmount()
    
    // If we already have the full amount typed (e.g. from switching back), don't re-type
    if (typedAmount === targetAmount) {
      setIsTyping(false)
      return
    }

    let currentIndex = 0
    setTypedAmount('')

    const typeNextChar = () => {
      if (currentIndex < targetAmount.length) {
        setTypedAmount(targetAmount.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, 50)
      } else {
        setIsTyping(false)
      }
    }

    const timer = setTimeout(typeNextChar, 300)
    return () => clearTimeout(timer)
  }, [isVisible, currency, currentPage])

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

    if (awardsRef.current) {
      observer.observe(awardsRef.current)
    }

    return () => {
      if (awardsRef.current) {
        observer.unobserve(awardsRef.current)
      }
    }
  }, [])

  const scholarships = [
    {
      id: 1,
      title: 'Chan Sui Hung Best Student Award 2025-26',
      amount: currency === 'HKD' ? '25,000' : '260,000',
      description: 'Leadership, academic and extra-curricular excellence',
      link: 'https://drive.google.com/file/d/1Dz4GYxRNgVybShXZJaZZtcZyX7hY-QWV/view?usp=drive_link',
    },
    {
      id: 2,
      title: 'Entrance Scholarship by CityUHK',
      amount: currency === 'HKD' ? '640,000' : '6,680,000',
      description: 'Exceptional academic record and for maintaining a CGPA > 3.2',
      link: 'https://www.cityu.edu.hk/admo/entrance-scholarship-international-students',
    },
    {
      id: 3,
      title: 'Lee Shau Kee Exchange Scholarship 2025-26',
      amount: currency === 'HKD' ? '48,000' : '500,000',
      description: 'One of fifteen students in the university to receive this award',
      link: 'https://drive.google.com/file/d/1QMY5OLCOAb6dA1oLK2S1946U6rcWwfki/view?usp=sharing',
    },
  ]

  const academicAwards = [
    {
      id: 1,
      title: "Dean's List",
      count: 5,
      description: "Awarded Dean's List by the Dean of the College of Engineering at CityU for for all of five semesters for getting a GPA > 3.7",
      certificate: "https://drive.google.com/file/d/1RaMdRWrEd0ChiSuUXtKFjpcqxL4hzpOs/view?usp=sharing"
    },
    {
      id: 2,
      title: "Talent Award",
      count: 2,
      description: "Awarded the Talents Awards twice by Professor Kenneth Lo Kam-wing, Director of the Talent and Education Development Office, CityU, for exemplary academic performance and meeting all the requirements for the CityUHK Tiger Programme",
      certificate: "https://drive.google.com/file/d/1Lp2pOpZ_JeSFYCP8Wy6I5e_i0rDQYrqz/view?usp=sharing"
    }
  ]

  const openCertificate = (e, url) => {
    e.preventDefault()
    setModalConfig({ isOpen: true, url })
  }

  return (
    <section id="awards" className="awards" ref={awardsRef}>
      <div className="awards-container">
        <div className="awards-header">
          <div className="header-top">
            <span className="section-label">Awards</span>
            <div className="header-nav">
              <button 
                className={`header-nav-btn ${currentPage === 0 ? 'active' : ''} ${currentPage === 1 ? 'next-prompt' : ''}`}
                onClick={() => setCurrentPage(0)}
              >
                Scholarships
              </button>
              <button 
                className={`header-nav-btn ${currentPage === 1 ? 'active' : ''} ${currentPage === 0 ? 'next-prompt' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                Academic Awards
              </button>
            </div>
          </div>
          <h2 className="section-title">
            {currentPage === 0 ? 'Scholarships' : 'Academic Awards'}
          </h2>
        </div>

        <div className="awards-slider" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
          {/* Page 1: Scholarships */}
          <div className="awards-page">
            <div className="scholarship-summary">
              <p className="summary-label">Total Claimed Scholarship Amount so far.</p>
              <div className="amount-display">
                <span className="amount-number">
                  {typedAmount}
                  {isVisible && currentPage === 0 && typedAmount.length < getAmount().length && (
                    <span className="typing-cursor">|</span>
                  )}
                </span>
                <span className="currency-symbol">
                  {currency === 'HKD' ? 'HKD' : 'INR'}
                </span>
              </div>
              <div className="currency-toggle">
                <button
                  className={`currency-btn ${currency === 'HKD' ? 'active' : ''}`}
                  onClick={() => setCurrency('HKD')}
                >
                  Hong Kong Dollars
                </button>
                <button
                  className={`currency-btn ${currency === 'INR' ? 'active' : ''}`}
                  onClick={() => setCurrency('INR')}
                >
                  Indian Rupees
                </button>
              </div>
            </div>

            <div className="scholarships-grid">
              {scholarships.map((scholarship) => (
                <div key={scholarship.id} className="scholarship-card">
                  <h3 className="scholarship-title">{scholarship.title}</h3>
                  <div className="scholarship-amount">
                    {scholarship.amount}
                    <span className="scholarship-currency">{currency === 'HKD' ? 'HKD' : 'INR'}</span>
                  </div>
                  <p className="scholarship-description">{scholarship.description}</p>
                  <a 
                    href={scholarship.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="learn-more-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Page 2: Academic Awards */}
          <div className="awards-page">
            <div className="academic-awards-grid">
              {academicAwards.map((award) => (
                <div key={award.id} className="academic-award-card">
                  <div className="academic-award-count">
                    <RollingCounter target={award.count} isVisible={isVisible && currentPage === 1} />
                  </div>
                  <div className="academic-award-content">
                    <h3 className="academic-award-title">{award.title}</h3>
                    <p className="academic-award-description">{award.description}</p>
                    <a 
                      href={award.certificate}
                      onClick={(e) => openCertificate(e, award.certificate)}
                      className="certificate-link"
                    >
                      Certificate here
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Modal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
        url={modalConfig.url} 
      />
    </section>
  )
}

export default Awards
