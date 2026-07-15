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
            <p className="project-gallery-category">{p.category}</p>
            <h3 className="project-gallery-title">{p.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
