'use client'

import Link from 'next/link'
import Image from 'next/image'
import FooterMap from './FooterMap'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../i18n/translations'

function LangToggle() {
  const { lang, setLang } = useLanguage()

  const toggle = (l: Lang) => setLang(l)

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border)',
      borderRadius: '999px',
      overflow: 'hidden',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.08em',
    }}>
      {(['es', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => toggle(l)}
          style={{
            background: lang === l ? 'var(--red)' : 'transparent',
            color: lang === l ? '#fff' : 'var(--text-muted)',
            border: 'none',
            padding: '7px 14px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'background 0.2s, color 0.2s',
            fontFamily: 'var(--font-figtree), sans-serif',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      color: 'var(--text)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '520px' }}>

        {/* ── Left: text content ── */}
        <div style={{
          flex: '0 0 52%',
          padding: '80px max(40px, calc((100vw - 1320px)/2 + 48px)) 40px max(40px, calc((100vw - 1320px)/2 + 48px))',
          paddingRight: '48px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '48px', marginBottom: '64px' }}>
            <div>
              <Image src="/images/logo/logo.webp" alt="Beyond SAS" width={120} height={35} style={{ objectFit: 'contain', height: '32px', width: 'auto', marginBottom: '20px' }} />
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '220px' }}>
                {f.tagline}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>{f.company}</p>
              {f.companyLinks.map(item => (
                <div key={item.label} style={{ marginBottom: '12px' }}>
                  <Link href={item.href} className="footer-link">{item.label}</Link>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>{f.capabilitiesTitle}</p>
              {f.capabilitiesLinks.map(s => (
                <div key={s} style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{s}</span>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>{f.contactTitle}</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px' }}>director.comercial@beyondgroup.co</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px' }}>(601) 390 44 15</p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>Bogotá, Colombia</p>
              <Link href="/contacto" className="btn-primary" style={{ fontSize: '12px', padding: '10px 24px' }}>
                {f.startProject}
              </Link>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} {f.copyright}</p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/terminos" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>{f.terms}</Link>
              <Link href="/privacidad" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>{f.privacy}</Link>
              <LangToggle />
            </div>
          </div>
        </div>

        {/* ── Right: map ── */}
        <div className="hide-mobile" style={{ flex: '0 0 48%', position: 'relative', overflow: 'hidden' }}>
          <FooterMap />
        </div>

      </div>
    </footer>
  )
}
