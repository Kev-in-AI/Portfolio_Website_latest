import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { useCursorReactiveDots } from './hooks/useCursorReactiveDots'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Education from './components/Education'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Contact from './components/Contact'
import './App.css'

function AppContent() {
  const [showSplash, setShowSplash] = useState(true)
  useCursorReactiveDots()

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <div className="app">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <>
          <ScrollProgress />
          <Navbar />
          <main className="main-content">
            <Hero />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Awards />
            <Contact />
          </main>
        </>
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
