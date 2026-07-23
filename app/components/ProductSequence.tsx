'use client'

import { useEffect, useRef, useState } from 'react'
import { MotionValue, useMotionValueEvent } from 'framer-motion'

const TOTAL_FRAMES = 266
const frameSrc = (n: number) => `/hero-sequence/${String(n).padStart(4, '0')}.webp`

interface Props {
  progress: MotionValue<number>
}

export default function ProductSequence({ progress }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const [ready, setReady] = useState(false)

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img) return false
    const ctx = canvas.getContext('2d')
    if (!ctx) return false

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const imgRatio = img.width / img.height
    const canvasRatio = cw / ch
    let drawW: number, drawH: number, offX: number, offY: number
    if (imgRatio > canvasRatio) {
      drawH = ch
      drawW = ch * imgRatio
      offX = (cw - drawW) / 2
      offY = 0
    } else {
      drawW = cw
      drawH = cw / imgRatio
      offX = 0
      offY = (ch - drawH) / 2
    }
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, offX, offY, drawW, drawH)
    return true
  }

  // Only start downloading the 266 frames once this section is actually approaching
  // the viewport — it mounts immediately with the page, but shouldn't compete with
  // the hero's own assets for bandwidth on first load.
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    let started = false
    let cancelled = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        observer.disconnect()

        const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)

        const loadImage = (i: number) => new Promise<void>(resolve => {
          const img = new Image()
          img.src = frameSrc(i + 1)
          img.onload = () => { images[i] = img; resolve() }
          img.onerror = () => resolve()
        })

        loadImage(0).then(() => {
          if (cancelled) return
          imagesRef.current = images
          drawFrame(0)
          setReady(true)

          // Load the rest with a small concurrency pool instead of one at a time —
          // sequential loading of 266 frames was far too slow to be ready by the
          // time the user actually scrolled into the scrubbing range.
          const CONCURRENCY = 8
          let next = 1
          const worker = async () => {
            while (!cancelled) {
              const i = next++
              if (i >= TOTAL_FRAMES) return
              await loadImage(i)
            }
          }
          Array.from({ length: CONCURRENCY }, worker)
        })
      },
      { rootMargin: '150px 0px' }
    )

    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }

  }, [])

  useMotionValueEvent(progress, 'change', (v) => {
    const scrubProgress = Math.min(v / 0.5, 1)
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(scrubProgress * (TOTAL_FRAMES - 1)))
    if (frameIndex === currentFrameRef.current) return
    if (drawFrame(frameIndex)) {
      currentFrameRef.current = frameIndex
    }
  })

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, [])

  return (
    <div ref={wrapperRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, background: '#0a0a0a' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  )
}
