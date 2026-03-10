import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

function FloatingGeo() {
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh1.current) {
      mesh1.current.rotation.y = t * 0.4
      mesh1.current.rotation.x = t * 0.2
    }
    if (mesh2.current) {
      mesh2.current.rotation.y = -t * 0.3
      mesh2.current.rotation.z = t * 0.15
    }
    if (mesh3.current) {
      mesh3.current.rotation.x = t * 0.5
      mesh3.current.rotation.z = -t * 0.25
    }
  })

  return (
    <>
      {/* Core distort sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={mesh1}>
          <icosahedronGeometry args={[2, 2]} />
          <MeshDistortMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.1}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.85}
            wireframe
          />
        </mesh>
      </Float>

      {/* Outer wireframe */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={mesh2} scale={1.4}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Torus ring */}
      <Float speed={3} rotationIntensity={1.2} floatIntensity={0.5}>
        <mesh ref={mesh3} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3, 0.06, 8, 80]} />
          <meshStandardMaterial
            color="#ff6b35"
            emissive="#ff6b35"
            emissiveIntensity={0.7}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Sparkle particles */}
      <Sparkles count={60} scale={7} size={2} speed={0.4} color="#00ffff" opacity={0.7} />
      <Sparkles count={40} scale={5} size={1.5} speed={0.6} color="#7c3aed" opacity={0.5} />
    </>
  )
}

export default function Hero3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5,  5,  5]} intensity={1.5} color="#00ffff" />
        <pointLight position={[-5,-5,  5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[0,  0, -5]} intensity={0.5} color="#ff6b35" />
        <FloatingGeo />
      </Canvas>
    </div>
  )
}
