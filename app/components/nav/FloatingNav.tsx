'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NavPill from './NavPill'
import ContactButton from './ContactButton'
import MobileNav from './MobileNav'

const showSpring = { type: 'spring' as const, stiffness: 110, damping: 14, mass: 1.5 }
const hideSpring = { type: 'spring' as const, stiffness: 280, damping: 28 }

export default function FloatingNav() {
  const { scrollY } = { scrollY: { on: (_: string, cb: (v: number) => void) => { return () => {} } } }
  const lastY = useRef(0)
  const [visible, setVisible] = useState(true)

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
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0, scale: visible ? 1 : 0.94 }}
      transition={visible ? showSpring : hideSpring}
      style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 100, pointerEvents: 'none' }}
    >
      {/* Desktop */}
      <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
        <NavPill />
        <ContactButton />
      </div>

      {/* Mobile */}
      <div className="show-mobile" style={{ padding: '0 16px', pointerEvents: 'auto' }}>
        <MobileNav />
      </div>
    </motion.div>
  )
}
