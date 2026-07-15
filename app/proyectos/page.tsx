'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../components/Reveal'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const projectsData = [
  { id: 1,  slug: 'lg-vitrina-bucaramanga',  title: 'LG Vitrina Bucaramanga',    categoryEs: 'Arquitectura Comercial',  client: 'LG',          year: '2024', cover: '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.png' },
  { id: 2,  slug: 'samsung-galaxy-studio',   title: 'Samsung Galaxy Studio',      categoryEs: 'Arquitectura Efímera',    client: 'Samsung',     year: '2024', cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png' },
  { id: 3,  slug: 'olimpica-licores',        title: 'Olímpica Licores',           categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2024', cover: '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.png' },
  { id: 4,  slug: 'oficinas-bogota',         title: 'Oficinas Bogotá',            categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2023', cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png' },
  { id: 5,  slug: 'nestle-congreso',         title: 'Nestlé Congreso Pediatría',  categoryEs: 'Publicidad',             client: 'Nestlé',      year: '2023', cover: '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.png' },
  { id: 6,  slug: 'canasta-panaderia',       title: 'Canasta Panadería',          categoryEs: 'Creativo',               client: 'Canasta',     year: '2023', cover: '/images/portfolio/creativo/img/03/canasta_DEST-6.png' },
  { id: 7,  slug: 'lg-arq-comercial',        title: 'LG Arquitectura Comercial',  categoryEs: 'Arquitectura Comercial',  client: 'LG',          year: '2023', cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png' },
  { id: 8,  slug: 'tcl-tv-wall',             title: 'TCL TV Wall',                categoryEs: 'Arquitectura Efímera',    client: 'TCL',         year: '2023', cover: '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.png' },
  { id: 9,  slug: 'olimpica-gondolas',       title: 'Olímpica Góndolas',          categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2022', cover: '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.png' },
  { id: 10, slug: 'mobiliario-hogar',        title: 'Mobiliario Hogar',           categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2022', cover: '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.png' },
  { id: 11, slug: 'nestle-nan',              title: 'Nestlé NAN',                 categoryEs: 'Publicidad',             client: 'Nestlé',      year: '2022', cover: '/images/portfolio/publicidad/img/02/nestle_nan_DEST-5.png' },
  { id: 12, slug: 'mundo-playa',             title: 'Mundo Playa Olímpica',       categoryEs: 'Creativo',               client: 'Olímpica',    year: '2022', cover: '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.png' },
  { id: 13, slug: 'aldo-mobiliario',         title: 'Aldo Mobiliario',            categoryEs: 'Arquitectura Comercial',  client: 'Aldo',        year: '2022', cover: '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png' },
  { id: 14, slug: 'bold-islas',              title: 'Bold Islas',                 categoryEs: 'Arquitectura Efímera',    client: 'Bold',        year: '2021', cover: '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.png' },
  { id: 15, slug: 'olimpica-zona-fit',       title: 'Olímpica Zona Fit',          categoryEs: 'Góndolas',               client: 'Olímpica',    year: '2021', cover: '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.png' },
  { id: 16, slug: 'oficinas-barranquilla',   title: 'Oficinas Barranquilla',      categoryEs: 'Mobiliario',             client: 'Corporativo', year: '2021', cover: '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.png' },
  { id: 17, slug: 'xbox-stands',             title: 'Xbox Stands',                categoryEs: 'Publicidad',             client: 'Microsoft',   year: '2021', cover: '/images/portfolio/publicidad/img/03/publi_xbox_DEST-1.png' },
  { id: 18, slug: 'apple-isla',              title: 'Apple Isla',                 categoryEs: 'Arquitectura Efímera',    client: 'Apple',       year: '2021', cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png' },
  { id: 19, slug: 'amd-mesa',               title: 'AMD Mesa',                   categoryEs: 'Arquitectura Efímera',    client: 'AMD',         year: '2020', cover: '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png' },
  { id: 20, slug: 'mascotas-purina',         title: 'Mascotas Purina',            categoryEs: 'Creativo',               client: 'Purina',      year: '2020', cover: '/images/portfolio/creativo/img/02/mascotas_DEST-1.png' },
]

const categoryMap: Record<string, number> = {
  'Arquitectura Comercial': 1,
  'Arquitectura Efímera': 2,
  'Góndolas': 3,
  'Mobiliario': 4,
  'Publicidad': 5,
  'Creativo': 6,
}

export default function ProyectosPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useLanguage()
  const p = t.proyectos

  const categories = p.categories
  const active = categories[activeIndex]

  const filtered = activeIndex === 0
    ? projectsData
    : projectsData.filter(proj => categoryMap[proj.categoryEs] === activeIndex)

  const displayCategory = (categoryEs: string) => {
    const idx = categoryMap[categoryEs]
    return idx !== undefined ? categories[idx] : categoryEs
  }

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
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>{p.tag}</span>
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
              {p.heroTitle1}<br />
              <span style={{ color: 'var(--red)' }}>{p.heroAccent}</span><br />
              {p.heroTitle2}
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '560px' }}>
              {p.heroBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '32px 0', background: 'var(--white)', borderBottom: '1px solid var(--border)', position: 'sticky', top: '76px', zIndex: 10, backdropFilter: 'blur(12px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveIndex(i)}
                style={{
                  background: activeIndex === i ? 'var(--red)' : 'transparent',
                  border: `1px solid ${activeIndex === i ? 'var(--red)' : 'var(--border)'}`,
                  color: activeIndex === i ? '#fff' : 'var(--text-muted)',
                  padding: '8px 20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderRadius: '999px',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '60px 0 120px', background: 'var(--bg)' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', background: 'var(--border)' }}
            >
              {filtered.map((proj, i) => (
                <Reveal key={proj.id} delay={i * 0.05}>
                  <Link href={`/proyectos/${proj.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      aspectRatio: '4/3',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: '#1a1a1a',
                      borderRadius: '10px',
                    }}
                      className="project-card">

                      <Image
                        src={proj.cover}
                        alt={proj.title}
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="proj-img"
                      />

                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                        zIndex: 1,
                      }} />

                      <div style={{ position: 'relative', zIndex: 2, padding: '28px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)' }}>{displayCategory(proj.categoryEs)}</span>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{proj.year}</span>
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-barlow), sans-serif',
                          fontWeight: 700,
                          fontSize: '17px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.02em',
                          color: '#fff',
                          lineHeight: 1.2,
                        }}>{proj.title}</h3>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{p.clientLabel}: {proj.client}</p>
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
