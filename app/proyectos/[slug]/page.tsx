'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../../components/Reveal'
import TextReveal from '../../components/TextReveal'
import RotatingGallery from '../../components/RotatingGallery'
import { useLanguage } from '../../context/LanguageContext'

export const runtime = 'edge'

const clientLogoMap: Record<string, string> = {
  'Samsung': 'samsung.webp',
  'TCL': 'TCL---BEYOND.webp',
  'Bold': 'bold.webp',
  'Apple': 'apple.webp',
  'AMD': 'amd.webp',
  'LG': 'lg.webp',
  'Aldo Ecuador': 'aldo.webp',
  'Olímpica': 'olimpica.webp',
  'Nestlé': 'nestle.webp',
  'Microsoft': 'microsoft.webp',
  'Canasta': 'LOGO_CANASTA .webp',
  'Purina': 'NESTLE PURINA - BEYOND.webp',
}

const categoryMap: Record<string, number> = {
  'Arquitectura Comercial': 1,
  'Arquitectura Efímera': 2,
  'Góndolas': 3,
  'Mobiliario': 4,
  'Publicidad': 5,
  'Creativo': 6,
}

const projectsData: Record<string, {
  title: string
  client: string
  categoryEs: string
  year: string
  description: { es: string; en: string }
  cover: string
  gallery: string[]
}> = {
  'samsung-galaxy-studio': {
    title: 'Samsung Galaxy Studio',
    client: 'Samsung',
    categoryEs: 'Arquitectura Efímera',
    year: '2024',
    description: {
      es: 'Stand interactivo Galaxy Studio para el lanzamiento de la línea Samsung Galaxy en centros comerciales de Bogotá y Medellín. Estructura metálica de piso a techo con paneles retroiluminados, integración de pantallas para demostraciones de SmartThings y acabados en madera y verde, color característico de la marca. Fabricación integral: metalmecánica de la estructura, carpintería del mobiliario interior, impresión de gran formato para la señalización y montaje en sitio con nuestro propio equipo de instalación.',
      en: 'Interactive Galaxy Studio stand for the launch of the Samsung Galaxy line in shopping malls across Bogotá and Medellín. A floor-to-ceiling metal structure with backlit panels, integrated screens for SmartThings demonstrations, and finishes in wood and the brand\'s signature green. Full in-house production: structural metalworking, interior millwork, large-format printing for signage, and on-site installation by our own team.',
    },
    cover: '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.webp',
    gallery: [
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-1.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-2.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-3.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-DES-4.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-1.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-2.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-3.webp',
      '/images/portfolio/arq-efimera/img/01/GALAXY-S-INT-4.webp',
    ],
  },
  'tcl-tv-wall': {
    title: 'TCL TV Wall',
    client: 'TCL',
    categoryEs: 'Arquitectura Efímera',
    year: '2023',
    description: {
      es: 'TV Wall móvil de gran formato para TCL, diseñado para exhibir simultáneamente múltiples televisores en un solo punto de alto tráfico. Estructura metalmecánica robusta capaz de soportar el peso y cableado de varias pantallas, con sistema de iluminación LED perimetral y acabados en pintura electrostática de alta durabilidad para resistir el uso constante en piso de venta. Un desarrollo pensado para moverse entre tiendas sin perder rigidez ni terminación premium.',
      en: 'A large-format, mobile TV Wall for TCL, designed to display multiple televisions simultaneously at a single high-traffic point. A robust metalworked structure engineered to support the weight and wiring of several screens, with perimeter LED lighting and a durable electrostatic paint finish built to withstand constant use on the sales floor. Designed to move between stores without losing structural rigidity or premium finish.',
    },
    cover: '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.webp',
    gallery: [
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-1.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-2.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-3.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-4.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-5.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_DEST-6.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-1-.webp',
      '/images/portfolio/arq-efimera/img/03/wall_tcl_INT-2.webp',
    ],
  },
  'bold-islas': {
    title: 'Bold Islas',
    client: 'Bold',
    categoryEs: 'Arquitectura Efímera',
    year: '2021',
    description: {
      es: 'Islas comerciales modulares para Bold, diseñadas para puntos de venta dentro de centros comerciales. Carpintería de precisión con acabados en laminado de alto brillo, iluminación integrada bajo mesón y sistema de anclaje que permite reconfigurar el mobiliario según el espacio disponible en cada ubicación. Un diseño compacto que maximiza la exhibición de producto sin perder circulación alrededor del punto.',
      en: 'Modular retail islands for Bold, designed for points of sale inside shopping malls. Precision carpentry with high-gloss laminate finishes, under-counter integrated lighting, and an anchoring system that lets the fixtures be reconfigured to fit the available space at each location. A compact design that maximizes product display without sacrificing circulation around the unit.',
    },
    cover: '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.webp',
    gallery: [
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-1.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-2.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-3.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-4.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-5.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldDEST-6.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-1-.webp',
      '/images/portfolio/arq-efimera/img/02/islas_boldINT-2.webp',
    ],
  },
  'apple-isla': {
    title: 'Apple Isla',
    client: 'Apple',
    categoryEs: 'Arquitectura Efímera',
    year: '2021',
    description: {
      es: 'Isla de exhibición para productos insignia Apple, fabricada respetando al milímetro los estándares de diseño y minimalismo de la marca. Carpintería y metalmecánica de alta precisión, superficies en vidrio templado, iluminación LED de bajo consumo integrada en la estructura y acabados en tonos neutros que ponen el foco completamente en el producto. Cada unión y cada terminación pasó por control de calidad antes de instalar en sitio.',
      en: 'A display island for Apple\'s flagship products, built to the millimeter to meet the brand\'s design and minimalist standards. High-precision carpentry and metalworking, tempered-glass surfaces, low-consumption LED lighting integrated into the structure, and neutral-tone finishes that keep the focus entirely on the product. Every joint and every finish passed through quality control before on-site installation.',
    },
    cover: '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.webp',
    gallery: [
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-1.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-2.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-3.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-4.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-5.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleDEST-6.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-1-.webp',
      '/images/portfolio/arq-efimera/img/04/isla_appleINT-2.webp',
    ],
  },
  'amd-mesa': {
    title: 'AMD Mesa',
    client: 'AMD',
    categoryEs: 'Arquitectura Efímera',
    year: '2020',
    description: {
      es: 'Mesa de exhibición de alto impacto para AMD, pensada como punto focal dentro de eventos y activaciones tecnológicas. Estructura metalmecánica robusta con superficie en vidrio templado, iluminación perimetral LED que resalta el producto y soporte para impresión digital de alta resolución con la gráfica de marca. Diseñada para resistir montaje y desmontaje repetido sin perder estabilidad.',
      en: 'A high-impact display table for AMD, conceived as a focal point within tech events and activations. A robust metalworked structure with a tempered-glass surface, perimeter LED lighting that highlights the product, and support for high-resolution digital printing with the brand\'s graphics. Built to withstand repeated setup and teardown without losing stability.',
    },
    cover: '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.webp',
    gallery: [
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-1.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-2.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-3.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-4.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-5.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_DEST-6.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-1-.webp',
      '/images/portfolio/arq-efimera/img/05/mesa-amd_INT-2.webp',
    ],
  },
  'lg-arq-comercial': {
    title: 'LG Arquitectura Comercial',
    client: 'LG',
    categoryEs: 'Arquitectura Comercial',
    year: '2023',
    description: {
      es: 'Arquitectura comercial integral para LG en grandes superficies a nivel nacional. Diseño de espacios de exhibición con estructuras metálicas, paneles de carpintería de alta precisión y señalización de marca aplicada en múltiples formatos. El proyecto se replicó en distintas tiendas manteniendo consistencia de marca y calidad de acabado en cada instalación.',
      en: 'Full-scope retail architecture for LG across major retailers nationwide. Display space design with metal structures, high-precision carpentry panels, and brand signage applied across multiple formats. The project was replicated across different stores while maintaining brand consistency and finish quality at every installation.',
    },
    cover: '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.webp',
    gallery: [
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-1.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-2.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-3.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-4.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-5.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02DEST-6.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-2.webp',
      '/images/portfolio/arq-comercial/img/p1/ARQ_COMERCIAL_02INT-3.webp',
    ],
  },
  'aldo-mobiliario': {
    title: 'Aldo Mobiliario',
    client: 'Aldo Ecuador',
    categoryEs: 'Arquitectura Comercial',
    year: '2022',
    description: {
      es: 'Mobiliario comercial de alta gama para tiendas Aldo Ecuador. Carpintería de precisión con acabados lacados, herrajes de importación y superficies en vidrio templado que refuerzan el posicionamiento premium de la marca en el punto de venta. Cada exhibidor se fabricó a medida para adaptarse al layout específico de cada tienda.',
      en: 'High-end commercial furniture for Aldo Ecuador stores. Precision carpentry with lacquered finishes, imported hardware, and tempered-glass surfaces that reinforce the brand\'s premium positioning at the point of sale. Each display unit was custom-built to fit the specific layout of every store.',
    },
    cover: '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.webp',
    gallery: [
      '/images/portfolio/arq-comercial/img/p2/DEST-1PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/DEST-2PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/DEST-3PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/DEST-4PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/DEST-5PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/DEST-6PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/INT-2PANDORA.webp',
      '/images/portfolio/arq-comercial/img/p2/INT-3PANDORA.webp',
    ],
  },
  'lg-vitrina-bucaramanga': {
    title: 'LG Vitrina Bucaramanga',
    client: 'LG',
    categoryEs: 'Arquitectura Comercial',
    year: '2024',
    description: {
      es: 'Intervención de vitrina comercial LG dentro del punto de venta TownCenter en Bucaramanga. Diseño y fabricación de módulos de exhibición con iluminación LED integrada, estructura metálica y carpintería de acabado fino para presentar el portafolio LG dentro de un espacio comercial ya existente. Instalación coordinada en sitio sin interrumpir la operación diaria del punto de venta.',
      en: 'An LG showcase intervention inside the TownCenter retail location in Bucaramanga. Design and fabrication of display modules with integrated LED lighting, a metal structure, and fine-finish carpentry to present LG\'s product portfolio within an existing retail space. On-site installation was coordinated without interrupting the store\'s daily operations.',
    },
    cover: '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.webp',
    gallery: [
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-1.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-2.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-3.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-4.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-5.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina_buc_DEST-6.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_01.webp',
      '/images/portfolio/arq-comercial/img/p3/vitrina-bucaramanga_02.webp',
    ],
  },
  'olimpica-licores': {
    title: 'Olímpica Licores',
    client: 'Olímpica',
    categoryEs: 'Góndolas',
    year: '2024',
    description: {
      es: 'Góndolas de exhibición para la sección de licores de Olímpica. Estructura en metalmecánica con acabado en tonos oscuros y detalles en cobre, señalización retroiluminada con el nombre de cada categoría y medallones circulares informativos integrados en el mueble. Un desarrollo pensado para darle a la sección de licores una identidad visual propia dentro del supermercado, sin sacrificar capacidad de almacenaje ni exhibición de producto.',
      en: 'Display gondolas for Olímpica\'s liquor section. A metalworked structure with a dark-toned finish and copper details, backlit signage naming each category, and circular informational medallions integrated into the fixture. Designed to give the liquor section its own visual identity within the supermarket, without sacrificing storage capacity or product display.',
    },
    cover: '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.webp',
    gallery: [
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-1.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-2.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-3.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-4.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-DES-5.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_DES-6.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-1.webp',
      '/images/portfolio/gondolas/imge/01/GONDOLAS_-INT-2.webp',
    ],
  },
  'olimpica-zona-fit': {
    title: 'Olímpica Zona Fit',
    client: 'Olímpica',
    categoryEs: 'Góndolas',
    year: '2021',
    description: {
      es: 'Zona Fit Olímpica: exhibición especializada para productos de fitness y nutrición deportiva. Góndolas modulares fabricadas en metalmecánica, con sistema de iluminación LED y señalética de alto impacto visual que diferencia esta sección del resto del supermercado. El diseño permite reorganizar los módulos según la rotación de producto.',
      en: 'Olímpica Zona Fit: specialized display fixtures for fitness and sports nutrition products. Modular gondolas built in metalwork, with an LED lighting system and high-impact signage that sets this section apart from the rest of the supermarket. The design allows the modules to be reorganized according to product turnover.',
    },
    cover: '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.webp',
    gallery: [
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-1.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-2.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-3.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-4.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-5.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_DEST-6.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-2.webp',
      '/images/portfolio/gondolas/imge/02/zona-fit_INT-3.webp',
    ],
  },
  'olimpica-gondolas': {
    title: 'Olímpica Góndolas',
    client: 'Olímpica',
    categoryEs: 'Góndolas',
    year: '2022',
    description: {
      es: 'Sistema completo de góndolas para distintas secciones de Olímpica. Fabricación metalmecánica de alta resistencia con capacidad de carga superior a la estándar, acabados en pintura electrostática y sistema de estanterías ajustables que se adapta al tipo y volumen de cada producto. Un desarrollo a escala pensado para múltiples puntos de venta.',
      en: 'A complete gondola system for various sections of Olímpica. High-strength metalworked fabrication with above-standard load capacity, electrostatic paint finishes, and an adjustable shelving system that adapts to the type and volume of each product. A large-scale rollout designed for multiple points of sale.',
    },
    cover: '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.webp',
    gallery: [
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-1.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-2.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-3.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-4.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-5.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_DEST-6.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-2.webp',
      '/images/portfolio/gondolas/imge/03/gondolas_2_INT-3.webp',
    ],
  },
  'isimo-to-go': {
    title: 'Isimo To Go',
    client: 'Isimo',
    categoryEs: 'Góndolas',
    year: '2026',
    description: {
      es: 'Sistema modular de autoservicio "Isimo To Go" para puntos de venta desatendidos en edificios corporativos y zonas de alto tráfico. Góndolas metalmecánicas organizadas por categoría —mundo saludable, bebidas y snacks— con iluminación LED integrada bajo cada nivel y señalética retroiluminada de marca. Incluye nevera vertical para bebidas frías, mueble de base en carpintería con paneles de madera texturizada y estación de autopago con lector de código de barras y datáfono integrados. Un formato replicable que hemos instalado en varias sedes manteniendo la misma calidad de acabado y tiempos de montaje ajustados.',
      en: 'A modular self-service system, "Isimo To Go," for unattended points of sale in corporate buildings and high-traffic areas. Metalworked gondolas organized by category — healthy options, beverages, and snacks — with integrated LED lighting under every level and backlit brand signage. Includes an upright cooler for cold beverages, a carpentry base unit with textured wood paneling, and a self-checkout station with an integrated barcode scanner and card reader. A replicable format we\'ve installed across multiple locations, maintaining the same finish quality and tight installation timelines.',
    },
    cover: '/images/portfolio/gondolas/isimo/isimo-portada.webp',
    gallery: [
      '/images/portfolio/gondolas/isimo/isimo-portada.webp',
      '/images/portfolio/gondolas/isimo/isimo-01.webp',
      '/images/portfolio/gondolas/isimo/isimo-02.webp',
      '/images/portfolio/gondolas/isimo/isimo-03.webp',
      '/images/portfolio/gondolas/isimo/isimo-04.webp',
      '/images/portfolio/gondolas/isimo/isimo-05.webp',
      '/images/portfolio/gondolas/isimo/isimo-06.webp',
      '/images/portfolio/gondolas/isimo/isimo-07.webp',
      '/images/portfolio/gondolas/isimo/isimo-08.webp',
      '/images/portfolio/gondolas/isimo/isimo-09.webp',
    ],
  },
  'lg-road-show': {
    title: 'LG Road Show',
    client: 'LG',
    categoryEs: 'Arquitectura Efímera',
    year: '2026',
    description: {
      es: 'Activación itinerante para LG con múltiples ambientes de producto dentro de un mismo salón de eventos: sala de TV con pedestales retroiluminados para las líneas OLED y QNED AI, torre de lavandería "Encaje perfecto" con iluminación RGB integrada, cocina completa con nevera, estufa e isla en barra para mostrar línea blanca en uso real, y una zona de lounge con divisor de listones de madera. Carpintería, metalmecánica e impresión de gran formato combinadas en un montaje modular pensado para armarse y desarmarse entre sedes sin perder el nivel de terminación de un stand fijo.',
      en: 'A traveling activation for LG featuring multiple product environments within a single event venue: a TV room with backlit pedestals for the OLED and QNED AI lines, a "Perfect Fit" laundry tower with integrated RGB lighting, a full kitchen with fridge, range, and island bar to show the appliance line in real use, and a lounge zone with a wood-slat divider. Carpentry, metalworking, and large-format printing combined in a modular build designed to be assembled and disassembled between venues without losing the finish level of a permanent stand.',
    },
    cover: '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-portada.webp',
    gallery: [
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-portada.webp',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-01.webp',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-02.webp',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-03.webp',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-04.webp',
      '/images/portfolio/arq-efimera/lg-road-show/lg-roadshow-05.webp',
    ],
  },
  'plataforma-masajeadoras-el-dorado': {
    title: 'Plataforma Sillas Masajeadoras — El Dorado',
    client: 'El Dorado',
    categoryEs: 'Mobiliario',
    year: '2026',
    description: {
      es: 'Plataforma elevada en madera con iluminación LED perimetral para alojar cápsulas de masaje Zero-Gravity en las salas de espera del Aeropuerto Internacional El Dorado. Estructura de piso a la medida de cada capsula, acabado en piso laminado tipo madera, cableado y anclajes ocultos para las tres unidades, y totem de señalización con panel retroiluminado y frente en listones de madera a juego. Replicada en distintos puntos del terminal, pensada para resistir el tránsito constante de pasajeros sin perder terminación.',
      en: 'A raised wood platform with perimeter LED lighting to house Zero-Gravity massage capsules in the waiting areas of El Dorado International Airport. A floor structure custom-built to each capsule, wood-look laminate flooring finish, concealed wiring and anchoring for the three units, and a signage totem with a backlit panel and a matching wood-slat front. Replicated at different points across the terminal, built to withstand constant passenger traffic without losing its finish.',
    },
    cover: '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-portada.webp',
    gallery: [
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-portada.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-01.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-02.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-03.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-04.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-05.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-06.webp',
      '/images/portfolio/mobiliario/aeropuerto-el-dorado/aeropuerto-07.webp',
    ],
  },
  'nespresso-al-agua-patos': {
    title: 'Stand Nespresso × Al Agua Patos',
    client: 'Nespresso',
    categoryEs: 'Arquitectura Efímera',
    year: '2026',
    description: {
      es: 'Stand efímero para la colaboración entre Nespresso y Al Agua Patos durante la Feria EVA. Módulo de madera con esquinas curvas y cubierta con logotipo retroiluminado en ambas fachadas, más cortinas enrollables perimetrales para cerrar el punto fuera de horario de feria. Interior con barra de servicio en madera y blanco, exhibidor vertical de cápsulas organizado por color y sabor con iluminación integrada, y zona de repostería a cargo de Al Agua Patos. Carpintería e impresión de gran formato para toda la señalética, con montaje pensado para lucir tan bien de día como iluminado de noche.',
      en: 'A temporary stand for the collaboration between Nespresso and Al Agua Patos during the EVA Fair. A wood module with curved corners and a canopy featuring a backlit logo on both facades, plus perimeter roll-down curtains to close the space outside fair hours. The interior features a service bar in wood and white, a vertical capsule display organized by color and flavor with integrated lighting, and a pastry zone run by Al Agua Patos. Carpentry and large-format printing for all signage, built to look just as good by day as it does lit up at night.',
    },
    cover: '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-portada.webp',
    gallery: [
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-portada.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-01.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-02.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-03.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-04.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-05.webp',
      '/images/portfolio/arq-efimera/nespresso-al-agua-patos/nespresso-06.webp',
    ],
  },
  'relojeria-falabella-unicentro': {
    title: 'Relojería Falabella Unicentro',
    client: 'Falabella',
    categoryEs: 'Arquitectura Comercial',
    year: '2026',
    description: {
      es: 'Rediseño integral de la relojería Falabella en Unicentro: un recorrido de vitrinas iluminadas que convierte cada marca —Casio, Fossil, Tissot, Guess, Citizen— en una experiencia propia dentro del mismo pasillo. Islas y muros en metal negro con luz LED perimetral, paneles publicitarios retroiluminados que rotan con cada campaña, y acabados en mármol que elevan el punto de venta al nivel de una boutique. Cada vitrina se pensó para que el reloj sea la estrella: vidrio de alta transparencia, iluminación cenital de precisión y señalética que vende sin gritar.',
      en: 'A full redesign of the Falabella watch department at Unicentro: a run of illuminated showcases that turns each brand — Casio, Fossil, Tissot, Guess, Citizen — into its own experience within the same aisle. Islands and walls in black metal with perimeter LED lighting, backlit ad panels that rotate with each campaign, and marble finishes that elevate the point of sale to boutique level. Every showcase was designed to make the watch the star: high-clarity glass, precision overhead lighting, and signage that sells without shouting.',
    },
    cover: '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-portada.webp',
    gallery: [
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-portada.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-01.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-02.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-03.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-04.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-05.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-06.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-07.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-08.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-09.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-10.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-11.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-12.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-13.webp',
      '/images/portfolio/arq-comercial/relojeria-falabella/relojeria-14.webp',
    ],
  },
  'falabella-colina': {
    title: 'Calzado Falabella Colina',
    client: 'Falabella',
    categoryEs: 'Arquitectura Comercial',
    year: '2026',
    description: {
      es: 'Rediseño del departamento de calzado en Falabella Centro Colina: un recorrido de zonas por marca —Nike, Adidas Originals, Puma, Reebok, New Balance, Veja, Michael Kors, Dr. Martens, Aldo y más— unidas por un mismo lenguaje de mármol, metal negro y detalles en latón. Muros con cubículos retroiluminados que exhiben cada caja como pieza de colección, letreros suspendidos con follaje artificial sobre cada marca, y un sistema de mesas anidadas en mármol y metal que se reconfigura según la temporada y las promociones. Un piso de venta pensado para que cada marca tenga su propio momento sin romper la coherencia del espacio completo.',
      en: 'A redesign of the footwear department at Falabella Centro Colina: a sequence of brand zones — Nike, Adidas Originals, Puma, Reebok, New Balance, Veja, Michael Kors, Dr. Martens, Aldo, and more — unified by a shared design language of marble, black metal, and brass details. Walls with backlit cubbies that showcase each shoebox like a collector\'s piece, suspended signage with artificial foliage above every brand, and a system of nested marble-and-metal tables that reconfigures according to season and promotions. A sales floor designed to give every brand its own moment without breaking the coherence of the space as a whole.',
    },
    cover: '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-portada.webp',
    gallery: [
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-portada.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-01.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-02.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-03.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-04.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-05.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-06.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-07.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-08.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-09.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-10.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-11.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-12.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-13.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-14.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-15.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-16.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-17.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-18.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-19.webp',
      '/images/portfolio/arq-comercial/falabella-colina/falabella-colina-20.webp',
    ],
  },
  'olimpica-mallorquin': {
    title: 'Olímpica Mallorquín',
    client: 'Olímpica',
    categoryEs: 'Góndolas',
    year: '2026',
    description: {
      es: 'Renovación integral del supermercado Olímpica Mallorquín, con foco en el sistema de góndolas para licores: paredes en negro mate con perfilería en cobre, letrero volumétrico "licores" y rótulos por categoría —whiskys, tequila, vodka y ginebra, rones y aguardientes, vino tinto— sobre piso en madera, más un muro refrigerado de cervezas con señalética retroiluminada. El mismo lenguaje de carpintería y metalmecánica se extendió a la zona fit, a frutas y verduras —con carro rústico sobre ruedas de tractor— y a la cúpula en listones de madera que corona panadería y delicatessen. Un proyecto a escala de tienda completa, entregado listo para su apertura.',
      en: 'A full renovation of the Olímpica Mallorquín supermarket, centered on the liquor gondola system: matte-black walls with copper trim, a volumetric "licores" sign, and category signage — whiskies, tequila, vodka and gin, rum and aguardiente, red wine — over a wood floor, plus a refrigerated beer wall with backlit signage. The same carpentry and metalworking language extends to the fitness section, the produce area — with a rustic cart on tractor wheels — and the wood-slat dome crowning the bakery and delicatessen. A full store-scale project, delivered ready to open.',
    },
    cover: '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-portada.webp',
    gallery: [
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-portada.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-01.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-02.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-03.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-04.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-05.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-06.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-07.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-08.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-09.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-10.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-11.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-12.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-13.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-14.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-15.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-16.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-17.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-18.webp',
      '/images/portfolio/gondolas/olimpica-mallorquin/mallorquin-19.webp',
    ],
  },
  'oficinas-bogota': {
    title: 'Oficinas Bogotá',
    client: 'Corporativo',
    categoryEs: 'Mobiliario',
    year: '2023',
    description: {
      es: 'Mobiliario corporativo para oficinas en Bogotá: puestos de trabajo modulares en tablero enchapado en madera, paneles divisorios de color como elemento de identidad visual entre áreas y jardineras integradas que suavizan el ambiente industrial del espacio. Carpintería de alta calidad con acabados lacados y herrajes importados, fabricada e instalada a la medida del layout de la oficina.',
      en: 'Corporate furniture for offices in Bogotá: modular workstations in wood-veneer panel, colored divider panels used as a visual identity element between areas, and integrated planters that soften the space\'s industrial feel. High-quality carpentry with lacquered finishes and imported hardware, custom-built and installed to fit the office layout.',
    },
    cover: '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.webp',
    gallery: [
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-1.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-2.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-3.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-4.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-5.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-DES-6.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-1.webp',
      '/images/portfolio/mobiliario/img/01/OFI-BOGOTÁ-INT-2.webp',
    ],
  },
  'oficinas-barranquilla': {
    title: 'Oficinas Barranquilla',
    client: 'Corporativo',
    categoryEs: 'Mobiliario',
    year: '2021',
    description: {
      es: 'Mobiliario corporativo para oficinas en Barranquilla: puestos de trabajo ergonómicos, muebles de archivo y áreas colaborativas fabricadas con materiales de primera calidad. Carpintería de precisión en cada puesto, pensada para maximizar el uso del espacio sin sacrificar comodidad ni estética del ambiente de trabajo.',
      en: 'Corporate furniture for offices in Barranquilla: ergonomic workstations, filing units, and collaborative areas built with top-grade materials. Precision carpentry at every workstation, designed to maximize the use of space without sacrificing comfort or the aesthetics of the work environment.',
    },
    cover: '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.webp',
    gallery: [
      '/images/portfolio/mobiliario/img/02/DEST-1_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/DEST-2_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/DEST-3_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/DEST-4_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/DEST-5_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/DEST-6_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/INT-2_OFI_-BARRANQUILLA.webp',
      '/images/portfolio/mobiliario/img/02/INT-3_OFI_-BARRANQUILLA.webp',
    ],
  },
  'mobiliario-hogar': {
    title: 'Mobiliario Hogar',
    client: 'Corporativo',
    categoryEs: 'Mobiliario',
    year: '2022',
    description: {
      es: 'Proyecto integral de mobiliario para hogar, con diseño personalizado y fabricación en maderas nobles. Piezas únicas trabajadas por nuestro equipo de ebanistas, con acabados premium que combinan funcionalidad y estética de alto nivel para espacios residenciales exigentes.',
      en: 'A full home furniture project, with custom design and fabrication in fine woods. One-of-a-kind pieces crafted by our team of cabinetmakers, with premium finishes that combine functionality and high-level aesthetics for demanding residential spaces.',
    },
    cover: '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.webp',
    gallery: [
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-1.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-2.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-3.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-4.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-5.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_DEST-6.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-2.webp',
      '/images/portfolio/mobiliario/img/03/mobiliario_3_INT-3.webp',
    ],
  },
  'nestle-congreso': {
    title: 'Nestlé Congreso Pediatría',
    client: 'Nestlé',
    categoryEs: 'Publicidad',
    year: '2023',
    description: {
      es: 'Stand para el Congreso Colombiano de Pediatría de Nestlé. Fabricación integral del espacio: estructura, carpintería, impresión de gran formato y señalización médica especializada. Un stand funcional pensado para la interacción con profesionales de la salud, cumpliendo los estándares visuales y de contenido que exige la marca en un entorno científico.',
      en: 'A stand for Nestlé\'s presence at the Colombian Congress of Pediatrics. Full production of the space: structure, carpentry, large-format printing, and specialized medical signage. A functional stand designed for interaction with healthcare professionals, meeting the visual and content standards the brand requires in a scientific setting.',
    },
    cover: '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.webp',
    gallery: [
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-1.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-2.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-3.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-4.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-5.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_DEST-6.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-2.webp',
      '/images/portfolio/publicidad/img/01/evento-nestle_INT-3.webp',
    ],
  },
  'mundo-playa': {
    title: 'Mundo Playa Olímpica',
    client: 'Olímpica',
    categoryEs: 'Creativo',
    year: '2022',
    description: {
      es: 'Intervención creativa Mundo Playa para Olímpica: diseño conceptual y fabricación de elementos decorativos estacionales, señalización temática y displays de producto para la temporada de playa. Un desarrollo que combina carpintería, impresión de gran formato y montaje en sitio para transformar la experiencia de compra durante la campaña.',
      en: 'The Mundo Playa creative intervention for Olímpica: concept design and fabrication of seasonal decorative elements, themed signage, and product displays for the beach season. A project that combines carpentry, large-format printing, and on-site installation to transform the shopping experience during the campaign.',
    },
    cover: '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.webp',
    gallery: [
      '/images/portfolio/creativo/img/01/DEST-1MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/DEST-2MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/DEST-3MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/DEST-4MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/DEST-5MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/DEST-6MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/INT-2MUNDO-PLAYA.webp',
      '/images/portfolio/creativo/img/01/INT-3MUNDO-PLAYA.webp',
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projectsData[slug]
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const { t, lang } = useLanguage()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const categories = t.proyectos.categories
  const displayCategory = (categoryEs: string) => {
    const idx = categoryMap[categoryEs]
    return idx !== undefined ? categories[idx] : categoryEs
  }

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '76px' }}>
        <TextReveal as="h1" style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: '48px', color: 'var(--text)', marginBottom: '16px', display: 'block' }}>{t.proyectoDetail.notFoundTitle}</TextReveal>
        <Link href="/proyectos" style={{ color: 'var(--accent)', fontWeight: 600 }}>{t.proyectoDetail.notFoundBack}</Link>
      </div>
    )
  }

  const logoFile = clientLogoMap[project.client]

  const relatedProjects = Object.entries(projectsData)
    .filter(([s, proj]) => s !== slug && proj.categoryEs === project.categoryEs)
    .slice(0, 2)
    .map(([s, proj]) => ({ slug: s, ...proj }))

  return (
    <>
      {/* Intro */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'var(--accent)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <Link href="/proyectos" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: 'var(--text-muted)', textDecoration: 'none',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em',
              marginBottom: '28px',
            }}>
              {t.proyectoDetail.backLink}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{displayCategory(project.categoryEs)}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>· {project.year}</span>
            </div>
            <TextReveal as="h1" style={{
              fontFamily: 'var(--font-barlow), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              display: 'block',
            }}>{project.title}</TextReveal>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: '56px', alignItems: 'center' }} className="grid-2">
            <Reveal>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '14px' }}>
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>{t.proyectos.clientLabel}</p>
                {logoFile ? (
                  <div style={{ position: 'relative', width: '160px', height: '50px', marginBottom: '28px' }}>
                    <Image
                      src={`/images/logo/${logoFile}`}
                      alt={project.client}
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'left center' }}
                    />
                  </div>
                ) : (
                  <p style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '28px' }}>{project.client}</p>
                )}
              </Reveal>
              <Reveal delay={0.2} direction="left">
                <TextReveal as="p" style={{ fontSize: '18px', lineHeight: 1.9, color: 'var(--text-muted)', display: 'block' }}>{project.description[lang]}</TextReveal>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section style={{ padding: '0 0 120px', background: 'var(--white)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{t.proyectoDetail.galleryLabel}</span>
            </div>
          </Reveal>
          <RotatingGallery images={project.gallery} title={project.title} onImageClick={setLightboxImg} />
        </div>
      </section>

      {/* Proyectos relacionados */}
      {relatedProjects.length > 0 && (
        <section style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '2px', background: 'var(--accent)' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)' }}>{t.proyectoDetail.relatedTag}</span>
              </div>
              <TextReveal as="h2" style={{
                fontFamily: 'var(--font-barlow)', fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1,
                letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--text)',
                marginBottom: '48px', display: 'block',
              }}>{t.proyectoDetail.relatedTitle1}<br /><span style={{ color: 'var(--accent)' }}>{t.proyectoDetail.relatedAccent}</span></TextReveal>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4px', background: 'var(--border)' }}>
              {relatedProjects.map((rp, i) => (
                <Reveal key={rp.slug} delay={i * 0.08}>
                  <Link href={`/proyectos/${rp.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#e8e6e2' }}>
                      <Image src={rp.cover} alt={rp.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="proj-img" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)', zIndex: 1 }} />
                      <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 2 }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>{displayCategory(rp.categoryEs)}</p>
                        <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: '17px', textTransform: 'uppercase', color: '#fff', lineHeight: 1.2 }}>{rp.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA — única invitación a iniciar un proyecto similar */}
      <section style={{ padding: '100px 0', background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}>
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
              {t.proyectoDetail.ctaTitle.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </TextReveal>
            <TextReveal as="p" delay={0.15} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.85)', marginBottom: '40px', maxWidth: '440px', margin: '0 auto 40px', display: 'block' }}>
              {t.proyectoDetail.ctaBody}
            </TextReveal>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contacto" style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#fff', color: 'var(--red)',
                padding: '18px 48px', fontSize: '14px', fontWeight: 800,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {t.home.ctaBtn}
              </Link>
              <Link href="/proyectos" style={{
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
                padding: '18px 48px', fontSize: '14px', fontWeight: 800,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {t.proyectoDetail.moreProjectsBtn}
              </Link>
            </div>
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
                alt={t.proyectoDetail.lightboxAlt}
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
