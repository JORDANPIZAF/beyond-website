'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { House, Building2, Layers, Briefcase, BookOpen, Mail } from 'lucide-react'
import NavItem from './NavItem'
import { useLanguage } from '../../context/LanguageContext'

interface HighlightRect { left: number; top: number; width: number; height: number }

interface NavPillProps {
  expanded: boolean
}

export default function NavPill({ expanded }: NavPillProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [highlightRect, setHighlightRect] = useState<HighlightRect | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const itemsRef = useRef<HTMLDivElement>(null)
  const [itemsWidth, setItemsWidth] = useState(0)
  const [settled, setSettled] = useState(false)

  // Mide el ancho natural del contenido de forma continua (no una sola vez):
  // cualquier etiqueta que se expanda/colapse por hover cambia el scrollWidth,
  // y el recorte de abajo lo sigue en tiempo real — nunca queda un texto afuera.
  useEffect(() => {
    const el = itemsRef.current
    if (!el) return
    const measure = () => setItemsWidth(el.scrollWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const navLinks = [
    { href: '/',            label: t.nav.home,         Icon: House     },
    { href: '/nosotros',    label: t.nav.about,        Icon: Building2 },
    { href: '/capacidades', label: t.nav.capabilities, Icon: Layers    },
    { href: '/proyectos',   label: t.nav.projects,     Icon: Briefcase },
    { href: '/blog',        label: t.nav.blog,         Icon: BookOpen  },
    { href: '/contacto',    label: t.nav.contact,      Icon: Mail      },
  ]

  const { scrollY } = useScroll()
  const bgOpacity   = useTransform(scrollY, [0, 120], [0.65, 0.90])
  const blurPx      = useTransform(scrollY, [0, 120], [32, 48])
  const shadowAlpha = useTransform(scrollY, [0, 120], [0.07, 0.15])

  const background     = useMotionTemplate`rgba(255,255,255,${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(200%)`
  const outerShadow    = useMotionTemplate`0 8px 32px rgba(0,0,0,${shadowAlpha}), 0 2px 8px rgba(0,0,0,0.04)`

  const handleHover = (href: string) => {
    clearTimeout(leaveTimer.current)
    setHoveredHref(href)
    const el = itemRefs.current[href]
    if (el) {
      setHighlightRect({ left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight })
    }
  }
  const handleLeave = () => { leaveTimer.current = setTimeout(() => setHoveredHref(null), 120) }

  const pillItems = (
    <>
      {/* Separator */}
      <span style={{ width: 3, height: 30, borderRadius: 999, background: 'var(--border)', flexShrink: 0, marginRight: 5, position: 'relative', zIndex: 2 }} />

      {/* Liquid highlight — one persistent element that glides to whichever item is hovered */}
      <motion.span
        animate={{
          left: highlightRect?.left ?? 0,
          top: highlightRect?.top ?? 0,
          width: highlightRect?.width ?? 0,
          height: highlightRect?.height ?? 0,
          opacity: hoveredHref ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.18 } }}
        style={{
          position: 'absolute',
          borderRadius: 999,
          background: 'rgba(224,41,7,0.07)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Nav items */}
      {navLinks.map(({ href, label, Icon }) => (
        <NavItem
          key={href}
          ref={(el) => { itemRefs.current[href] = el }}
          href={href}
          label={label}
          Icon={Icon}
          isActive={pathname === href || (href !== '/' && pathname.startsWith(href))}
          isHovered={hoveredHref === href}
          onHover={() => handleHover(href)}
          onLeave={handleLeave}
        />
      ))}
    </>
  )

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '10px 11px 10px 22px',
        borderRadius: 999,
      }}
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
      <Link href="/" style={{ display: 'flex', alignItems: 'center', marginRight: 11, flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <Image src="/images/logo/logo.webp" alt="Beyond" width={97} height={27} style={{ height: 38, width: 'auto', objectFit: 'contain' }} priority />
      </Link>

      {/* Recorte que sigue el ancho real del contenido en todo momento — nunca se
          desmonta ni cambia de modo, solo varía la velocidad del spring: lenta en
          la entrada, rápida para no quedarse atrás cuando el hover expande un texto */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: expanded ? itemsWidth : 0 }}
        transition={settled
          ? { type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }
          : { type: 'spring', stiffness: 85, damping: 22, mass: 1.3 }}
        onAnimationComplete={() => { if (expanded && !settled) setSettled(true) }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={itemsRef} style={{ display: 'flex', alignItems: 'center', gap: 2, width: 'max-content' }}>
          {pillItems}
        </div>
      </motion.div>
    </div>
  )
}
