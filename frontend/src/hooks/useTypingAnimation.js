import { useState, useEffect } from 'react'

export const useTypingAnimation = (text, speed = 100, delay = 0) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeoutId
    
    const startTyping = () => {
      let currentIndex = 0
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
          timeoutId = setTimeout(typeNextChar, speed)
        } else {
          setIsTyping(false)
        }
      }
      
      // Start typing after delay
      timeoutId = setTimeout(typeNextChar, delay)
    }
    
    startTyping()
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [text, speed, delay])

  return { displayedText, isTyping }
}
