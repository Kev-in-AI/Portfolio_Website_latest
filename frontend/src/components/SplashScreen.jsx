import { useState, useEffect } from 'react'
import { useTypingAnimation } from '../hooks/useTypingAnimation'
import './SplashScreen.css'

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const { displayedText: typingText } = useTypingAnimation('JOHN KENNEDY', 60, 300)

  useEffect(() => {
    // Start fade out after typing completes and a short delay
    // "JOHN KENNEDY" typing takes ~1.2s (12 chars * 60ms) + 300ms delay = 1.5s
    // Add 1.5s more for display, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Call onComplete after fade out animation completes
      setTimeout(() => {
        onComplete()
      }, 800)
    }, 3000) // Total duration: ~3 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-name-secondary">
          {typingText}
          <span className="typing-cursor">|</span>
        </div>
        <h1 className="splash-name-primary">Kevin Manickam</h1>
      </div>
    </div>
  )
}

export default SplashScreen
