import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './Projects.css'

const Projects = () => {
  const projectsRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [])

  const projects = [
    {
      id: 4,
      title: 'ML Algorithms from Scratch',
      description: 'Implemented decision trees, ensembles, and kernel SVMs from scratch in Python/Jupyter for UCL coursework, building full model pipelines and achieving 100/100.',
      fullDescription: {
        overview: 'Machine Learning Algorithms from Scratch: Decision Trees, Ensembles & Kernel SVMs was an individual UCL programming coursework completed from Jan 2026 to Mar 2026. I implemented core machine learning algorithms from scratch in Python/Jupyter, achieving 100/100.\n\nThe project focused on building and testing two full model pipelines: decision trees and ensembles, plus support vector machines. It strengthened my understanding of machine learning fundamentals, optimization, model evaluation, and performance-aware Python implementation beyond using pre-built ML libraries.',
        contributions: [
          'Implemented squared-loss split selection, CART tree construction, and tree evaluation for decision tree learning.',
          'Developed ensemble methods including random forests, bagging, and boosting.',
          'Optimized competition code that performed faster than hidden benchmark implementations.',
          'Implemented primal SVM training, hinge loss optimization, and kernelized SVMs.',
          'Built linear, polynomial, and RBF kernel functions.',
          'Implemented dual SVM training and cross-validation for model and parameter selection.',
          'Tuned the classifier to pass competitive hidden tests with strong error performance.'
        ]
      },
      tags: ['Machine Learning', 'Python', 'Jupyter', 'SVM', 'Decision Trees'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Kev-in-AI/CART-Decision-Tree-and-SVM-Classifier-Engine' }
      ]
    },
    {
      id: 5,
      title: 'Screen Slate',
      description: 'A Dockerised full-stack movie intelligence web app for catalogue discovery, viewer sentiment analysis, rating prediction, and authenticated curator lists.',
      fullDescription: {
        overview: 'Screen Slate is a Dockerised full-stack movie intelligence web application built from Jan 2026 to Mar 2026 for streaming content strategists. It helps users explore catalogue data, analyse viewer sentiment, predict ratings for recent and upcoming titles, and create authenticated curator lists.\n\nThe coursework brief required a web database application using MovieLens data with catalogue discovery, viewer sentiment analysis, rating prediction, personality analysis, and a curated planner. The final system implemented a normalised PostgreSQL schema, SQL-heavy catalogue and prediction queries, a Dockerised PostgreSQL/Express/React architecture, and an authenticated planner workflow.',
        contributions: [
          'Designed a normalised PostgreSQL database covering movie, genre, tag, crew, award, rating, personality, and planner entities.',
          'Used junction tables to support many-to-many relationships across catalogue and planner data.',
          'Implemented dynamic catalogue search and filtering by title, genre, language, year, tag, award, cast, director, IMDb score, and user rating.',
          'Developed SQL-backed reporting dashboards for genre popularity, rating polarisation, low-rater spillover, genre affinity, personality alignment, and predictive ratings.',
          'Built a similarity-based prediction workflow showing predicted mean rating, uncertainty band, preview panel size, distribution chart, and comparable titles.',
          'Added a cookie-authenticated curated collection planner with user login, list creation, and movie saving.'
        ]
      },
      tags: ['PostgreSQL', 'Node.js', 'Express', 'React', 'Docker'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Kev-in-AI/Project-V2' }
      ]
    },
    {
      id: 1,
      title: 'Bush Nest',
      description: 'This project successfully designed and built a comprehensive smart habitat prototype specifically engineered for a bush baby. The system creates a stable, stimulating, and hygienic environment by integrating multiple automated features.',
      fullDescription: {
        overview: 'This project successfully designed and built a comprehensive smart habitat prototype specifically engineered for a bush baby. The system creates a stable, stimulating, and hygienic environment by integrating multiple automated features. It actively regulates temperature and humidity, controls lighting with an automated curtain and light sensor, and includes a scheduled UV-C sterilisation cycle. To support the bush baby\'s health and activity, the habitat incorporates a smart feeder, a dynamo-based activity motor, and a camera for live remote viewing. An active noise cancellation system is integrated to minimise disruptive sounds, promoting a calmer atmosphere.',
        contributions: [
          'Designed and prototyped a dynamo-powered running wheel generating up to 30 V from bush baby motion; implemented rectification, supercapacitor storage, and voltage regulation to autonomously drive a UVC sterilization lamp.',
          'Single-handedly enabled wireless IoT connectivity by sourcing Wi-Fi-enabled Arduino boards and integrating with Arduino IoT Cloud; delivered a real-time mobile dashboard with remote control and live sensor monitoring.',
          'Led multiple sensor integrations and historical trend visualization into the IoT app, establishing the foundation for automated climate control, light control, and automated feeder in the smart bush baby habitat.',
          'Built an AI chatbot that helps with troubleshooting any product faults and helps with other questions pertaining to the Bush Baby (like grooming, diet and medical advice).'
        ]
      },
      tags: ['Arduino IOT Cloud', 'Electronic Design', 'C/C++', 'AI'],
      links: [
        { label: 'Report', url: 'https://drive.google.com/file/d/1-2YCW7CJUFlD_TO2CvSusXfh2nggz2P6/view?usp=sharing' },
        { label: 'Demo', url: 'https://drive.google.com/file/d/1LF02DD4LDhgayJVYx-0WMeinI6j8g9YJ/view?usp=drive_link' }
      ]
    },
    {
      id: 2,
      title: 'Reach Learning',
      description: 'Reach Learning is a mobile app developed during the Morgan Stanley Code to Give hackathon to support Project Reach, an initiative aimed at bridging the English proficiency gap for underprivileged K3 students in Hong Kong.',
      fullDescription: {
        overview: 'Reach Learning is a mobile app developed during the Morgan Stanley Code to Give hackathon to support Project Reach, an initiative aimed at bridging the English proficiency gap for underprivileged K3 kindergarten students in Hong Kong as they transition to primary school. \n\nThe app addresses fragmented access to learning resources and low parental engagement by providing a digital platform where parents can access structured materials (e.g., home learning booklets, videos, and exercises), connect in a safe community forum for sharing advice and doubts, track child progress through analytics dashboards, submit assignments via scanning, and earn tokens through gamification (e.g., badges, leaderboards, streaks) redeemable for incentives like stationery. It includes unique features such as an AI assistant for conversational explanations (supporting Cantonese and multilingual guides), integration with the existing Project Reach learning app for data collection, and parent-teacher chat functionality. \n\nThe goal is to empower parents, increase parent-child interaction (building on previous increases of 3,000 hours), reduce paper usage for environmental impact, and help break the cycle of poverty by fostering better educational outcomes, with a focus on data privacy and ease of use.',
      },
      tags: ['React', 'Database', 'AI/ML', 'Full Stack'],
      links: [
        { label: 'Pitch Deck', url: 'https://drive.google.com/file/d/1U70n5AGacX8tKwZf81J44ZLtV-zZnPkX/view?usp=drive_link' },
        { label: 'GitHub', url: 'https://github.com/Kev-in-AI/Morgan-Stanley-Code-to-Give' }
      ]
    },
    {
      id: 6,
      title: 'CathayGO',
      description: 'A React and Vite superapp concept for Cathay Pacific, reimagining Asia Miles as an everyday travel and lifestyle companion with booking, rewards, maps, and gamification.',
      fullDescription: {
        overview: 'CathayGO: The Cathay Pacific SuperApp was developed during the Cathay Hackathon 2024 in Nov 2024, where our team advanced to the finals. Built with React and Vite, the application reimagines the Cathay Pacific and Asia Miles ecosystem as an everyday lifestyle companion rather than just a travel rewards programme.\n\nThe platform combined flight booking, Asia Miles management, location-based partner discovery, and reward redemption into one seamless experience. A key highlight was the Asia Milestone gamification system, where users could explore destinations, discover Cathay partners through an interactive map, and unlock collectible rewards through NFC-based interactions.',
        contributions: [
          'Built a responsive and modern front-end application using React, Vite, and Tailwind CSS.',
          'Designed user flows that connected flight booking, Asia Miles tracking, partner discovery, and reward redemption.',
          'Contributed to the Asia Milestone gamification concept, turning travel engagement into collectible destination-based rewards.',
          'Helped create an engaging consumer experience that positioned Cathay as a lifestyle companion beyond flights.',
          'Presented the final concept as part of a finalist team at Cathay Hackathon 2024.'
        ]
      },
      tags: ['React', 'Vite', 'Tailwind CSS', 'Web Development', 'UX'],
      links: [
        { label: 'Product One Pager', url: 'https://drive.google.com/file/d/1IfoG07t1P1Tv7LJX5ozJg6EOOJBaBkW7/view?usp=sharing' },
        { label: 'GitHub', url: 'https://github.com/WhackyBoyg0d/CathayFinal' }
      ]
    },
    {
      id: 3,
      title: 'Hydrosort',
      description: 'A blueprint for an innovative smart waste management system tailored for World Connect, a global corporation committed to sustainability. Developed for the CityU Fintech x ESG Hackathon.',
      fullDescription: {
        overview: 'For the CityU Fintech x ESG Hackathon, my team created Hydrosort, a blueprint for an innovative smart waste management system tailored for World Connect, a global corporation committed to sustainability.\n\nWith landfills reaching capacity and manual sorting being inefficient, we designed automated dustbins that handle segregation effortlessly. These bins utilize density-based separation for wet/dry waste, electromagnets for metals, sensors for touchless operation, and CNN-based machine learning for over 98% accuracy in material recognition. The accompanying mobile app provides real-time waste statistics, remote control capabilities, community forums for eco-tips, and 24/7 support, all powered by solar energy with modular, easy-to-maintain designs.\n\nWe outlined a phased rollout starting with a pilot of 50 units, complete with maintenance plans and training. It\'s exciting to contribute to ESG goals by enhancing recycling rates, reducing environmental impact, and promoting greener habits in a practical way.',
      },
      tags: ['R&D', 'Engineering', 'App dev'],
      links: [
        { label: 'Pitch Deck', url: 'https://drive.google.com/file/d/1U70n5AGacX8tKwZf81J44ZLtV-zZnPkX/view?usp=drive_link' },
        { label: 'Blueprint', url: 'https://drive.google.com/file/d/1-Mqb_Yhrk5dd1kTquLmgtMHF2DAKKkxi/view?usp=drive_link' }
      ]
    },
    {
      id: 7,
      title: 'Portfolio Website',
      description: 'A cinematic React and Vite portfolio built as a full UI game, with interactive sections, a 3D robot companion, Gugu AI assistant, and Netlify deployment.',
      fullDescription: {
        overview: 'This portfolio website is a fully custom React and Vite project designed to turn my profile into an interactive UI experience rather than a static resume page. It combines a dark minimal visual system with cinematic sections for education, experience, projects, skills, awards, activities, contact, and Kevin in 5.\n\nThe site is deployed on Netlify and includes a serverless portfolio assistant named Gugu, backed by a guarded chat endpoint. The goal was simple: make the portfolio feel like a polished product, not just a page.',
        contributions: [
          'Designed and implemented a dark, minimal, responsive interface with section-specific visual treatments including the education passport, awards dashboard, project spotlight, and Kevin in 5.',
          'Built the React component architecture with reusable modal, accordion, spotlight, and interactive card patterns.',
          'Integrated Three.js for the animated navbar robot and tuned interaction behavior across desktop and mobile.',
          'Created Gugu, a portfolio-specific AI assistant using a Netlify Function backend with strict guardrails, recruitment-focused answers, and server-side API key handling.',
          'Prepared the codebase for Netlify deployment with redirects, serverless functions, environment-variable support, and production build checks.',
          'Iterated heavily on mobile responsiveness, content hierarchy, visual polish, and tiny UI details because the whole thing is absolutely a UI game.'
        ]
      },
      tags: ['React', 'Vite', 'Netlify', 'Three.js', 'AI Assistant'],
      links: [
        { label: 'Live Site', url: 'https://kevinmanickamprofile.netlify.app' },
        { label: 'GitHub', url: 'https://github.com/Kev-in-AI/Portfolio_Website_latest' }
      ]
    },
  ]

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const closeModal = () => setSelectedProject(null)
  const activeProject = projects[activeProjectIndex]

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects-container">
        <div className="projects-header">
          <span className="section-label">Projects</span>
        </div>
        
        <div className="project-command-deck">
          <div className="project-spotlight">
            <div className="project-spotlight-topline">
              <span className="project-number">0{activeProjectIndex + 1}</span>
            </div>
            <h3 className="project-title">{activeProject.title}</h3>
            <p className="project-description">{activeProject.description}</p>
            <div className="project-tags">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
            <button className="project-link" onClick={() => setSelectedProject(activeProject)}>
              Open Project →
            </button>
          </div>

          <div className="project-selector" aria-label="Project selector">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={`project-selector-item ${activeProjectIndex === index ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.06}s` }}
                onMouseEnter={() => setActiveProjectIndex(index)}
                onFocus={() => setActiveProjectIndex(index)}
                onClick={() => {
                  setActiveProjectIndex(index)
                  setSelectedProject(project)
                }}
              >
                <span className="selector-number">0{index + 1}</span>
                <span className="selector-copy">
                  <strong>{project.title}</strong>
                  <span>{project.tags.slice(0, 2).join(' / ')}</span>
                </span>
                <span className="selector-arrow">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && createPortal(
        <div className="project-modal-overlay" onClick={closeModal}>
          <button className="project-modal-close" onClick={closeModal} aria-label="Close project details">&times;</button>
          <div className="project-modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="project-modal-heading">
              <span className="project-modal-kicker">Project Details</span>
              <h2>{selectedProject.title}</h2>
              <div className="project-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="project-modal-section">
              <h4 className="project-modal-section-title">Overview</h4>
              <p className="project-modal-text">{selectedProject.fullDescription.overview}</p>
            </div>

            {selectedProject.fullDescription.contributions && (
              <div className="project-modal-section">
                <h4 className="project-modal-section-title">Personal Contributions</h4>
                <ul className="project-modal-list">
                  {selectedProject.fullDescription.contributions.map((contribution, idx) => (
                    <li key={idx}>{contribution}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.links && selectedProject.links.length > 0 && (
              <div className="project-modal-footer">
                <span>Links</span>
                <div className="modal-links-grid">
                  {selectedProject.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link-btn"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Projects
