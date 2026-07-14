'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { House, Building2, Layers, Briefcase, BookOpen } from 'lucide-react'
import NavItem from './NavItem'
import { useLanguage } from '../../context/LanguageContext'

export default function NavPill() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const navLinks = [
    { href: '/',            label: t.nav.home,         Icon: House     },
    { href: '/nosotros',    label: t.nav.about,        Icon: Building2 },
    { href: '/capacidades', label: t.nav.capabilities, Icon: Layers    },
    { href: '/proyectos',   label: t.nav.projects,     Icon: Briefcase },
    { href: '/blog',        label: t.nav.blog,         Icon: BookOpen  },
  ]

  const { scrollY } = useScroll()
  const bgOpacity   = useTransform(scrollY, [0, 120], [0.65, 0.90])
  const blurPx      = useTransform(scrollY, [0, 120], [32, 48])
  const shadowAlpha = useTransform(scrollY, [0, 120], [0.07, 0.15])

  const background     = useMotionTemplate`rgba(255,255,255,${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(200%)`
  const outerShadow    = useMotionTemplate`0 8px 32px rgba(0,0,0,${shadowAlpha}), 0 2px 8px rgba(0,0,0,0.04)`

  const handleHover = (href: string) => { clearTimeout(leaveTimer.current); setHoveredHref(href) }
  const handleLeave = () => { leaveTimer.current = setTimeout(() => setHoveredHref(null), 120) }

  return (
    <motion.div
      layout="size"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '9px 10px 9px 20px',
        borderRadius: 999,
      }}
      transition={{ layout: { type: 'spring', stiffness: 100, damping: 18, mass: 1.4 } }}
    >
      {/* ── Liquid Glass layers ── */}

      {/* 1. Frosted glass base */}
      <motion.span
        style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          border: '0.5px solid rgba(255,255,255,0.75)',
          boxShadow: outerShadow,
        }}
      />

      {/* 3. Bottom inner shadow */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 999,
        boxShadow: '0 -1px 0 rgba(0,0,0,0.06) inset',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Content ── */}

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 10, flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <Image src="/images/logo/logo.webp" alt="Beyond" width={97} height={27} style={{ height: 26, width: 'auto', objectFit: 'contain' }} priority />
      </Link>

      {/* Separator */}
      <span style={{ width: 1, height: 22, background: 'var(--border)', flexShrink: 0, marginRight: 4, position: 'relative', zIndex: 2 }} />

      {/* Nav items */}
      {navLinks.map(({ href, label, Icon }) => (
        <NavItem
          key={href}
          href={href}
          label={label}
          Icon={Icon}
          isActive={pathname === href || (href !== '/' && pathname.startsWith(href))}
          isHovered={hoveredHref === href}
          onHover={() => handleHover(href)}
          onLeave={handleLeave}
        />
      ))}
    </motion.div>
  )
}
