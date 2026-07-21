'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'

export const runtime = 'edge'

const projectsData: Record<string, {
  title: string
  client: string
  category: string
  year: string
  description: string
  cover: string
  gallery: string[]
}> = {
  'samsung-galaxy-studio': {
    title: 'Samsung Galaxy Studio',
    client: 'Samsung',
    category: 'Arquitectura Efímera',
    year: '2024',
    description: 'Stand interactivo de alto impacto para el lanzamiento de la línea Galaxy. Fabricación integral de estructura metálica, carpintería, acrílicos e impresión de gran formato. Implementación en centros comerciales de Bogotá y Medellín.',
    cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-2.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-3.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-4.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-1.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-2.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-3.png',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-4.png',
    ],
  },
  'tcl-tv-wall': {
    title: 'TCL TV Wall',
    client: 'TCL',
    category: 'Arquitectura Efímera',
    year: '2023',
    description: 'TV Wall móvil de gran impacto visual para TCL. Estructura metalmecánica con capacidad para múltiples pantallas, sistema de iluminación LED y acabados de pintura electrostática de alta durabilidad.',
    cover: '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-2.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-3.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-4.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-5.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-6.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-1-.png',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-2.png',
    ],
  },
  'bold-islas': {
    title: 'Bold Islas',
    client: 'Bold',
    category: 'Arquitectura Efímera',
    year: '2021',
    description: 'Islas comerciales personalizadas para Bold. Diseño modular con carpintería de precisión, acabados en laminado de alto brillo y sistema de iluminación integrado para puntos de venta en centros comerciales.',
    cover: '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-1.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-2.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-3.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-5.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-6.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-1-.png',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-2.png',
    ],
  },
  'apple-isla': {
    title: 'Apple Isla',
    client: 'Apple',
    category: 'Arquitectura Efímera',
    year: '2021',
    description: 'Isla de exhibición de productos insignia Apple. Carpintería y metalmecánica de alta precisión con acabados premium que respetan la identidad visual de la marca. Iluminación LED de bajo consumo y superficies en vidrio templado.',
    cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-1.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-2.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-4.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-5.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-6.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-1-.png',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-2.png',
    ],
  },
  'amd-mesa': {
    title: 'AMD Mesa',
    client: 'AMD',
    category: 'Arquitectura Efímera',
    year: '2020',
    description: 'Mesa de exhibición de alto impacto para AMD. Estructura metalmecánica robusta con superficie en vidrio templado, iluminación perimetral LED y soporte de impresión digital de alta resolución.',
    cover: '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-2.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-3.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-4.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-5.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-6.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-1-.png',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-2.png',
    ],
  },
  'lg-arq-comercial': {
    title: 'LG Arquitectura Comercial',
    client: 'LG',
    category: 'Arquitectura Comercial',
    year: '2023',
    description: 'Arquitectura comercial integral para LG en grandes superficies. Diseño de espacios de exhibición con estructuras metálicas y paneles de carpintería de alta precisión. Implementación en múltiples tiendas a nivel nacional.',
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-1.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-3.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-4.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-5.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-6.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-2.png',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-3.png',
    ],
  },
  'aldo-mobiliario': {
    title: 'Aldo Mobiliario',
    client: 'Aldo',
    category: 'Arquitectura Comercial',
    year: '2022',
    description: 'Mobiliario comercial de alta gama para tiendas Aldo. Carpintería de precisión con acabados lacados, herrajes de importación y superficies de vidrio templado. Diseño que refleja el posicionamiento premium de la marca.',
    cover: '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p2/DEST-1PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-3PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-4PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-5PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/DEST-6PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/INT-2PANDORA.png',
      '/images/portfolio/arq-comercial/img/p2/INT-3PANDORA.png',
    ],
  },
  'lg-vitrina-bucaramanga': {
    title: 'LG Vitrina Bucaramanga',
    client: 'LG',
    category: 'Arquitectura Comercial',
    year: '2024',
    description: 'Intervención de vitrina comercial LG en Bucaramanga. Diseño y fabricación de módulos de exhibición con iluminación LED, estructuras metálicas y carpintería de alta calidad para punto de venta de primer nivel.',
    cover: '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.png',
    gallery: [
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-2.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-3.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-4.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-5.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-6.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_01.png',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_02.png',
    ],
  },
  'olimpica-licores': {
    title: 'Olímpica Licores',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2024',
    description: 'Góndolas de exhibición para sección de licores Olímpica. Diseño estructural robusto en metalmecánica con acabados en pintura electrostática, iluminación integrada y señalización de gran formato.',
    cover: '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.png',
    gallery: [
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-2.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-3.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-4.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-5.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-6.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-1.png',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-2.png',
    ],
  },
  'olimpica-zona-fit': {
    title: 'Olímpica Zona Fit',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2021',
    description: 'Zona Fit Olímpica: exhibición especializada para productos de fitness y nutrición deportiva. Góndolas modulares con sistema de iluminación LED y señalética de alto impacto visual.',
    cover: '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.png',
    gallery: [
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-1.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-3.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-4.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-5.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-6.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-2.png',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-3.png',
    ],
  },
  'olimpica-gondolas': {
    title: 'Olímpica Góndolas',
    client: 'Olímpica',
    category: 'Góndolas',
    year: '2022',
    description: 'Sistema completo de góndolas para Olímpica. Fabricación metalmecánica de alta resistencia con capacidad de carga superior, acabados en pintura electrostática y sistema de estanterías ajustables.',
    cover: '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.png',
    gallery: [
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-1.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-3.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-4.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-5.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-6.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-2.png',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-3.png',
    ],
  },
  'oficinas-bogota': {
    title: 'Oficinas Bogotá',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2023',
    description: 'Proyecto de mobiliario corporativo para oficinas en Bogotá. Diseño e instalación de escritorios, muebles de almacenamiento y divisiones en carpintería de alta calidad con acabados lacados y herrajes importados.',
    cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png',
    gallery: [
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-2.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-3.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-4.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-5.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-6.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-1.png',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-2.png',
    ],
  },
  'oficinas-barranquilla': {
    title: 'Oficinas Barranquilla',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2021',
    description: 'Diseño de mobiliario corporativo para oficinas en Barranquilla. Fabricación completa de puestos de trabajo ergonómicos, muebles de archivo y áreas colaborativas con materiales de primera calidad.',
    cover: '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.png',
    gallery: [
      '/images/portfolio/mobiliario/img/02/DEST-1_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-2_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-3_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-5_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/DEST-6_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/INT-2_OFI_-BARRANQUILLA.png',
      '/images/portfolio/mobiliario/img/02/INT-3_OFI_-BARRANQUILLA.png',
    ],
  },
  'mobiliario-hogar': {
    title: 'Mobiliario Hogar',
    client: 'Corporativo',
    category: 'Mobiliario',
    year: '2022',
    description: 'Proyecto integral de mobiliario para hogar. Diseño personalizado y fabricación en maderas nobles con acabados premium. Piezas únicas que combinan funcionalidad y estética de alto nivel.',
    cover: '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.png',
    gallery: [
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-2.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-3.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-4.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-5.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-6.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-2.png',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-3.png',
    ],
  },
  'nestle-congreso': {
    title: 'Nestlé Congreso Pediatría',
    client: 'Nestlé',
    category: 'Publicidad',
    year: '2023',
    description: 'Stand para el Congreso Colombiano de Pediatría, Nestlé. Fabricación integral del espacio: estructura, carpintería, impresión de gran formato y señalización médica. Espacio funcional que cumple con los estándares de la marca.',
    cover: '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.png',
    gallery: [
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-2.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-3.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-4.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-5.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-6.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-2.png',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-3.png',
    ],
  },
  'nestle-nan': {
    title: 'Nestlé NAN',
    client: 'Nestlé',
    category: 'Publicidad',
    year: '2022',
    description: 'Material publicitario y exhibición POP para línea Nestlé NAN. Impresión de gran formato, displays de punto de venta y señalización permanente para canal farmacéutico y supermercados.',
    cover: '/images/portfolio/publicidad/img/02/nestle_nan_DEST-5.png',
    gallery: [
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-1.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-2.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-3.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-4.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-5.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_DEST-6.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_INT-2.png',
      '/images/portfolio/publicidad/img/02/nestle_nan_INT-3.png',
    ],
  },
  'xbox-stands': {
    title: 'Xbox Stands',
    client: 'Microsoft',
    category: 'Publicidad',
    year: '2021',
    description: 'Stands de exhibición Xbox para centros comerciales a nivel nacional. Estructura metalmecánica modular con carpintería de precisión, pantallas integradas e impresión de gran formato con identidad de marca Microsoft.',
    cover: '/images/portfolio/publicidad/img/03/publi_xbox_DEST-1.png',
    gallery: [
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-1.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-2.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-3.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-4.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-5.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_DEST-6.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_INT-2.png',
      '/images/portfolio/publicidad/img/03/publi_xbox_INT-3.png',
    ],
  },
  'canasta-panaderia': {
    title: 'Canasta Panadería',
    client: 'Canasta',
    category: 'Creativo',
    year: '2023',
    description: 'Conceptualización y diseño creativo para Canasta Panadería. Desarrollo de identidad visual aplicada a elementos de merchandising, señalización interior, display de productos y materiales de punto de venta.',
    cover: '/images/portfolio/creativo/img/03/canasta_DEST-6.png',
    gallery: [
      '/images/portfolio/creativo/img/03/canasta_DEST-1.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-2.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-3.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-4.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-5.png',
      '/images/portfolio/creativo/img/03/canasta_DEST-6.png',
      '/images/portfolio/creativo/img/03/canasta_INT-2.png',
      '/images/portfolio/creativo/img/03/canasta_INT-3.png',
    ],
  },
  'mundo-playa': {
    title: 'Mundo Playa Olímpica',
    client: 'Olímpica',
    category: 'Creativo',
    year: '2022',
    description: 'Intervención creativa Mundo Playa para Olímpica. Diseño conceptual y fabricación de elementos decorativos estacionales, señalización temática y displays de producto para temporada de playa.',
    cover: '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.png',
    gallery: [
      '/images/portfolio/creativo/img/01/DEST-1MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-2MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-3MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-4MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/DEST-6MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/INT-2MUNDO-PLAYA.png',
      '/images/portfolio/creativo/img/01/INT-3MUNDO-PLAYA.png',
    ],
  },
  'mascotas-purina': {
    title: 'Mascotas Purina',
    client: 'Purina',
    category: 'Creativo',
    year: '2020',
    description: 'Activación creativa para Purina en tiendas de mascotas. Diseño y fabricación de displays especializados, señalización temática y material POP que comunica el amor por las mascotas en el punto de venta.',
    cover: '/images/portfolio/creativo/img/02/mascotas_DEST-1.png',
    gallery: [
      '/images/portfolio/creativo/img/02/mascotas_DEST-1.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-2.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-3.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-4.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-5.png',
      '/images/portfolio/creativo/img/02/mascotas_DEST-6.png',
      '/images/portfolio/creativo/img/02/mascotas_INT-2.png',
      '/images/portfolio/creativo/img/02/mascotas_INT-3.png',
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectsData[slug]
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '76px' }}>
        <TextReveal as="h1" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '48px', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>Proyecto no encontrado</TextReveal>
        <Link href="/proyectos" style={{ color: 'var(--red)', fontWeight: 600 }}>← Volver a proyectos</Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '80vh', minHeight: '500px', overflow: 'hidden' }}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)',
        }} />
        <div className="container" style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Link href="/proyectos" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em',
            marginBottom: '24px',
          }}>
            ← Todos los proyectos
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', background: 'rgba(224,41,7,0.15)', padding: '4px 12px', border: '1px solid var(--red)' }}>
              {project.category}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{project.year}</span>
          </div>
          <TextReveal as="h1" style={{
            fontFamily: 'var(--font-barlow), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '16px',
            display: 'block',
          }}>{project.title}</TextReveal>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>Cliente: <strong style={{ color: '#fff' }}>{project.client}</strong></p>
        </div>
      </section>

      {/* Descripción */}
      <section style={{ padding: '80px 0', background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'start' }} className="grid-2">
            <Reveal>
              <div>
                <div style={{ width: '32px', height: '2px', background: 'var(--red)', marginBottom: '16px' }} />
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Cliente</p>
                <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px' }}>{project.client}</p>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Categoría</p>
                <p style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '32px' }}>{project.category}</p>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Año</p>
                <p style={{ fontSize: '16px', color: 'var(--text)' }}>{project.year}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15} direction="left">
              <TextReveal as="p" style={{ fontSize: '18px', lineHeight: 1.9, color: 'var(--text-muted)', display: 'block' }}>{project.description}</TextReveal>
              <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/contacto" className="btn-primary">Iniciar un proyecto similar →</Link>
                <Link href="/proyectos" className="btn-outline">Ver más proyectos</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section style={{ padding: '80px 0 120px', background: 'var(--bg)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--red)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)' }}>Galería del proyecto</span>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px', background: 'var(--border)' }}>
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div
                  onClick={() => setLightboxImg(img)}
                  className="gallery-tile"
                  style={{
                    position: 'relative',
                    height: '225px',
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                    background: '#e8e6e2',
                    borderRadius: '10px',
                  }}
                >
                  <Image
                    src={img}
                    alt={`${project.title} — imagen ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="proj-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0)',
                    transition: 'background 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }} className="gallery-overlay">
                    <span style={{ color: '#fff', fontSize: '24px', opacity: 0, transition: 'opacity 0.3s' }} className="zoom-icon">+</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: 'var(--red)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <Reveal>
            <TextReveal as="h2" style={{
              fontFamily: 'var(--font-barlow)', fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 0.95,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#fff', marginBottom: '24px', display: 'block',
            }}>
              ¿Querés algo similar?<br />Hablemos.
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px', display: 'block' }}>
              Cuéntanos tu proyecto. Fabricamos cualquier concepto con la más alta calidad industrial.
            </TextReveal>
            <Link href="/contacto" style={{
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#fff', color: 'var(--red)',
              padding: '18px 48px', fontSize: '14px', fontWeight: 800,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              Iniciar Proyecto →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out', padding: '32px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', width: '100%', height: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={lightboxImg}
                alt="Vista ampliada"
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', width: '44px', height: '44px', cursor: 'pointer',
                fontSize: '20px', borderRadius: '999px',
              }}
            >✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .gallery-overlay:hover {
          background: rgba(0,0,0,0.35) !important;
        }
        .gallery-overlay:hover .zoom-icon {
          opacity: 1 !important;
        }
        .gallery-tile:hover {
          grid-column: span 2;
          z-index: 2;
        }
      `}</style>
    </>
  )
}
