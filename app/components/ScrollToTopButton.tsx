'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const [onRedSection, setOnRedSection] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const redSection = document.getElementById('cta-red-section')
    if (!redSection) return
    const observer = new IntersectionObserver(
      ([entry]) => setOnRedSection(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(redSection)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 90,
            width: '52px',
            height: '52px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: onRedSection ? '#fff' : 'var(--red)',
            color: onRedSection ? 'var(--red)' : '#fff',
            boxShadow: onRedSection ? '0 8px 24px rgba(0,0,0,0.2)' : '0 8px 24px rgba(224,41,7,0.35)',
            transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <ArrowUp size={22} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
