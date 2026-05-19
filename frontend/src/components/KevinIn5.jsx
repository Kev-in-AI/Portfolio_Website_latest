import { useState } from 'react'
import './KevinIn5.css'

const frames = [
  {
    id: 'people',
    eyebrow: 'I am a',
    headline: 'People Person',
    footnote: 'Love to collaborate (and yap)',
    tone: 'white'
  },
  {
    id: 'global',
    eyebrow: 'I aspire to be a',
    headline: 'Global Citizen',
    cities: ['London', 'Hong Kong', 'Bangalore'],
    tone: 'blue'
  },
  {
    id: 'finance',
    eyebrow: 'Aspire to work where Tech meets',
    headline: 'Finance',
    navLabel: 'Markets',
    secondary: 'Insurance',
    connector: 'or',
    tone: 'gold'
  },
  {
    id: 'tech',
    eyebrow: "But don't get me wrong, I love my",
    headline: 'Tech',
    tone: 'red'
  },
  {
    id: 'network',
    eyebrow: 'I value my',
    headline: 'Network',
    footnote: "Let's chat?",
    tone: 'white',
    contact: true
  }
]

const KevinIn5 = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFrame = frames[activeIndex]

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? frames.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveIndex((current) => (current === frames.length - 1 ? 0 : current + 1))
  }

  return (
    <section id="kevin-in-5" className="kevin-in-5" aria-label="Kevin in 5">
      <div className="k5-shell">
        <div className="k5-heading">
          <span className="section-label">Five Frames of Kevin</span>
          <p>Five quick frames. No resume voice. Just the human bit.</p>
          <div className="k5-progress" aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <div>
              <i style={{ width: `${((activeIndex + 1) / frames.length) * 100}%` }} />
            </div>
            <span>05</span>
          </div>
          <div className="k5-controls" aria-label="Kevin in 5 controls">
            <button type="button" onClick={goToPrevious} aria-label="Previous frame">
              ←
            </button>
            <span>{activeFrame.navLabel || activeFrame.headline}</span>
            <div className="k5-next-wrap">
              <button type="button" className="k5-next-button" onClick={goToNext} aria-label="Next frame">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="k5-deck" style={{ '--active-index': activeIndex }}>
          {frames.map((frame, index) => (
            <article
              key={frame.id}
              className={`k5-card k5-${frame.id} tone-${frame.tone} ${activeIndex === index ? 'active' : ''}`}
              style={{ '--i': index }}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => (activeIndex === index ? goToNext() : setActiveIndex(index))}
              aria-label={`${frame.headline}. ${activeIndex === index ? 'Click for next frame.' : 'Click to open this frame.'}`}
            >
              <div className="k5-card-index">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>/ 05</span>
              </div>

              <div className="k5-card-content">
                <p className="k5-eyebrow">{frame.eyebrow}</p>
                <h2 className="k5-headline">{frame.headline}</h2>

                {frame.secondary && (
                  <div className="k5-secondary-row">
                    <span>{frame.connector}</span>
                    <h3>{frame.secondary}</h3>
                  </div>
                )}

                {frame.cities && (
                  <div className="k5-cities">
                    {frame.cities.map((city) => (
                      <span key={city}>{city}</span>
                    ))}
                  </div>
                )}

                {frame.footnote && (
                  <div className="k5-footnote-row">
                    <p className="k5-footnote">{frame.footnote}</p>
                    {frame.contact && (
                      <a href="#contact" className="k5-contact-link">
                        Contact →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default KevinIn5
