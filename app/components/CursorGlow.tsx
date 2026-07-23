'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      el.style.opacity = '1'
    }
    const handleLeave = () => { el.style.opacity = '0' }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hide-mobile"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '360px',
        height: '360px',
        marginLeft: '-180px',
        marginTop: '-180px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(178,132,60,0.14) 0%, rgba(178,132,60,0.05) 45%, transparent 72%)',
        filter: 'blur(18px)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transition: 'transform 0.12s ease-out, opacity 0.3s ease',
      }}
    />
  )
}
