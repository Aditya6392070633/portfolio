import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Stars, OrbitControls, Trail } from '@react-three/drei'
import * as THREE from 'three'

const SKILLS_DATA = [
  { skill: 'React.js',   color: '#61dafb', position: [-4.5,  1.0,  0], radius: 1.0 },
  { skill: 'Node.js',    color: '#6cc24a', position: [ 4.5,  1.0,  0], radius: 0.9 },
  { skill: 'PHP/Laravel',color: '#8892bf', position: [ 0,    3.5,  0], radius: 0.85 },
  { skill: 'MySQL',      color: '#00d4aa', position: [ 0,   -3.5,  0], radius: 0.85 },
  { skill: 'School ERP', color: '#ff6b35', position: [-3.0, -2.0,  0], radius: 1.1 },
  { skill: 'Python',     color: '#ffd43b', position: [ 3.0, -2.0,  0], radius: 0.8 },
  { skill: 'JavaScript', color: '#f7df1e', position: [-4.0,  -0.5, 1], radius: 0.9 },
  { skill: 'REST APIs',  color: '#7c3aed', position: [ 4.0,  -0.5, 1], radius: 0.85 },
]

function SkillPlanet({ position, color, skill, radius }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.006
    meshRef.current.rotation.x += 0.002
    // float
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8 + position[0]) * 0.18
    if (ringRef.current) {
      ringRef.current.rotation.x += 0.01
      ringRef.current.rotation.z += 0.005
    }
  })

  return (
    <group position={position}>
      {/* Glow sphere behind */}
      <mesh scale={1.35}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Main planet */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.45}
          metalness={0.7}
          roughness={0.15}
          wireframe={hovered}
        />
        <Html center distanceFactor={8}>
          <div className="planet-label" style={{ borderColor: color, color: color, opacity: hovered ? 1 : 0.7, transform: hovered ? 'scale(1.15)' : 'scale(1)', transition: 'all .3s' }}>
            {skill}
          </div>
        </Html>
      </mesh>

      {/* Saturn-like ring on hover */}
      {hovered && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[radius * 1.5, 0.06, 8, 60]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}

function OrbitingSatellite({ orbitRadius, speed, color, offset = 0 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.sin(t) * orbitRadius
    ref.current.position.z = Math.cos(t) * orbitRadius
    ref.current.position.y = Math.sin(t * 0.5) * 1.5
  })
  return (
    <Trail width={0.6} length={6} color={color} attenuation={t => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    </Trail>
  )
}

function NeuralLinks({ nodes }) {
  const lines = useMemo(() => {
    const result = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0]
        const dy = nodes[i][1] - nodes[j][1]
        const dz = (nodes[i][2] || 0) - (nodes[j][2] || 0)
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
        if (dist < 6) {
          result.push({ from: nodes[i], to: nodes[j], dist })
        }
      }
    }
    return result
  }, [nodes])

  return (
    <>
      {lines.map((l, i) => {
        const points = [
          new THREE.Vector3(l.from[0], l.from[1], l.from[2] || 0),
          new THREE.Vector3(l.to[0],   l.to[1],   l.to[2] || 0),
        ]
        const geo = new THREE.BufferGeometry().setFromPoints(points)
        const opacity = Math.max(0.04, 0.25 * (1 - l.dist / 6))
        return (
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#00ffff" transparent opacity={opacity} />
          </line>
        )
      })}
    </>
  )
}

function GalaxyParticles() {
  const positions = useMemo(() => {
    const arr = []
    for (let i = 0; i < 4000; i++) {
      arr.push(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      )
    }
    return new Float32Array(arr)
  }, [])

  const colors = useMemo(() => {
    const arr = []
    const palette = [[0,1,1],[0.47,0.22,0.93],[1,0.42,0.21],[0,1,0.53]]
    for (let i = 0; i < 4000; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      arr.push(...c)
    }
    return new Float32Array(arr)
  }, [])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={4000} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={4000} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.7} />
    </points>
  )
}

function MouseGravity({ groupRef }) {
  const { mouse } = useThree()
  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (mouse.x * 0.4 - groupRef.current.rotation.y) * 0.03
    groupRef.current.rotation.x += (-mouse.y * 0.2 - groupRef.current.rotation.x) * 0.03
  })
  return null
}

export default function SkillGalaxy() {
  const groupRef = useRef()
  const nodes = SKILLS_DATA.map(s => s.position)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 14], fov: 60 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00ffff" />
        <pointLight position={[-10,-10,-10]} intensity={0.6} color="#7c3aed" />

        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0.5} fade />

        <GalaxyParticles />

        <group ref={groupRef}>
          {SKILLS_DATA.map((s, i) => (
            <SkillPlanet key={i} {...s} />
          ))}
          <NeuralLinks nodes={nodes} />
          <OrbitingSatellite orbitRadius={6} speed={0.5}  color="#00ffff" offset={0} />
          <OrbitingSatellite orbitRadius={8} speed={0.3}  color="#ff6b35" offset={2} />
          <OrbitingSatellite orbitRadius={5} speed={0.7}  color="#7c3aed" offset={4} />
        </group>

        <MouseGravity groupRef={groupRef} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}
