'use client'

import { useRef, useSyncExternalStore } from 'react'
import { animate, motion, useMotionValue, useMotionTemplate } from 'framer-motion'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const liftSpring = { type: 'spring' as const, stiffness: 300, damping: 30, mass: 1 }

function subscribeHoverCapable(callback: () => void) {
  const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}
function getHoverCapableSnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
function getHoverCapableServerSnapshot() {
  return false
}

export default function SpotlightCard({ children, className = '', style }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hoverCapable = useSyncExternalStore(subscribeHoverCapable, getHoverCapableSnapshot, getHoverCapableServerSnapshot)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowOpacity = useMotionValue(0)

  const spotX = useMotionTemplate`${mouseX}px`
  const spotY = useMotionTemplate`${mouseY}px`

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      className="spotlight-card"
      style={{ '--spot-x': spotX, '--spot-y': spotY } as React.CSSProperties}
      onPointerMove={hoverCapable ? handlePointerMove : undefined}
      onPointerEnter={hoverCapable ? () => animate(glowOpacity, 1, { duration: 0.25, ease: 'easeOut' }) : undefined}
      onPointerLeave={hoverCapable ? () => animate(glowOpacity, 0, { duration: 0.4, ease: 'easeOut' }) : undefined}
      whileHover={hoverCapable ? {
        y: -8,
        scale: 1.02,
        boxShadow: '0 30px 70px rgba(0,0,0,0.16)',
      } : undefined}
      whileTap={{ scale: 0.99 }}
      transition={liftSpring}
    >
      <motion.div
        className={`spotlight-halo ${hoverCapable ? '' : 'spotlight-halo--touch'}`}
        style={{ opacity: glowOpacity }}
      />
      <div className={`spotlight-surface ${className}`} style={style}>
        <div className="spotlight-content">{children}</div>
      </div>
    </motion.div>
  )
}
