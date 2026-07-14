'use client'

import Reveal from '../components/Reveal'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

export default function CapacidadesPage() {
  const { t } = useLanguage()
  const cap = t.capacidades

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--red)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--red)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>{cap.tag}</span>
            </div>
            <h1 style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '32px',
            }}>
              {cap.heroTitle1}<br />
              <span style={{ color: 'var(--red)' }}>{cap.heroAccent}</span><br />
              {cap.heroTitle2}
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px' }}>
              {cap.heroBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Capabilities detail */}
      {cap.items.map((item, i) => (
        <section key={item.num} style={{
          padding: '100px 0',
          background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)',
          borderTop: '1px solid var(--border)',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }} className="grid-2">
              <Reveal>
                <div style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 800,
                  fontSize: '120px',
                  lineHeight: 1,
                  color: 'rgba(224,41,7,0.1)',
                  letterSpacing: '-0.04em',
                }}>{item.num}</div>
                <div style={{ marginTop: '-24px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.subtitle}</span>
                </div>
              </Reveal>

              <Reveal delay={0.15} direction="left">
                <h2 style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: '24px',
                }}>{item.title}</h2>
                <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '40px' }}>{item.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px', marginBottom: '32px' }}>
                  {item.capabilities.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '6px', height: '6px', background: 'var(--red)', flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{c}</span>
                    </div>
                  ))}
                </div>
                <Link href={item.href} style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {cap.seeMore} {item.title} →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: '120px 0', background: 'var(--red)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '32px',
              whiteSpace: 'pre-line',
            }}>
              {cap.ctaTitle}
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px' }}>
              {cap.ctaBody}
            </p>
            <Link href="/contacto" style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#fff',
              color: 'var(--red)',
              padding: '20px 48px',
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {cap.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
