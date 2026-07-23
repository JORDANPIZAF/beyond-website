'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../components/Reveal'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import TextReveal from '../components/TextReveal'
import { LayoutGrid, Building2, Tent, Rows3, Sofa, Megaphone, Palette, ChevronDown, Tag } from 'lucide-react'

const categoryIcons = [LayoutGrid, Building2, Tent, Rows3, Sofa, Megaphone, Palette]

const projectsData = [
  { id: 1,  slug: 'lg-vitrina-bucaramanga',  title: 'LG Vitrina Bucaramanga',    categoryEs: 'Arquitectura Comercial',  client: 'LG',          year: '2024', cover: '/images/portfolio/arq-comercial/img/p3/vitrina_buc_INT-1-.png' },
  { id: 2,  slug: 'samsung-galaxy-studio',   title: 'Samsung Galaxy Studio',      categoryEs: 'Arquitectura Efímera',    client: 'Samsung',     year: '2024', cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-1.png' },
  { id: 3,  slug: 'olimpica-licores',        title: 'Olímpica Licores',           categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2024', cover: '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-1.png' },
  { id: 4,  slug: 'oficinas-bogota',         title: 'Oficinas Bogotá',            categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2023', cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-1.png' },
  { id: 5,  slug: 'nestle-congreso',         title: 'Nestlé Congreso Pediatría',  categoryEs: 'Publicidad',             client: 'Nestlé',      year: '2023', cover: '/images/portfolio/publicidad/img/01/evento-nestle_INT-1-.png' },
  { id: 7,  slug: 'lg-arq-comercial',        title: 'LG Arquitectura Comercial',  categoryEs: 'Arquitectura Comercial',  client: 'LG',          year: '2023', cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-2.png' },
  { id: 8,  slug: 'tcl-tv-wall',             title: 'TCL TV Wall',                categoryEs: 'Arquitectura Efímera',    client: 'TCL',         year: '2023', cover: '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-1-.png' },
  { id: 9,  slug: 'olimpica-gondolas',       title: 'Olímpica Góndolas',          categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2022', cover: '/images/portfolio/gondolas/imge/03/gondolas_2_INT-2.png' },
  { id: 10, slug: 'mobiliario-hogar',        title: 'Mobiliario Hogar',           categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2022', cover: '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-1-.png' },
  { id: 12, slug: 'mundo-playa',             title: 'Mundo Playa Olímpica',       categoryEs: 'Creativo',               client: 'Olímpica',    year: '2022', cover: '/images/portfolio/creativo/img/01/INT-5MUNDO-PLAYA.png' },
  { id: 13, slug: 'aldo-mobiliario',         title: 'Aldo Mobiliario',            categoryEs: 'Arquitectura Comercial',  client: 'Aldo',        year: '2022', cover: '/images/portfolio/arq-comercial/img/p2/INT-2PANDORA.png' },
  { id: 14, slug: 'bold-islas',              title: 'Bold Islas',                 categoryEs: 'Arquitectura Efímera',    client: 'Bold',        year: '2021', cover: '/images/portfolio/arq-efimera/img/02/islas_boldINT-4.png' },
  { id: 15, slug: 'olimpica-zona-fit',       title: 'Olímpica Zona Fit',          categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2021', cover: '/images/portfolio/gondolas/imge/02/zona-fit_INT-2.png' },
  { id: 16, slug: 'oficinas-barranquilla',   title: 'Oficinas Barranquilla',      categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2021', cover: '/images/portfolio/mobiliario/img/02/INT-4_OFI_-BARRANQUILLA.png' },
  { id: 18, slug: 'apple-isla',              title: 'Apple Isla',                 categoryEs: 'Arquitectura Efímera',    client: 'Apple',       year: '2021', cover: '/images/portfolio/arq-efimera/img/04/isla_appleINT-3.png' },
  { id: 19, slug: 'amd-mesa',               title: 'AMD Mesa',                   categoryEs: 'Arquitectura Efímera',    client: 'AMD',         year: '2020', cover: '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-1-.png' },
  { id: 21, slug: 'isimo-to-go',             title: 'Isimo To Go',                categoryEs: 'Góndolas',               client: 'Isimo',       year: '2026', cover: '/images/portfolio/gondolas/isimo/isimo-portada.jpg' },
  { id: 22, slug: 'lg-road-show',            title: 'LG Road Show',               categoryEs: 'Arquitectura Efímera',    client: 'LG',          year: '2026', cover: '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-portada.jpg' },
  { id: 23, slug: 'plataforma-masajeadoras-el-dorado', title: 'Plataforma Sillas Masajeadoras — El Dorado', categoryEs: 'Mobiliario', client: 'El Dorado',   year: '2026', cover: '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-portada.jpg' },
  { id: 24, slug: 'nespresso-al-agua-patos', title: 'Stand Nespresso × Al Agua Patos', categoryEs: 'Arquitectura Efímera', client: 'Nespresso',   year: '2026', cover: '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-portada.jpg' },
  { id: 25, slug: 'relojeria-falabella-unicentro', title: 'Relojería Falabella Unicentro', categoryEs: 'Arquitectura Comercial', client: 'Falabella', year: '2026', cover: '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-portada.jpg' },
  { id: 26, slug: 'falabella-colina',        title: 'Calzado Falabella Colina',    categoryEs: 'Arquitectura Comercial', client: 'Falabella', year: '2026', cover: '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-portada.jpg' },
  { id: 27, slug: 'olimpica-mallorquin',      title: 'Olímpica Mallorquín',         categoryEs: 'Góndolas',               client: 'Olímpica',   year: '2026', cover: '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-portada.jpg' },
]

const categoryMap: Record<string, number> = {
  'Arquitectura Comercial': 1,
  'Arquitectura Efímera': 2,
  'Góndolas': 3,
  'Mobiliario': 4,
  'Publicidad': 5,
  'Creativo': 6,
}

const brands = Array.from(new Set(projectsData.map(proj => proj.client))).sort()

export default function ProyectosPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeBrand, setActiveBrand] = useState('all')
  const [showDock, setShowDock] = useState(false)
  const filterBarRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const p = t.proyectos

  const categories = p.categories
  const active = categories[activeIndex]

  useEffect(() => {
    const el = filterBarRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowDock(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = projectsData
    .filter(proj => activeIndex === 0 || categoryMap[proj.categoryEs] === activeIndex)
    .filter(proj => activeBrand === 'all' || proj.client === activeBrand)
    .sort((a, b) => b.id - a.id)

  const displayCategory = (categoryEs: string) => {
    const idx = categoryMap[categoryEs]
    return idx !== undefined ? categories[idx] : categoryEs
  }

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--accent)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              marginBottom: '32px',
              display: 'block',
            }}>
              {p.heroTitle1}<br />
              <span style={{ color: 'var(--accent)' }}>{p.heroAccent}</span><br />
              {p.heroTitle2}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px', display: 'block' }}>
              {p.heroBody}
            </TextReveal>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section ref={filterBarRef} style={{ padding: '32px 0', background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '7px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat, i) => {
              const Icon = categoryIcons[i]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveIndex(i)}
                  className="filter-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    flexShrink: 0,
                    background: activeIndex === i ? 'var(--accent)' : 'transparent',
                    border: `1px solid ${activeIndex === i ? 'var(--accent)' : 'var(--border)'}`,
                    color: activeIndex === i ? '#fff' : 'var(--text-muted)',
                    padding: '7px 13px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderRadius: '999px',
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                  {cat}
                </button>
              )
            })}

            <div style={{ width: '1px', flexShrink: 0, background: 'var(--border)', margin: '4px 2px' }} />

            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              <select
                value={activeBrand}
                onChange={e => setActiveBrand(e.target.value)}
                aria-label={p.brandFilterLabel}
                className="brand-select"
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  background: activeBrand === 'all' ? 'transparent' : 'var(--accent)',
                  border: `1px solid ${activeBrand === 'all' ? 'var(--border)' : 'var(--accent)'}`,
                  color: activeBrand === 'all' ? 'var(--text-muted)' : '#fff',
                  padding: '7px 33px 7px 13px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  borderRadius: '999px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              >
                <option value="all">{p.allBrandsLabel}</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                strokeWidth={2}
                style={{ position: 'absolute', right: '12px', pointerEvents: 'none', color: activeBrand === 'all' ? 'var(--text-muted)' : '#fff' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating category dock — appears once the filter bar scrolls out of view */}
      <div
        className="hide-mobile"
        style={{
          position: 'fixed',
          left: '24px',
          top: '50%',
          transform: `translateY(-50%) translateX(${showDock ? '0' : '-72px'})`,
          opacity: showDock ? 1 : 0,
          pointerEvents: showDock ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {categories.map((cat, i) => {
          const Icon = categoryIcons[i]
          return (
            <div key={cat} className="proj-dock-item">
              <button
                onClick={() => setActiveIndex(i)}
                aria-label={cat}
                className="dock-circle"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: activeIndex === i ? 'var(--accent)' : 'var(--white)',
                  border: `1px solid ${activeIndex === i ? 'var(--accent)' : 'var(--border)'}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                }}
              >
                <Icon size={18} strokeWidth={2} color={activeIndex === i ? '#fff' : 'var(--text-muted)'} />
              </button>
              <span className="proj-dock-label">{cat}</span>
            </div>
          )
        })}

        <div style={{ width: '28px', height: '1px', background: 'var(--border)', margin: '2px auto' }} />

        <div className="proj-dock-item">
          <div
            className="dock-circle"
            style={{
              position: 'relative',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: activeBrand === 'all' ? 'var(--white)' : 'var(--accent)',
              border: `1px solid ${activeBrand === 'all' ? 'var(--border)' : 'var(--accent)'}`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            <Tag size={18} strokeWidth={2} color={activeBrand === 'all' ? 'var(--text-muted)' : '#fff'} style={{ pointerEvents: 'none' }} />
            <select
              value={activeBrand}
              onChange={e => setActiveBrand(e.target.value)}
              aria-label={p.brandFilterLabel}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', borderRadius: '50%' }}
            >
              <option value="all">{p.allBrandsLabel}</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <span className="proj-dock-label">{activeBrand === 'all' ? p.brandFilterLabel : activeBrand}</span>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: '60px 0 120px', background: 'var(--bg)' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${activeBrand}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={filtered.length > 0
                ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '10px' }
                : { padding: '80px 0', textAlign: 'center' }
              }
            >
              {filtered.length === 0 && (
                <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>{p.noResults}</p>
              )}
              {filtered.map((proj, i) => (
                <Reveal key={proj.id} delay={i * 0.05}>
                  <Link href={`/proyectos/${proj.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      cursor: 'pointer',
                      background: 'var(--white)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                      className="project-card">

                      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#1a1a1a' }}>
                        <Image
                          src={proj.cover}
                          alt={proj.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="proj-img"
                        />
                      </div>

                      <div style={{ padding: '24px 28px', flex: 1 }}>
                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '3px 8px' }}>{displayCategory(proj.categoryEs)}</span>
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-barlow), sans-serif',
                          fontWeight: 700,
                          fontSize: '17px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          color: 'var(--text)',
                          lineHeight: 1.2,
                          marginBottom: '4px',
                        }}>{proj.title}</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.clientLabel}: {proj.client}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
