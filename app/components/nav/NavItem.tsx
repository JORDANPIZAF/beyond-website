'use client'

import { forwardRef } from 'react'
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

const NavItem = forwardRef<HTMLAnchorElement, Props>(function NavItem(
  { href, label, Icon, isActive, isHovered, onHover, onLeave },
  ref
) {
  const showText = isHovered || isActive
  const isRed    = isActive || isHovered

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '11px 15px',
        borderRadius: 999,
        textDecoration: 'none',
        zIndex: 1,
        outline: 'none',
      }}
    >
      {/* Icon */}
      <span style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: isRed ? 'var(--red)' : 'var(--text-muted)',
        transition: 'color 0.32s ease',
      }}>
        <Icon size={21} strokeWidth={1.6} />
      </span>

      {/* Expandable label */}
      <motion.span
        animate={{ maxWidth: showText ? 197 : 0, opacity: showText ? 1 : 0, marginLeft: showText ? 8 : 0 }}
        transition={textTransition}
        style={{
          maxWidth: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          fontSize: 16,
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
})

export default NavItem
