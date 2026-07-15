'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Stage, useGLTF } from '@react-three/drei'
import type { Group } from 'three'

type MouseState = { x: number; y: number; active: boolean }

function Model({ mouseRef }: { mouseRef: React.MutableRefObject<MouseState> }) {
  const { scene } = useGLTF('/models/conector-cobre.glb')
  const group = useRef<Group>(null)

  useFrame(() => {
    if (!group.current) return
    const m = mouseRef.current
    const targetY = m.active ? m.x * Math.PI * 0.5 : 0
    const targetX = m.active ? -m.y * Math.PI * 0.15 : 0
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/conector-cobre.glb')

// How close the cursor must be (in pixels, from the model's center) to influence its rotation
const PROXIMITY_RADIUS = 260

export default function Hero3DModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, active: false })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < PROXIMITY_RADIUS) {
        mouseRef.current.active = true
        mouseRef.current.x = Math.max(-1, Math.min(1, dx / PROXIMITY_RADIUS))
        mouseRef.current.y = Math.max(-1, Math.min(1, dy / PROXIMITY_RADIUS))
      } else {
        mouseRef.current.active = false
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={1.4} {...({ maxDuration: 0 } as any)}>
            <Model mouseRef={mouseRef} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  )
}
