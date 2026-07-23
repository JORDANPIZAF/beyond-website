'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Hero3DModel from './Hero3DModel'
import TextReveal from './TextReveal'

// Slide index (0-based) → 3D model shown over the hero, or null for no model
const slideModels: Record<number, { path: string; cameraZ: number } | null> = {
  0: { path: '/models/sao384-optimized.glb', cameraZ: 13.02 },
  1: null,
  2: { path: '/models/isla-licores-optimized.glb', cameraZ: 5.37 },
}

const imgSrcs = [
  '/images/destacados/delicatessen-gondoleria.jpg',
  '/images/destacados/carpinteria-router.jpg',
  '/images/portfolio/arq-efimera/img/04/isla_appleBANNER-.png',
]

const textContainer = {
  enter: {},
  center: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  exit: {},
}
const textItem = {
  enter: { opacity: 0, y: 36 },
  center: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 85, damping: 13, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    y: -22,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const { t } = useLanguage()

  const slides = t.hero.slides.map((s, i) => ({ ...s, img: imgSrcs[i] }))
  const slideDuration = 18

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent(s => (s + 1) % slides.length)
    }, slideDuration * 1000)
    return () => clearTimeout(timer)
  }, [current, slides.length])

  const goToSlide = (index: number) => setCurrent(((index % slides.length) + slides.length) % slides.length)
  const prevSlide = () => goToSlide(current - 1)
  const nextSlide = () => goToSlide(current + 1)

  const { scrollYProgress: stickProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(stickProgress, [0.45, 1], [1, 0.88])
  const heroBorderRadius = useTransform(stickProgress, [0.45, 1], ['0px', '16px'])
  const heroOverlay = useTransform(stickProgress, [0.45, 1], [0, 0.42])

  const slide = slides[current]

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          zIndex: 1,
          scale: heroScale,
          borderRadius: heroBorderRadius,
          transformOrigin: 'top center',
          willChange: 'transform',
          background: '#111110',
        }}
      >
        {/* ── Full-bleed background image ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={slide.img}
              alt={slide.imgAlt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Gradient overlay ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(17,17,16,0.90) 0%, rgba(17,17,16,0.55) 45%, rgba(17,17,16,0.10) 70%, transparent 85%)',
          zIndex: 1,
        }} />

        {/* ── Text content — vertically centered between navbar and slide indicators ── */}
        <div style={{
          position: 'absolute',
          top: 'clamp(96px, 15vh, 140px)',
          bottom: '96px',
          left: 0, right: 0, zIndex: 2,
          display: 'flex', alignItems: 'center',
          paddingLeft: 'max(40px, calc((100vw - 1320px)/2 + 48px))',
          paddingRight: '48px',
        }}>
          <div style={{ maxWidth: '560px', width: '100%' }}>
            <AnimatePresence mode="sync">
              <motion.div
                key={`text-${current}`}
                variants={textContainer}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div variants={textItem}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                    marginBottom: '20px',
                  }}>
                    <span style={{ display: 'inline-block', width: '20px', height: '2px', background: 'var(--accent)' }} />
                    {slide.tag}
                  </div>
                </motion.div>

                <motion.h1 variants={textItem} style={{
                  fontFamily: 'var(--font-barlow), sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 8vw, 84px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '28px',
                }}>
                  {slide.lines.map((line, i) => (
                    <TextReveal
                      key={i}
                      as="span"
                      delay={0.15 + i * 0.12}
                      style={{
                        display: 'block',
                        color: i === slide.accentLine ? 'var(--accent)' : '#ffffff',
                      }}
                    >
                      {line}
                    </TextReveal>
                  ))}
                </motion.h1>

                <TextReveal as="p" delay={0.5} style={{
                  fontSize: '17px', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.72)',
                  maxWidth: '400px', marginBottom: '40px', display: 'block',
                }}>
                  {slide.body}
                </TextReveal>

                <motion.div variants={textItem} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {slide.ctas.map((cta, i) => (
                    <motion.span key={cta.href} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                      <Link
                        href={cta.href}
                        style={i === 0 ? {} : {
                          display: 'inline-flex', alignItems: 'center', gap: '10px',
                          background: 'transparent', color: '#fff',
                          padding: '14px 32px', fontSize: '13px', fontWeight: 600,
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          textDecoration: 'none',
                          border: '1.5px solid rgba(255,255,255,0.35)',
                          borderRadius: '999px',
                          transition: 'border-color 0.2s',
                        }}
                        className={i === 0 ? 'btn-primary' : ''}
                      >
                        {cta.label}
                      </Link>
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── 3D interactive model — swaps per slide, right side ── */}
        {slideModels[current] && (
          <div
            className="hide-mobile"
            style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0,
              width: '42%',
              transform: 'translateX(-15%)',
              zIndex: 2,
              pointerEvents: 'auto',
            }}
          >
            <Hero3DModel
              key={slideModels[current]!.path}
              modelPath={slideModels[current]!.path}
              cameraZ={slideModels[current]!.cameraZ}
            />
          </div>
        )}

        {/* ── Prev / next slide arrows ── */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          style={{
            position: 'absolute', top: '50%', left: '24px',
            transform: 'translateY(-50%)',
            width: '48px', height: '48px', borderRadius: '999px',
            background: '#E02907', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            zIndex: 6,
          }}
        >
          <ChevronLeft size={24} color="#fff" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Slide siguiente"
          style={{
            position: 'absolute', top: '50%', right: '24px',
            transform: 'translateY(-50%)',
            width: '48px', height: '48px', borderRadius: '999px',
            background: '#E02907', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            zIndex: 6,
          }}
        >
          <ChevronRight size={24} color="#fff" />
        </button>

        {/* ── Slide indicators ── */}
        <div style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '10px', zIndex: 3,
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}
            >
              <div style={{
                height: '3px',
                width: i === current ? '32px' : '12px',
                background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
                borderRadius: '2px',
                transition: 'width 0.3s ease, background 0.3s ease',
                overflow: 'hidden',
                position: 'relative',
              }}>
                {i === current && (
                  <motion.div
                    key={current}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: slideDuration, ease: 'linear' }}
                    style={{
                      position: 'absolute', top: 0, left: 0, height: '100%',
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* ── Exit darkening overlay ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: '#111110',
            opacity: heroOverlay,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)',
          pointerEvents: 'none', zIndex: 4,
        }} />
      </motion.div>
    </div>
  )
}
