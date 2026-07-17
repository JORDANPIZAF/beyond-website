'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface GalleryProject {
  slug: string
  img: string
  title: string
  category: string
}

const categoryColors: Record<string, string> = {
  'Arquitectura Efímera': '#E02907',
  'Ephemeral Architecture': '#E02907',
  'Arquitectura Comercial': '#A81C09',
  'Commercial Architecture': '#A81C09',
  'Góndolas': '#FF5A36',
  'Gondolas': '#FF5A36',
  'Mobiliario': '#8C1409',
  'Furniture': '#8C1409',
  'Publicidad': '#FF8360',
  'Advertising': '#FF8360',
  'Creativo': '#C4300E',
  'Creative': '#C4300E',
}

function categoryColor(category: string) {
  return categoryColors[category] ?? '#E02907'
}

export default function ProjectGallery({ projects }: { projects: GalleryProject[] }) {
  return (
    <div className="project-gallery">
      {projects.map((p) => (
        <Link key={p.slug} href={`/proyectos/${p.slug}`} className="project-gallery-item">
          <Image
            src={p.img}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="project-gallery-overlay" />
          <div className="project-gallery-icon">
            <ArrowUpRight size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="project-gallery-info">
            <span className="project-gallery-category" style={{ background: categoryColor(p.category) }}>{p.category}</span>
            <h3 className="project-gallery-title">{p.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
