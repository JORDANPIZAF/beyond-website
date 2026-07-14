'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function ContactButton() {
  const { scrollY } = useScroll()
  const bgOpacity   = useTransform(scrollY, [0, 120], [0.65, 0.90])
  const blurPx      = useTransform(scrollY, [0, 120], [32, 48])
  const shadowAlpha = useTransform(scrollY, [0, 120], [0.07, 0.15])

  const background     = useMotionTemplate`rgba(255,255,255,${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(200%)`
  const outerShadow    = useMotionTemplate`0 8px 32px rgba(0,0,0,${shadowAlpha}), 0 2px 8px rgba(0,0,0,0.04)`

  return (
    <motion.div
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ position: 'relative', width: 52, height: 52, borderRadius: 999, flexShrink: 0 }}
    >
      {/* Frosted glass base */}
      <motion.span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        background,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        border: '0.5px solid rgba(255,255,255,0.75)',
        boxShadow: outerShadow,
      }} />

      {/* Inner shadow edges */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        boxShadow: '0 -1px 0 rgba(0,0,0,0.06) inset',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Link */}
      <Link
        href="/contacto"
        title="Contacto"
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          borderRadius: 999,
          transition: 'color 0.32s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <Mail size={18} strokeWidth={1.6} />
      </Link>
    </motion.div>
  )
}
