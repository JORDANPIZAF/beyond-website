'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const TILE_COUNT = 6
const INTERVAL_MS = 4500

interface TileProps {
  bucket: string[]
  title: string
  tileIndex: number
  onImageClick: (img: string) => void
}

function GalleryTile({ bucket, title, tileIndex, onImageClick }: TileProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (bucket.length <= 1) return
    let intervalId: ReturnType<typeof setInterval>
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrent(c => (c + 1) % bucket.length)
      }, INTERVAL_MS)
    }, tileIndex * 400)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [bucket.length, tileIndex])

  const img = bucket[current]

  return (
    <div
      onClick={() => onImageClick(img)}
      className="gallery-tile"
      style={{
        position: 'relative',
        height: '340px',
        overflow: 'hidden',
        cursor: 'zoom-in',
        background: '#e8e6e2',
        borderRadius: '12px',
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={img}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="proj-img"
          />
        </motion.div>
      </AnimatePresence>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0)',
        transition: 'background 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1,
      }} className="gallery-overlay">
        <span style={{ color: '#fff', fontSize: '28px', opacity: 0, transition: 'opacity 0.3s' }} className="zoom-icon">+</span>
      </div>
    </div>
  )
}

interface Props {
  images: string[]
  title: string
  onImageClick: (img: string) => void
}

export default function RotatingGallery({ images, title, onImageClick }: Props) {
  const buckets: string[][] = Array.from({ length: TILE_COUNT }, () => [])
  images.forEach((img, i) => buckets[i % TILE_COUNT].push(img))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }} className="grid-3">
      {buckets.map((bucket, i) => (
        bucket.length > 0 && (
          <GalleryTile key={i} bucket={bucket} title={title} tileIndex={i} onImageClick={onImageClick} />
        )
      ))}
    </div>
  )
}
