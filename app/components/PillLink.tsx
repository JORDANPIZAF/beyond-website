'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

const textTransition = {
  maxWidth:   { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  marginLeft: { type: 'spring' as const, stiffness: 90, damping: 15, mass: 1.6 },
  opacity:    { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
}

interface PillLinkProps {
  href: string
  label: string
  Icon: LucideIcon
}

export default function PillLink({ href, label, Icon }: PillLinkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = inView || isHovered

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ position: 'relative', height: 44, borderRadius: 999, flexShrink: 0 }}
    >
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        background: 'var(--red)',
        boxShadow: '0 8px 20px rgba(224,41,7,0.3)',
      }} />
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        boxShadow: '0 -1px 0 rgba(0,0,0,0.12) inset',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', alignItems: 'center',
          padding: '0 14px',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: 999,
          whiteSpace: 'nowrap',
        }}
      >
        <Icon size={18} strokeWidth={1.8} />
        <motion.span
          animate={{ maxWidth: isExpanded ? 260 : 0, opacity: isExpanded ? 1 : 0, marginLeft: isExpanded ? 8 : 0 }}
          transition={textTransition}
          style={{
            maxWidth: 0,
            overflow: 'hidden',
            display: 'inline-block',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  )
}
