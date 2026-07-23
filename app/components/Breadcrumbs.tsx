'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'

function humanize(slug: string) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const segments = pathname.split('/').filter(Boolean)

  const hasFullBleedHero =
    (segments[0] === 'proyectos' || segments[0] === 'blog') && segments.length > 1

  if (pathname === '/' || hasFullBleedHero) return null

  const labelFor = (segment: string): string => {
    switch (segment) {
      case 'nosotros': return t.nav.about
      case 'capacidades': return t.nav.capabilities
      case 'proyectos': return t.nav.projects
      case 'blog': return t.nav.blog
      case 'contacto': return t.nav.contact
      default: return humanize(segment)
    }
  }

  const crumbs = [
    { href: '/', label: t.nav.home },
    ...segments.map((segment, i) => ({
      href: '/' + segments.slice(0, i + 1).join('/'),
      label: labelFor(segment),
    })),
  ]

  return (
    <nav aria-label="breadcrumb" style={{
      position: 'absolute',
      top: '118px',
      left: 0,
      right: 0,
      zIndex: 10,
      background: 'var(--accent)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '10px 32px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span style={{ color: '#fff', opacity: 0.5 }}>/</span>}
              {isLast ? (
                <span style={{ color: '#fff' }}>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="breadcrumb-link" style={{ color: '#fff', opacity: 0.75, textDecoration: 'none' }}>
                  {crumb.label}
                </Link>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}
