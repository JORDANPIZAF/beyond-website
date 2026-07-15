'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NavPill from './NavPill'
import ContactButton from './ContactButton'
import MobileNav from './MobileNav'

const showSpring = { type: 'spring' as const, stiffness: 110, damping: 14, mass: 1.5 }
const hideSpring = { type: 'spring' as const, stiffness: 280, damping: 28 }
// Easing puro, sin spring: evita cualquier rebote/tirón en la caída inicial
const dropTransition = { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

export default function FloatingNav() {
  const lastY = useRef(0)
  const [visible, setVisible] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const fn = () => {
      const current = window.scrollY
      const diff = current - lastY.current
      lastY.current = current
      if (current < 80) { setVisible(true); clearTimeout(timer); return }
      if (diff > 4) setVisible(false)
      else if (diff < -4) setVisible(true)
      clearTimeout(timer)
      timer = setTimeout(() => setVisible(true), 700)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => { window.removeEventListener('scroll', fn); clearTimeout(timer) }
  }, [])

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.94 }}
      transition={hasEntered ? (visible ? showSpring : hideSpring) : dropTransition}
      onAnimationComplete={() => {
        if (hasEntered) return
        setHasEntered(true)
        // Pequeña pausa antes de expandir para que la caída se sienta terminada, no interrumpida
        setTimeout(() => setExpanded(true), 180)
      }}
      style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 100, pointerEvents: 'none' }}
    >
      {/* Desktop */}
      <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
        <NavPill expanded={expanded} />
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26, delay: 0.25 }}
          >
            <ContactButton />
          </motion.div>
        )}
      </div>

      {/* Mobile */}
      <div className="show-mobile" style={{ padding: '0 16px', pointerEvents: 'auto' }}>
        <MobileNav />
      </div>
    </motion.div>
  )
}
