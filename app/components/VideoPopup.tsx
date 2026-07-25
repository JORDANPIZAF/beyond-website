'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const VIDEO_SRC = '/videos/beyond-presentacion.mp4'
const VIDEO_VOLUME = 0.5

export default function VideoPopup() {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!open || !video) return

    video.volume = VIDEO_VOLUME
    video.muted = false
    video.play().catch(() => {
      // Autoplay con sonido bloqueado por el navegador: arranca muteado
      // y se desmutea en la primera interacción del usuario.
      video.muted = true
      video.play().catch(() => {})

      const unmute = () => {
        video.muted = false
        video.volume = VIDEO_VOLUME
        window.removeEventListener('click', unmute)
        window.removeEventListener('keydown', unmute)
      }
      window.addEventListener('click', unmute)
      window.addEventListener('keydown', unmute)
      return () => {
        window.removeEventListener('click', unmute)
        window.removeEventListener('keydown', unmute)
      }
    })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', maxWidth: '1187px' }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              style={{
                position: 'fixed', top: '24px', right: '24px', zIndex: 301,
                width: '36px', height: '36px', borderRadius: '999px',
                background: '#b2843c',
                border: '2px solid #fff',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              position: 'relative', width: '100%', paddingTop: '56.25%',
              borderRadius: '14px', overflow: 'hidden', background: '#000',
              boxShadow: '0 30px 90px rgba(0,0,0,0.55)',
            }}>
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                autoPlay
                loop
                playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
