import { useEffect, useRef, useState } from 'react'
import './Awards.css'

const cityuLogo = '/assets/CityU Logo.png'
const sjbhsLogo = '/assets/SJBHS Logo.png'
const isaLogo = '/assets/ISA logo.png'
const webullLogo = '/assets/webull logo.webp'
const morganStanleyLogo = '/assets/morgan stanley logo.jpg'
const cathayLogo = '/assets/cathay logo.jpg'
const amaatraLogo = '/assets/Amaatra logo.png'

const scholarshipValues = {
  HKD: '713,000',
  INR: '7,440,000'
}

const awards = [
  {
    id: 'deans-list-clubbed',
    title: "Dean's List",
    issuer: 'Dean, College of Engineering',
    date: 'Dec 2023 - Dec 2025',
    category: 'Academic',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    summary: 'Awarded across five semesters for maintaining GPA above 3.7.',
    details: [
      "Awarded Dean's List for Semesters 1A, 1B, 2A, 2B, and 3A.",
      'Recognised by the Dean, College of Engineering for consistently achieving GPA above 3.7.'
    ]
  },
  {
    id: 'talent-awards-clubbed',
    title: 'Talent Award',
    issuer: 'Talent and Education Development Office, CityU',
    date: 'Sep 2023 and Sep 2024',
    category: 'Academic',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    summary: 'Recognised twice for exemplary academic performance and CityUHK Tiger Programme completion.',
    details: [
      'Received the Talent Award in 2023-24 and 2024-25.',
      'Awarded for exemplary academic performance and meeting all requirements for the CityUHK Tiger Programme.'
    ],
    proofLabel: 'Talent Award 2023-24 & 2024-25',
    link: 'https://drive.google.com/file/d/1Lp2pOpZ_JeSFYCP8Wy6I5e_i0rDQYrqz/view?usp=sharing'
  },
  {
    id: 'campus-internationalisation-clubbed',
    title: 'Campus Internationalisation Award',
    issuer: 'City University of Hong Kong',
    date: 'Apr 2025 and Apr 2026',
    category: 'Leadership',
    logo: isaLogo,
    association: "CityU Indian Students' Association",
    summary: 'Recognised twice for leading cultural integration projects through the Indian Students Association.',
    details: [
      'Received the Campus Internationalisation Award in 2025 and 2026.',
      'Recognised for contributing to campus-wide cultural integration through the Diwali Celebration and other ISA-led community initiatives.',
      'The awards reflect work across both Internal Vice President and President roles, building a more connected international campus community.'
    ],
    proofLabel: 'Campus Internationalisation Award certificates',
    proofLinks: [
      {
        label: '2024-25 certificate',
        url: 'https://drive.google.com/file/d/11uNKHFngOqcj1w20TtlnM1rpytyiG9Xn/view?usp=sharing'
      },
      {
        label: '2025-26 certificate',
        url: 'https://drive.google.com/file/d/1HxPNbI_3L5Z9uuMAOJYsZf1RUtqoFL_u/view?usp=sharing'
      }
    ]
  },
  {
    id: 'lee-shau-kee',
    title: 'Lee Shau Kee Exchange Scholarship',
    issuer: 'Student Development Services, City University of Hong Kong',
    date: 'Nov 2025',
    category: 'Scholarships',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    value: 'HK$48,000',
    summary: 'One of 15 annual recipients of a highly competitive outbound exchange scholarship supporting study at UCL.',
    details: [
      'Selected for one of CityUHK highest honours for outbound exchange students.',
      'The scholarship is highly competitive, with only 15 recipients each year.',
      'Received HK$48,000 to support a semester exchange at University College London.'
    ],
    proofLabel: 'Financial Sponsorship Letter',
    link: 'https://drive.google.com/file/d/1QMY5OLCOAb6dA1oLK2S1946U6rcWwfki/view?usp=sharing'
  },
  {
    id: 'palsi-leader',
    title: 'PALSI Leader',
    issuer: 'Talent and Education Development Office',
    date: 'Sep 2025',
    category: 'Leadership',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    summary: 'Selected to support peer learning for GE1354 Introduction to Electronic Design.',
    details: [
      "Selected as a PALSI Leader to support peer learning under the university's academic support scheme.",
      'Facilitated weekly sessions for five freshmen taking GE1354 Introduction to Electronic Design.',
      'Helped students prepare for classes, review key concepts, develop study strategies, and strengthen problem-solving skills.'
    ],
    proofLabel: 'Certificate of Appreciation - PALSI'
  },
  {
    id: 'morgan-stanley-finalist',
    title: 'Morgan Stanley Code to Give 2025 Finalist',
    issuer: 'Morgan Stanley',
    date: 'Aug 2025',
    category: 'Hackathons',
    logo: morganStanleyLogo,
    association: 'Morgan Stanley',
    summary: 'Finalist for Reach Learning, an EdTech app supporting underprivileged kindergarten students and families in Hong Kong.',
    details: [
      'Recognized as a finalist in the Morgan Stanley Code to Give Hackathon 2025.',
      'Developed Reach Learning, an EdTech mobile application for underprivileged kindergarten students and their families in Hong Kong.',
      'Worked in a team to build educational resources and AI-assisted learning support.'
    ]
  },
  {
    id: 'csh-best-student',
    title: 'Chan Sui Hung Best Student Award 2024-25',
    issuer: 'Student Residence Office, CityU',
    date: 'Jun 2025',
    category: 'Scholarships',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    value: 'HK$25,000',
    summary: 'Awarded for outstanding academic performance, leadership, and active contributions to hall life.',
    details: [
      'Awarded for outstanding academic performance, leadership, and active contributions to hall life and the residence community.'
    ],
    proofLabel: 'CSH Best Student Award documents',
    proofLinks: [
      {
        label: 'Thank you letter',
        url: 'https://drive.google.com/file/d/1cUWuoAhX2s-YdsVnghTjMPqfJ-aj09i-/view?usp=sharing'
      },
      {
        label: 'Award receipt email',
        url: 'https://drive.google.com/file/d/1SIaHSpd4gmXJorj98krWwJn4CxL_cuQG/view?usp=sharing'
      }
    ]
  },
  {
    id: 'cathay-finalist',
    title: 'Cathay Hackathon 2024 Finalist',
    issuer: 'Cathay Pacific',
    date: 'Nov 2024',
    category: 'Hackathons',
    logo: cathayLogo,
    association: 'Cathay Pacific',
    summary: 'Finalist for CathayGO, a gamified travel and lifestyle platform for the Cathay Pacific and Asia Miles experience.',
    details: [
      'Recognised as a finalist in Cathay Hackathon 2024 for developing CathayGO.',
      'Collaborated in a team to conceptualise and build a gamified application featuring flight booking integration, location-based partner discovery, rewards redemption, and the Asia Milestone engagement system.',
      'Reaching the finals strengthened my passion for technology, innovation, and user-focused product design.'
    ]
  },
  {
    id: 'fintech-esg-finalist',
    title: 'CityU x WeBull Fintech ESG Hackathon',
    issuer: 'City University of Hong Kong',
    date: 'Jan 2024',
    category: 'Hackathons',
    logo: webullLogo,
    association: 'City University of Hong Kong',
    summary: 'First hackathon finalist experience, building the foundation for later product and innovation work.',
    details: [
      'Reached the finalist stage in the CityU Fintech x ESG Hackathon 2024.',
      'This was my first hackathon, and the experience gained was unmatched.'
    ]
  },
  {
    id: 'full-tuition',
    title: 'Full Tuition Scholarship',
    issuer: 'City University of Hong Kong',
    date: 'Sep 2023',
    category: 'Scholarships',
    logo: cityuLogo,
    association: 'City University of Hong Kong',
    value: 'HK$145,000 / year',
    summary: 'Entrance scholarship awarded to students with outstanding academic track records.',
    details: [
      'Students with an outstanding academic track record are awarded this scholarship worth HK$145,000 per annum.',
      'Maintained the academic standing required to continue receiving scholarship support.'
    ],
    proofLabel: 'Financial Record - Full Tuition Scholarship',
    link: 'https://drive.google.com/file/d/1ZpC2xA6h9f6qU3raSWqM1prHlg7KJfAY/view?usp=sharing'
  },
  {
    id: 'principal-creative-design',
    title: "Principal's Award for Contribution to Creative Design",
    issuer: "St. Joseph's Boys' High School",
    date: 'Aug 2023',
    category: 'School',
    logo: sjbhsLogo,
    association: "St. Joseph's Boys' High School",
    summary: 'Recognised for creative design contributions to school initiatives.',
    details: ['Awarded by St. Joseph\'s Boys\' High School for contribution to creative design.'],
    proofLabel: "Certificate - Principal's Award (Creative Design)",
    link: 'https://drive.google.com/file/d/1HBAHbAYM8FmX8SrAj92BisnYOUe8-zMS/view?usp=sharing'
  },
  {
    id: 'principal-eca',
    title: "Principal's Award for Outstanding Contribution to Extra Curricular Activities",
    issuer: "St. Joseph's Boys' High School",
    date: 'Aug 2023',
    category: 'School',
    logo: sjbhsLogo,
    association: "St. Joseph's Boys' High School",
    summary: 'Recognised for outstanding contribution to extra-curricular activities.',
    details: ['Awarded by St. Joseph\'s Boys\' High School for outstanding contribution to extra-curricular activities.'],
    proofLabel: "Certificate - Principal's Award (Extra-curricular Activities)",
    link: 'https://drive.google.com/file/d/1omAjRDlcNJWBq1sBlamHAo7lBo1VpMI9/view?usp=sharing'
  },
  {
    id: 'amaatra-mun',
    title: 'Commendable Delegate - Model United Nations',
    issuer: 'Amaatra Academy',
    date: 'Jan 2023',
    category: 'School',
    logo: amaatraLogo,
    association: 'Amaatra Academy',
    summary: 'Placed in a crisis portfolio committee.',
    details: ['Placed in a crisis portfolio committee at Amaatra Model United Nations 2023.'],
    proofLabel: 'AMAATRA MUN - Commendable Delegate',
    link: 'https://drive.google.com/file/d/1T1PzjPgSUmphV36ntwJp-sWjOL50MBXy/view?usp=drive_link'
  }
]

const featuredAward = awards.find((award) => award.id === 'csh-best-student')

const awardGroups = ['Scholarships', 'Academic', 'Leadership', 'Hackathons', 'School'].map((category) => ({
  category,
  awards: awards.filter((award) => award.category === category)
})).filter((group) => group.awards.length > 0)

const getAwardProofLinks = (award) => {
  if (award.proofLinks) return award.proofLinks
  if (award.link) return [{ label: 'View proof', url: award.link }]
  return []
}

const Awards = () => {
  const awardsRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currency, setCurrency] = useState('HKD')
  const [typedAmount, setTypedAmount] = useState('')
  const [openGroups, setOpenGroups] = useState({
    Scholarships: false,
    Academic: false,
    Leadership: false,
    Hackathons: false,
    School: false
  })
  const [selectedAward, setSelectedAward] = useState(null)

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
      { threshold: 0.2 }
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

  useEffect(() => {
    if (!isVisible) {
      setTypedAmount('')
      return
    }

    const targetAmount = scholarshipValues[currency]
    let currentIndex = 0
    setTypedAmount('')

    const typeNextChar = () => {
      if (currentIndex < targetAmount.length) {
        setTypedAmount(targetAmount.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeNextChar, 45)
      }
    }

    const timer = setTimeout(typeNextChar, 250)
    return () => clearTimeout(timer)
  }, [currency, isVisible])

  useEffect(() => {
    document.body.style.overflow = selectedAward ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedAward])

  const toggleGroup = (category) => {
    setOpenGroups(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const selectedAwardProofLinks = selectedAward ? getAwardProofLinks(selectedAward) : []

  return (
    <section id="awards" className="awards" ref={awardsRef}>
      <div className="awards-container">
        <div className="awards-header">
          <span className="section-label">Awards Dash</span>
        </div>

        <div className="awards-dashboard">
          <div className="scholarship-summary">
            <p className="summary-label">Total scholarship value recognised so far</p>
            <div className="amount-display">
              <span className="amount-number">
                {typedAmount}
                {isVisible && typedAmount.length < scholarshipValues[currency].length && (
                  <span className="typing-cursor">|</span>
                )}
              </span>
              <span className="currency-symbol">{currency}</span>
            </div>
            <div className="currency-toggle">
              <button className={`currency-btn ${currency === 'HKD' ? 'active' : ''}`} onClick={() => setCurrency('HKD')}>
                HKD
              </button>
              <button className={`currency-btn ${currency === 'INR' ? 'active' : ''}`} onClick={() => setCurrency('INR')}>
                INR
              </button>
            </div>
            <div className="scholarship-breakdown" aria-label="Scholarship breakdown">
              <span>
                <strong>Full tuition</strong>
                HK$640,000
              </span>
              <span>
                <strong>Exchange</strong>
                HK$48,000
              </span>
              <span>
                <strong>Best student</strong>
                HK$25,000
              </span>
            </div>
          </div>

          <div className="award-stat-stack">
            <div>
              <span className="award-stat-number">19</span>
              <span className="award-stat-label">recognitions</span>
            </div>
            <div>
              <span className="award-stat-number">5</span>
              <span className="award-stat-label">Dean's Lists</span>
            </div>
            <div>
              <span className="award-stat-number">3</span>
              <span className="award-stat-label">hackathon finals</span>
            </div>
          </div>
        </div>

        {featuredAward && (
          <button className="featured-award-card" onClick={() => setSelectedAward(featuredAward)}>
            <div className="featured-award-ribbon">Featured recognition</div>
            <div className="award-entry-topline">
              <div className="award-logo-shell">
                <img src={featuredAward.logo} alt={`${featuredAward.association} logo`} />
              </div>
              <div className="award-entry-copy">
                <div className="award-meta-row">
                  <span>{featuredAward.category}</span>
                  <span>{featuredAward.date}</span>
                </div>
                <h3>{featuredAward.title}</h3>
                <p className="award-issuer">Issued by {featuredAward.issuer}</p>
              </div>
              <div className="award-value-pill">{featuredAward.value}</div>
            </div>
            <p className="award-summary">{featuredAward.summary}</p>
          </button>
        )}

        <div className="award-accordion">
          {awardGroups.map((group) => (
            <div key={group.category} className={`award-group ${openGroups[group.category] ? 'open' : ''}`}>
              <button className="award-group-toggle" onClick={() => toggleGroup(group.category)}>
                <span>{group.category}</span>
                <strong>{group.awards.length}</strong>
              </button>
              <div className="award-group-panel">
                <div className="award-ledger">
                  {group.awards.map((award, index) => (
                    <button
                      key={award.id}
                      className="award-entry"
                      style={{ transitionDelay: `${index * 0.04}s` }}
                      onClick={() => setSelectedAward(award)}
                    >
                      <div className="award-entry-topline">
                        <div className="award-logo-shell">
                          {award.logo ? (
                            <img src={award.logo} alt={`${award.association || award.issuer} logo`} />
                          ) : (
                            <span>{award.category.slice(0, 2)}</span>
                          )}
                        </div>
                        <div className="award-entry-copy">
                          <div className="award-meta-row">
                            <span>{award.category}</span>
                            <span>{award.date}</span>
                          </div>
                          <h3>{award.title}</h3>
                          <p className="award-issuer">Issued by {award.issuer}</p>
                        </div>
                        {award.value && <div className="award-value-pill">{award.value}</div>}
                      </div>
                      <p className="award-summary">{award.summary}</p>
                      {award.proofLabel && <span className="award-proof-label">{award.proofLabel}</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAward && (
        <div className="award-modal-overlay" onClick={() => setSelectedAward(null)}>
          <div className="award-modal" onClick={(event) => event.stopPropagation()}>
            <button className="award-modal-close" onClick={() => setSelectedAward(null)}>&times;</button>
            <div className="award-modal-heading">
              <div className="award-logo-shell large">
                {selectedAward.logo ? (
                  <img src={selectedAward.logo} alt={`${selectedAward.association || selectedAward.issuer} logo`} />
                ) : (
                  <span>{selectedAward.category.slice(0, 2)}</span>
                )}
              </div>
              <div>
                <span className="award-modal-kicker">{selectedAward.category} · {selectedAward.date}</span>
                <h3>{selectedAward.title}</h3>
                <p>{selectedAward.issuer}</p>
              </div>
            </div>
            {selectedAward.association && (
              <p className="award-modal-association">Associated with {selectedAward.association}</p>
            )}
            <ul className="award-modal-list">
              {selectedAward.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <div className="award-modal-footer">
              {selectedAward.proofLabel && <span>{selectedAward.proofLabel}</span>}
              {selectedAwardProofLinks.map((proofLink) => (
                <a key={proofLink.url} href={proofLink.url} target="_blank" rel="noopener noreferrer">
                  {proofLink.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Awards
