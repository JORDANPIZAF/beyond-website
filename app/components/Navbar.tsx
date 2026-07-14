'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/capacidades', label: 'Capacidades' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src="/images/logo/logo.webp"
              alt="Beyond SAS"
              width={140}
              height={40}
              style={{ objectFit: 'contain', height: '36px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                textDecoration: 'none',
                fontSize: '13px', fontWeight: 500,
                letterSpacing: '0.04em',
                color: pathname === l.href ? 'var(--text)' : 'var(--text-muted)',
                transition: 'color 0.2s',
                position: 'relative',
              }}>
                {l.label}
                {pathname === l.href && (
                  <span style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '1.5px', background: 'var(--red)' }} />
                )}
              </Link>
            ))}
            <Link href="/contacto" className="btn-primary" style={{ padding: '10px 24px', fontSize: '12px' }}>
              Iniciar Proyecto →
            </Link>
          </nav>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text)', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text)', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text)', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: '76px', left: 0, right: 0, bottom: 0,
              background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)',
              zIndex: 99,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px',
            }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={l.href} style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-barlow)', fontWeight: 700,
                  fontSize: '40px', letterSpacing: '0.02em', textTransform: 'uppercase',
                  color: pathname === l.href ? 'var(--red)' : 'var(--text)',
                }}>{l.label}</Link>
              </motion.div>
            ))}
            <Link href="/contacto" className="btn-primary">Iniciar Proyecto →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
