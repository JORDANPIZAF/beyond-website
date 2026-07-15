'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X, Tag } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const glass = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.65)',
  boxShadow: '0 6px 28px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
} as const

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const close = () => setIsOpen(false)

  const navLinks = [
    { href: '/',            label: t.nav.home         },
    { href: '/nosotros',    label: t.nav.about        },
    { href: '/capacidades', label: t.nav.capabilities },
    { href: '/proyectos',   label: t.nav.projects     },
    { href: '/blog',        label: t.nav.blog         },
    { href: '/contacto',    label: t.nav.contact      },
  ]

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4px',
      }}>
        {/* Logo pill — left */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 18px', borderRadius: 999, ...glass }}>
          <Link href="/" onClick={close} style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/images/logo/logo.webp"
              alt="Beyond"
              width={97}
              height={27}
              style={{ height: 26, width: 'auto', objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>

        {/* Menu button — right */}
        <motion.button
          onClick={() => setIsOpen(o => !o)}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text)',
            flexShrink: 0,
            ...glass,
          }}
          aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex' }}
              >
                <X size={20} strokeWidth={1.6} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex' }}
              >
                <Menu size={20} strokeWidth={1.6} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Full-screen overlay — expands from menu button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 42px) 42px)' }}
            animate={{ clipPath: 'circle(160% at calc(100% - 42px) 42px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 42px) 42px)' }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#fff',
              zIndex: 98,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {navLinks.map((link, i) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 800,
                      fontSize: 'clamp(34px, 9vw, 56px)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                      textDecoration: 'none',
                      color: isActive ? 'var(--red)' : 'var(--text)',
                      padding: '10px 28px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + navLinks.length * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 20 }}
            >
              <Link
                href="/contacto"
                onClick={close}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 999,
                  background: 'var(--red)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: '0.01em',
                }}
              >
                <Tag size={18} strokeWidth={1.6} />
                {t.nav.quote}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
