'use client'

import { Fragment } from 'react'
import Reveal from '../components/Reveal'
import Link from 'next/link'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'
import CountUp from '../components/CountUp'
import ProcessRotator from '../components/ProcessRotator'
import LogoRotator from '../components/LogoRotator'
import { useLanguage } from '../context/LanguageContext'
import { PenTool, Layers, Factory, ShieldCheck, Wrench, Truck, Check, Calendar, MapPin, Building2, Clock, Package } from 'lucide-react'
import FooterMap from '../components/FooterMap'

const processIcons = [PenTool, Layers, Factory, ShieldCheck, Wrench, Truck]
const statsIcons = [Calendar, MapPin, Building2, Factory, Clock, Package, Layers]

const clientLogos = [
  { name: 'Samsung', file: 'SAMSUNG - BEYOND.webp' },
  { name: 'Apple', file: 'APPLE - BEYOND.webp' },
  { name: 'LG', file: 'LG - BEYOND.webp' },
  { name: 'AMD', file: 'AMD - BEYOND.webp' },
  { name: 'Microsoft', file: 'microsoft.webp' },
  { name: 'TCL', file: 'TCL---BEYOND.webp' },
  { name: 'Nestlé', file: 'NESTLE- BEYOND.webp' },
  { name: 'Aldo', file: 'aldo.webp' },
  { name: 'Olímpica', file: 'OLIMPICA - BEYOND.webp' },
  { name: 'Falabella', file: 'FALABELLA - BEYOND.webp' },
  { name: 'Pepsico', file: 'PEPSICO - BEYOND.webp' },
  { name: 'Hisense', file: 'hisense.webp' },
  { name: 'Caixun', file: 'caixun.webp' },
  { name: 'Hyundai', file: 'hyundai.webp' },
  { name: 'Challenger', file: 'challenger.webp' },
  { name: 'Mabe', file: 'mabe.webp' },
  { name: 'Imusa', file: 'imusa.webp' },
]

export default function NosotrosPage() {
  const { t } = useLanguage()
  const n = t.nosotros

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '120px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--accent)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{n.tag}</span>
            </div>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '40px',
              display: 'block',
            }}>
              {n.heroTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{n.heroAccent}</span><br />
              {n.heroTitle2}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '600px', display: 'block' }}>
              {n.heroBody}
            </TextReveal>
          </Reveal>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ padding: '120px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'start' }} className="grid-2">
            <Reveal>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '32px',
                display: 'block',
              }}>
                {n.whoTitle1}<br />
                <span style={{ color: 'var(--accent)' }}>{n.whoAccent}</span>
              </TextReveal>
              <TextReveal as="p" delay={0.15} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '20px', display: 'block' }}>{n.whoP1}</TextReveal>
              <TextReveal as="p" delay={0.25} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '20px', display: 'block' }}>{n.whoP2}</TextReveal>
              <TextReveal as="p" delay={0.35} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', display: 'block' }}>{n.whoP3}</TextReveal>
            </Reveal>
            <Reveal delay={0.2} direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
                {n.stats.map((item, i) => {
                  const Icon = statsIcons[i]
                  return (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--white)', padding: '20px 28px' }}>
                      <Icon size={22} strokeWidth={1.6} color="var(--accent)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', flex: 1 }}>{item.label}</span>
                      <span style={{ fontFamily: 'var(--font-barlow), sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>
                        {i < 3 ? item.value : <CountUp value={item.value} />}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Made in Colombia */}
      <section style={{ padding: '120px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }} className="grid-2">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{n.colombiaTag}</span>
              </div>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '32px',
                display: 'block',
              }}>
                {n.colombiaTitle1}<br />
                <span style={{ color: 'var(--accent)' }}>{n.colombiaAccent}</span>
              </TextReveal>
              <TextReveal as="p" delay={0.1} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '20px', display: 'block' }}>{n.colombiaP1}</TextReveal>
              <TextReveal as="p" delay={0.2} style={{ fontSize: '16px', lineHeight: 1.9, color: 'var(--text-muted)', marginBottom: '32px', display: 'block' }}>{n.colombiaP2}</TextReveal>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
                {n.colombiaFeatures.map((feature) => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Check size={18} strokeWidth={2.5} color="var(--accent)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'var(--text)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <Image
                src="/images/about/img-nosotros--1.webp"
                alt={n.colombiaTag}
                width={650}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </Reveal>

            <Reveal delay={0.2} direction="left" style={{ height: '100%' }}>
              <div style={{ position: 'relative', height: '100%', minHeight: '480px', background: 'var(--bg)', overflow: 'hidden' }}>
                <FooterMap />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '120px 0', background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '80px',
              display: 'block',
            }}>
              {n.processTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{n.processAccent}</span>
            </TextReveal>
          </Reveal>

          <Reveal>
            <ProcessRotator items={n.processes} icons={processIcons} />
          </Reveal>
        </div>
      </section>

      {/* Brands */}
      <section style={{ padding: '120px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 60px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '64px',
              display: 'block',
            }}>
              {n.brandsTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{n.brandsAccent}</span>
            </TextReveal>
          </Reveal>

          <LogoRotator logos={clientLogos} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 56px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#fff',
              display: 'block',
            }}>
              {n.ctaTitle.split('\n').map((line, i, arr) => (
                <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
              ))}
            </TextReveal>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/contacto" style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#fff',
              color: 'var(--red)',
              padding: '20px 48px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {n.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
