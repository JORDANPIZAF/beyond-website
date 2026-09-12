'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const WHATSAPP_LINK = 'https://wa.link/2ijodt'
const WHATSAPP_NUMBER = '+57 318 7757985'

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .105 5.335.102 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.446h.006c6.585 0 11.943-5.335 11.946-11.893 0-3.176-1.24-6.165-3.475-8.412M12.05 21.785h-.005a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.85 9.85 0 0 1-1.51-5.26c.002-5.448 4.437-9.883 9.889-9.883 2.64 0 5.122 1.03 6.988 2.898a9.822 9.822 0 0 1 2.893 6.994c-.003 5.448-4.437 9.884-9.885 9.884" />
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  )
}

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
              src="/images/logo/beyond-logo.svg"
              alt="Beyond"
              width={97}
              height={32}
              style={{ height: 24, width: 'auto', objectFit: 'contain' }}
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
                      color: isActive ? 'var(--accent)' : 'var(--text)',
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
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
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
                <WhatsAppIcon size={18} />
                {WHATSAPP_NUMBER}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
