import { useRef, useEffect, useState } from 'react'
import './Projects.css'

const Projects = () => {
  const projectsRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

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

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects-container">
        <div className="projects-header">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Work</h2>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card project-card-${index + 1}`} 
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-number">0{index + 1}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              <button className="project-link">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-scroll-area">
              <div className="modal-section">
                <h4 className="modal-section-title">Overview</h4>
                <p className="modal-text">{selectedProject.fullDescription.overview}</p>
              </div>

              {selectedProject.fullDescription.contributions && (
                <div className="modal-section">
                  <h4 className="modal-section-title">Personal Contributions</h4>
                  <ul className="modal-list">
                    {selectedProject.fullDescription.contributions.map((contribution, idx) => (
                      <li key={idx} className="modal-list-item">{contribution}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.links && selectedProject.links.length > 0 && (
                <div className="modal-section">
                  <h4 className="modal-section-title">Links</h4>
                  <div className="modal-links-grid">
                    {selectedProject.links.map((link, idx) => (
                      <a 
                        key={idx} 
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

              <div className="modal-section">
                <h4 className="modal-section-title">Technologies</h4>
                <div className="project-tags">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
