'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useTransform, MotionValue } from 'framer-motion'
import HeroScroll from './components/HeroScroll'
import ScrollCard from './components/ScrollCard'
import SpotlightCard from './components/SpotlightCard'
import ProjectGallery from './components/ProjectGallery'
import { useLanguage } from './context/LanguageContext'

const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

const revealItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 85,
      damping: 13,
      mass: 0.9,
    },
  },
}

const vp = { once: true, margin: '-40px' } as const

const clientLogos = [
  { name: 'Samsung', file: 'SAMSUNG - BEYOND.webp' },
  { name: 'Apple', file: 'APPLE - BEYOND.webp' },
  { name: 'LG', file: 'LG - BEYOND.webp' },
  { name: 'AMD', file: 'AMD - BEYOND.webp' },
  { name: 'Microsoft', file: 'microsoft.webp' },
  { name: 'TCL', file: 'TCL---BEYOND.webp' },
  { name: 'Adidas', file: 'ADIDAS - BEYOND.webp' },
  { name: 'Nestlé', file: 'NESTLE- BEYOND.webp' },
  { name: 'Aldo', file: 'aldo.webp' },
  { name: 'Olímpica', file: 'OLIMPICA - BEYOND.webp' },
  { name: 'Falabella', file: 'FALABELLA - BEYOND.webp' },
  { name: 'Pepsico', file: 'PEPSICO - BEYOND.webp' },
]

const capabilityImgs = [
  '/images/service/beyond_carpinteria.webp',
  '/images/service/beyond_metalmecanica.webp',
  '/images/service/beyond_impresion.webp',
  '/images/service/beyond_acrilicos.webp',
  '/images/service/baners_instalacion_beyond.jpg',
  '/images/service/beyond_logistica_tegnologia.webp',
]
const capabilityHrefs = [
  '/capacidades/carpinteria',
  '/capacidades/metalmecanica',
  '/capacidades/impresion',
  '/capacidades/acrilicos',
  '/capacidades/instalacion',
  '/capacidades/logistica',
]

const featuredProjectData = [
  { slug: 'apple-isla', img: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png' },
  { slug: 'samsung-galaxy-studio', img: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png' },
  { slug: 'amd-mesa', img: '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png' },
  { slug: 'lg-arq-comercial', img: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png' },
]

function AboutSection() {
  const { t } = useLanguage()
  const h = t.home
  return (
    <div style={{ height: '100dvh', background: 'var(--bg)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="grid-2">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={vp}
            variants={revealContainer}
            style={{ position: 'relative' }}
          >
            <motion.div variants={revealItem}>
              <Image
                src="/images/about/about-img.jpg"
                alt="Beyond SAS planta"
                width={700}
                height={460}
                style={{ width: '100%', height: '460px', objectFit: 'cover' }}
              />
            </motion.div>
            <motion.div
              variants={revealItem}
              style={{
                position: 'absolute', bottom: '28px', right: '0',
                background: 'var(--red)', color: '#fff',
                padding: '20px 24px',
                boxShadow: '0 20px 60px rgba(224,41,7,0.3)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '36px', lineHeight: 1 }}>3.850</div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', marginTop: '4px' }}>{h.plantBadge}</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={vp}
            variants={revealContainer}
          >
            <motion.h2
              variants={revealItem}
              style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: 'clamp(32px, 3.5vw, 56px)', lineHeight: 1,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: '20px',
              }}
            >
              {h.aboutTitle1}<br />{h.aboutTitle2}<br />
              <span style={{ color: 'var(--red)' }}>{h.aboutAccent}</span><br />
              {h.aboutTitle3}
            </motion.h2>
            <motion.p variants={revealItem} style={{ fontSize: '16px', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '14px' }}>
              {h.aboutP1}
            </motion.p>
            <motion.p variants={revealItem} style={{ fontSize: '16px', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '32px' }}>
              {h.aboutP2}
            </motion.p>
            <motion.div variants={revealItem}>
              <Link href="/nosotros" className="btn-outline">{h.aboutCta}</Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function CapabilitiesSection({ progress }: { progress: MotionValue<number> }) {
  const { t } = useLanguage()
  const h = t.home
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const totalCards = capabilityImgs.length
  const visibleCards = isMobile ? 1 : 3
  const trackWidthPercent = (totalCards / visibleCards) * 100
  const slideFraction = (1 - visibleCards / totalCards) * 100
  const trackX = useTransform(progress, [0, 0.35], ['0%', `-${slideFraction}%`])

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 0' }}>
      <div className="container">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={revealContainer}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}
        >
          <motion.h2
            variants={revealItem}
            style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1,
              letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)',
            }}
          >
            {h.capTitle1} <span style={{ color: 'var(--red)' }}>{h.capAccent}</span>
          </motion.h2>
          <motion.div variants={revealItem}>
            <Link href="/capacidades" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
              {h.capCta}
            </Link>
          </motion.div>
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${totalCards}, 1fr)`,
              gap: '10px',
              width: `${trackWidthPercent}%`,
              x: trackX,
            }}
          >
            {h.capabilities.map((cap, i) => (
              <div key={cap.title}>
                <Link href={capabilityHrefs[i]} style={{ textDecoration: 'none' }}>
                  <SpotlightCard className="cap-card" style={{ background: 'var(--bg)' }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                      <Image
                        src={capabilityImgs[i]}
                        alt={cap.title}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}
                        className="cap-img"
                      />
                    </div>
                    <div style={{ padding: '14px 18px' }}>
                      <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)', marginBottom: '3px' }}>{cap.title}</h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cap.subtitle}</p>
                    </div>
                  </SpotlightCard>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function ProjectsSection() {
  const { t } = useLanguage()
  const h = t.home
  return (
    <div style={{ height: '100dvh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 0' }}>
      <div className="container">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={revealContainer}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}
        >
          <motion.h2
            variants={revealItem}
            style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 'clamp(28px, 3.2vw, 48px)', lineHeight: 1,
              letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)',
            }}
          >
            {h.projTitle1} <span style={{ color: 'var(--red)' }}>{h.projAccent}</span>
          </motion.h2>
          <motion.div variants={revealItem}>
            <Link href="/proyectos" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
              {h.projCta}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={vp} variants={revealItem}>
          <ProjectGallery
            projects={h.featuredProjects.map((p, i) => ({
              ...p,
              slug: featuredProjectData[i].slug,
              img: featuredProjectData[i].img,
            }))}
          />
        </motion.div>

      </div>
    </div>
  )
}

function ClientsSection() {
  const { t } = useLanguage()
  const h = t.home
  return (
    <div style={{ height: '100dvh', background: 'var(--white)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={revealItem}
          style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 800,
            fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1,
            letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)',
            textAlign: 'center', marginBottom: '52px',
          }}
        >
          {h.clientsTitle1} <span style={{ color: 'var(--red)' }}>{h.clientsAccent}</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={revealContainer}
          className="grid-clients" style={{ display: 'grid', gap: '1px', background: 'var(--border)' }}
        >
          {clientLogos.map((c) => (
            <motion.div
              key={c.name}
              variants={revealItem}
              style={{ background: 'var(--white)', padding: '32px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Image
                src={`/images/logo/${c.file}`}
                alt={c.name}
                width={100}
                height={36}
                style={{ objectFit: 'contain', height: '44px', width: 'auto', filter: 'grayscale(1)', opacity: 0.45 }}
                className="brand-item"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}

function CTASection() {
  const { t } = useLanguage()
  const h = t.home
  return (
    <section id="cta-red-section" style={{
      minHeight: '100dvh', background: 'var(--red)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.10) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'relative', textAlign: 'center', padding: '120px 32px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ type: 'spring', stiffness: 85, damping: 13, mass: 0.9 }}
          style={{
            fontFamily: 'var(--font-barlow)', fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 0.95,
            letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff',
            marginBottom: '24px', whiteSpace: 'pre-line',
          }}
        >
          {h.ctaTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ type: 'spring', stiffness: 85, damping: 13, mass: 0.9, delay: 0.1 }}
          style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '44px', maxWidth: '420px', margin: '0 auto 44px' }}
        >
          {h.ctaBody}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ type: 'spring', stiffness: 85, damping: 13, mass: 0.9, delay: 0.2 }}
          style={{ display: 'inline-block' }}
          whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.25)' }}
          whileTap={{ scale: 0.97, y: 0 }}
        >
          <Link href="/contacto" style={{
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: '#fff', color: 'var(--red)', padding: '18px 48px',
            fontSize: '14px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
            borderRadius: '999px',
          }}>
            {h.ctaBtn}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroScroll />

      <ScrollCard index={2} scrollHeight="240vh">
        <AboutSection />
      </ScrollCard>

      <ScrollCard index={3} scrollHeight="900vh">
        {(progress: MotionValue<number>) => <CapabilitiesSection progress={progress} />}
      </ScrollCard>

      <ScrollCard index={4} scrollHeight="240vh">
        <ProjectsSection />
      </ScrollCard>

      <ScrollCard index={5} scrollHeight="220vh" isLast>
        <ClientsSection />
      </ScrollCard>

      <CTASection />
    </>
  )
}
