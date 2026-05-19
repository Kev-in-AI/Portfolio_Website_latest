import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Extracurriculars.css'

const activities = [
  {
    id: 1,
    role: 'President',
    organisation: "CityU Indian Students' Association",
    period: 'Feb 2025 - Mar 2026',
    duration: '1 yr 2 mos',
    logo: '/assets/ISA logo.png',
    affiliationLogo: '/assets/CityU Logo.png',
    spotlight: 'Led a community of 250+ students and alumni',
    metrics: ['86% event conversion', '250+ community', 'Largest cumulative turnout'],
    details: [
      'Achieved 86% event conversion compared to 48% in the previous year.',
      'Became the first President to collaborate with an external organisation, Inter Cultural Education.',
      'Headed a community of more than 250 students and alumni.',
      'Delivered the largest cumulative event turnout compared to any past committee.',
      'Led the first cabinet to include a Local Indian member in the administration for Hong Kong local integration.',
      'Focused on celebrating Indian culture, strengthening collaboration with other organisations, and building a supportive community within the University.'
    ]
  },
  {
    id: 2,
    role: 'Finance Tutor, Hall Management Team',
    organisation: 'City University of Hong Kong',
    period: 'Jun 2025 - Jan 2026',
    duration: '8 mos',
    logo: '/assets/CityU Logo.png',
    spotlight: 'Managed hall finances, budgets, reimbursements, and resident support',
    metrics: ['Budget planning', 'Financial transparency', 'Pastoral care'],
    details: [
      'Managed hall finances, planned budgets, handled reimbursements, and supported financial transparency for hall-related activities.',
      'Provided pastoral care as part of the Resident Tutor role.',
      'Supported hall administration and helped foster a welcoming, inclusive environment for residents from around the world.'
    ]
  },
  {
    id: 3,
    role: 'PALSI Leader and Tutor',
    organisation: 'Talent and Education Development Office, CityUHK',
    period: 'Sep 2024 - Dec 2024',
    duration: '4 mos',
    logo: '/assets/CityU Logo.png',
    spotlight: 'Tutored GE1354 Introduction to Electronic Design for freshmen',
    metrics: ['5 freshmen', 'Study planning', 'Course reasoning'],
    details: [
      'Supported students in understanding course material and improving learning and reasoning skills.',
      'Helped students prepare for classes, formulate study plans, and review course materials.',
      'Tutored GE1354 Introduction to Electronic Design for a group of five freshmen.'
    ]
  },
  {
    id: 4,
    role: 'Internal Vice President',
    organisation: "CityU Indian Students' Association",
    period: 'Feb 2024 - Feb 2025',
    duration: '1 yr 1 mo',
    logo: '/assets/ISA logo.png',
    affiliationLogo: '/assets/CityU Logo.png',
    spotlight: 'First freshman elected Vice President in the association history',
    metrics: ['First freshman VP', 'Culture building', 'Community integration'],
    details: [
      'Helped promote Indian culture and integrate the Indian community with the wider international environment at CityU.',
      'Became the first freshman to be elected as a Vice President in the organisation history.',
      'Supported internal coordination, cultural programming, and community-building initiatives.'
    ]
  },
  {
    id: 5,
    role: 'Transcendence, Executive Committee',
    organisation: "St. Joseph's Boys' High School",
    period: 'Apr 2022 - Jun 2022',
    duration: '3 mos',
    logo: '/assets/SJBHS Logo.png',
    spotlight: 'Led digital design and administration for a national science festival',
    metrics: ['1000+ participants', 'Media operations', 'National festival'],
    details: [
      'Led the digital design team while supporting event administration for a national science festival.',
      'Helped deliver a festival with over a thousand participants from across the country.',
      'Curated and hosted a marketing event that blended business and science and became one of the festival highlights.'
    ]
  },
  {
    id: 6,
    role: 'Phenomenon, Executive Committee',
    organisation: "St. Joseph's Boys' High School",
    period: 'Oct 2022 - Nov 2022',
    duration: '2 mos',
    logo: '/assets/SJBHS Logo.png',
    spotlight: "Built digital assets for Bangalore's premier cultural festival",
    metrics: ['IT & marketing', 'Visual design', 'National event'],
    details: [
      "Contributed to Bangalore's premier cultural festival as part of the IT and Marketing team.",
      'Created posters, banners, brochures, and videos for festival promotion.',
      'Supported a national cultural event featuring global artists and a large student audience.'
    ]
  },
  {
    id: 7,
    role: 'SJBHSMUN, IT and Online Relations',
    organisation: "St. Joseph's Boys' High School",
    period: 'Sep 2021 - Oct 2021',
    duration: '2 mos',
    logo: '/assets/SJBHS Logo.png',
    spotlight: 'Designed media assets and supported backend allotments',
    metrics: ['Social media', 'Backend support', 'Event systems'],
    details: [
      'Designed posters, brochures, and videos for the social media page.',
      'Streamlined allotments in the backend for the event operations team.'
    ]
  },
  {
    id: 8,
    role: 'SJBHSMUN, Executive Committee',
    organisation: "St. Joseph's Boys' High School",
    period: 'Aug 2022 - Oct 2022',
    duration: '3 mos',
    logo: '/assets/SJBHS Logo.png',
    spotlight: 'Returned to the IT and Online Relations team in an executive role',
    metrics: ['Executive committee', 'Online relations', 'Operations'],
    details: [
      'Served on the Executive Committee for SJBHSMUN as part of the IT and Online Relations team.',
      'Supported event-facing digital operations and online communication workflows.'
    ]
  }
]

const Extracurriculars = () => {
  const sectionRef = useRef(null)
  const [selectedActivity, setSelectedActivity] = useState(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedActivity ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedActivity])

  return (
    <section id="extracurriculars" className="extracurriculars" ref={sectionRef}>
      <div className="extracurriculars-container">
        <div className="extracurriculars-header">
          <span className="section-label">Activities</span>
        </div>

        <div className="activity-board">
          {activities.map((activity, index) => (
            <button
              key={activity.id}
              className={`activity-card activity-card-${index + 1}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="activity-card-top">
                <div className="activity-logo-stack">
                  <img src={activity.logo} alt={`${activity.organisation} logo`} className="activity-logo" />
                  {activity.affiliationLogo && (
                    <img src={activity.affiliationLogo} alt="Affiliation logo" className="activity-affiliation-logo" />
                  )}
                </div>
                <div className="activity-period">
                  <span>{activity.period}</span>
                  <strong>{activity.duration}</strong>
                </div>
              </div>

              <div className="activity-card-body">
                <h3 className="activity-role">{activity.role}</h3>
                <p className="activity-organisation">{activity.organisation}</p>
                <p className="activity-spotlight">{activity.spotlight}</p>
              </div>

              <div className="activity-metrics">
                {activity.metrics.slice(0, 3).map((metric) => (
                  <span key={metric}>{metric}</span>
                ))}
              </div>

              <span className="activity-detail-link">Details</span>
            </button>
          ))}
        </div>
      </div>

      {selectedActivity && createPortal(
        <div className="activity-modal-overlay" onClick={() => setSelectedActivity(null)}>
          <div className="activity-modal" onClick={(event) => event.stopPropagation()}>
            <button
              className="activity-modal-close"
              onClick={() => setSelectedActivity(null)}
              aria-label="Close activity details"
            >
              &times;
            </button>
            <div className="activity-modal-heading">
              <img src={selectedActivity.logo} alt={`${selectedActivity.organisation} logo`} className="activity-modal-logo" />
              <div>
                <span className="activity-modal-period">{selectedActivity.period} · {selectedActivity.duration}</span>
                <h3>{selectedActivity.role}</h3>
                <p>{selectedActivity.organisation}</p>
              </div>
            </div>
            <ul className="activity-detail-list">
              {selectedActivity.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Extracurriculars
