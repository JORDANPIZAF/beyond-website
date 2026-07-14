'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface Props {
  href: string
  label: string
  Icon: LucideIcon
  isActive: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

// width/margin get spring (elastic), opacity gets ease (springs on opacity look jittery)
const textTransition = {
  maxWidth:   { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  marginLeft: { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  opacity:    { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

export default function NavItem({ href, label, Icon, isActive, isHovered, onHover, onLeave }: Props) {
  const showText = isHovered || isActive
  const isRed    = isActive || isHovered

  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 14px',
        borderRadius: 999,
        textDecoration: 'none',
        zIndex: 1,
        outline: 'none',
      }}
    >
      {/* Liquid highlight — slow spring (mass: 2) makes it feel like a fluid blob sliding */}
      {isHovered && (
        <motion.span
          layoutId="nav-highlight"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            background: 'rgba(224,41,7,0.07)',
          }}
          transition={{ type: 'spring', stiffness: 65, damping: 14, mass: 2 }}
        />
      )}

      {/* Icon */}
      <span style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: isRed ? 'var(--red)' : 'var(--text-muted)',
        transition: 'color 0.32s ease',
      }}>
        <Icon size={19} strokeWidth={1.6} />
      </span>

      {/* Expandable label */}
      <motion.span
        animate={{ maxWidth: showText ? 180 : 0, opacity: showText ? 1 : 0, marginLeft: showText ? 7 : 0 }}
        transition={textTransition}
        style={{
          maxWidth: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          fontSize: 15,
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontWeight: 700,
          letterSpacing: '0.01em',
          color: isRed ? 'var(--red)' : 'var(--text-muted)',
          transition: 'color 0.32s ease',
          position: 'relative',
        }}
      >
        {label}
      </motion.span>
    </Link>
  )
}
