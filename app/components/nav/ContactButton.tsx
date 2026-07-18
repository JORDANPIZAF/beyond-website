'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

// width/margin get spring (elastic), opacity gets ease (springs on opacity look jittery)
const textTransition = {
  maxWidth:   { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  marginLeft: { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  opacity:    { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

export default function ContactButton() {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Enters as a plain circle, then blooms into a pill on its own shortly after —
  // matches the entrance timing of the nav pill next to it (fade-in delay 0.25s).
  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 700)
    return () => clearTimeout(timer)
  }, [])

  const showText = isExpanded || isHovered

  return (
    <motion.div
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ position: 'relative', height: 57, borderRadius: 999, flexShrink: 0 }}
    >
      {/* Solid red base */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        background: 'var(--red)',
        boxShadow: '0 8px 24px rgba(224,41,7,0.35)',
      }} />

      {/* Inner shadow edges */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        boxShadow: '0 -1px 0 rgba(0,0,0,0.12) inset',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Link */}
      <Link
        href="/contacto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', alignItems: 'center',
          padding: '0 19px',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 999,
          whiteSpace: 'nowrap',
        }}
      >
        <Tag size={20} strokeWidth={1.6} />
        <motion.span
          animate={{ maxWidth: showText ? 160 : 0, opacity: showText ? 1 : 0, marginLeft: showText ? 8 : 0 }}
          transition={textTransition}
          style={{
            maxWidth: 0,
            overflow: 'hidden',
            display: 'inline-block',
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.01em',
          }}
        >
          {t.nav.quote}
        </motion.span>
      </Link>
    </motion.div>
  )
}
