import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = x - 5 + 'px'
        dotRef.current.style.top  = y - 5 + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = x - 20 + 'px'
        ringRef.current.style.top  = y - 20 + 'px'
      }
      if (glowRef.current) {
        glowRef.current.style.left = x - 250 + 'px'
        glowRef.current.style.top  = y - 250 + 'px'
      }
    }

    const onEnter = () => ringRef.current && ringRef.current.classList.add('big')
    const onLeave = () => ringRef.current && ringRef.current.classList.remove('big')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('button, a, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  )
}
