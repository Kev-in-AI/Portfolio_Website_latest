import { useEffect, useRef } from 'react'

const LERP = 0.08
const MAX_SHIFT = 10

export function useCursorReactiveDots() {
  const current = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = -(e.clientY / window.innerHeight - 0.5) * 2
      target.current.x = x * MAX_SHIFT
      target.current.y = y * MAX_SHIFT
    }

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      document.body.style.setProperty('--mouse-x', `${current.current.x}px`)
      document.body.style.setProperty('--mouse-y', `${current.current.y}px`)
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouse)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])
}
