'use client'

import { useRef, useState, useEffect, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Stage, useGLTF } from '@react-three/drei'
import type { Group } from 'three'

// Radians per frame the model spins on its own when the user isn't dragging the bar
const AUTO_ROTATE_SPEED = 0.0035

function Model({
  modelPath,
  rotationRef,
  draggingRef,
}: {
  modelPath: string
  rotationRef: React.MutableRefObject<number>
  draggingRef: React.MutableRefObject<boolean>
}) {
  const { scene } = useGLTF(modelPath)
  const group = useRef<Group>(null)

  useFrame(() => {
    if (!draggingRef.current) {
      rotationRef.current += AUTO_ROTATE_SPEED
    }
    if (group.current) {
      group.current.rotation.y = rotationRef.current
    }
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/sao384-optimized.glb')
useGLTF.preload('/models/isla-licores-optimized.glb')

// Horizontal drag strip below the model — only ever rotates around Y (no tilt)
function RotateBar({
  rotationRef,
  draggingRef,
}: {
  rotationRef: React.MutableRefObject<number>
  draggingRef: React.MutableRefObject<boolean>
}) {
  const TRACK_WIDTH = 150
  const KNOB_SIZE = 26
  const MAX_KNOB_OFFSET = (TRACK_WIDTH - KNOB_SIZE) / 2

  const [dragging, setDragging] = useState(false)
  const [knobOffset, setKnobOffset] = useState(0)
  const startX = useRef(0)
  const startRotation = useRef(0)

  const handleMove = useCallback((clientX: number) => {
    const deltaX = clientX - startX.current
    rotationRef.current = startRotation.current + deltaX * 0.012
    setKnobOffset(Math.max(-MAX_KNOB_OFFSET, Math.min(MAX_KNOB_OFFSET, deltaX)))
  }, [rotationRef, MAX_KNOB_OFFSET])

  const endDrag = useCallback(() => {
    draggingRef.current = false
    setDragging(false)
    setKnobOffset(0)
  }, [draggingRef])

  useEffect(() => {
    if (!dragging) return
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) handleMove(e.touches[0].clientX) }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('mouseup', endDrag)
    window.addEventListener('touchend', endDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mouseup', endDrag)
      window.removeEventListener('touchend', endDrag)
    }
  }, [dragging, handleMove, endDrag])

  const startDrag = (clientX: number) => {
    draggingRef.current = true
    setDragging(true)
    startX.current = clientX
    startRotation.current = rotationRef.current
  }

  return (
    <div
      onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX) }}
      onTouchStart={(e) => { if (e.touches[0]) startDrag(e.touches[0].clientX) }}
      style={{
        position: 'absolute', bottom: '20px', left: '50%',
        transform: 'translateX(-50%)',
        width: `${TRACK_WIDTH}px`, height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none', userSelect: 'none',
        pointerEvents: 'auto',
        zIndex: 20,
      }}
    >
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: '4px', borderRadius: '999px',
        background: 'rgba(255,255,255,0.25)',
        transform: 'translateY(-50%)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(calc(-50% + ${knobOffset}px), -50%)`,
        width: `${KNOB_SIZE}px`, height: `${KNOB_SIZE}px`, borderRadius: '999px',
        background: '#E02907',
        border: '2px solid #fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
        transition: dragging ? 'none' : 'transform 0.25s ease',
      }} />
    </div>
  )
}

export default function Hero3DModel({
  modelPath,
  cameraZ = 13.02,
}: {
  modelPath: string
  cameraZ?: number
}) {
  const rotationRef = useRef(0)
  const draggingRef = useRef(false)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model modelPath={modelPath} rotationRef={rotationRef} draggingRef={draggingRef} />
          </Stage>
        </Suspense>
      </Canvas>
      <RotateBar rotationRef={rotationRef} draggingRef={draggingRef} />
    </div>
  )
}
