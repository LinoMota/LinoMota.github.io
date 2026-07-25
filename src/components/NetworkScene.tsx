import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 46
const CONNECT_DISTANCE = 2.6
const RADIUS = 5.2

function generateNodes(count: number, radius: number) {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = radius * (0.55 + Math.random() * 0.45)
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.6,
        r * Math.cos(phi),
      ),
    )
  }
  return nodes
}

function buildEdges(nodes: THREE.Vector3[], maxDistance: number) {
  const positions: number[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j])
      if (dist < maxDistance) {
        positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
  }
  return new Float32Array(positions)
}

const RETRO_FRAME_SKIP = 3

function DistributedNetwork(props: ThreeElements['group']) {
  const groupRef = useRef<THREE.Group>(null)
  const frameCount = useRef(0)
  const nodes = useMemo(() => generateNodes(NODE_COUNT, RADIUS), [])
  const edgePositions = useMemo(() => buildEdges(nodes, CONNECT_DISTANCE), [nodes])
  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x
      arr[i * 3 + 1] = n.y
      arr[i * 3 + 2] = n.z
    })
    return arr
  }, [nodes])

  useFrame((state) => {
    if (!groupRef.current) return
    frameCount.current += 1
    if (frameCount.current % RETRO_FRAME_SKIP !== 0) return
    groupRef.current.rotation.y += 0.012
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
  })

  return (
    <group ref={groupRef} {...props}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4fd8b0" transparent opacity={0.18} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7cf7d0" size={0.09} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}

function Drift() {
  const ref = useRef<THREE.Group>(null)
  const frameCount = useRef(0)
  useFrame(({ pointer }) => {
    if (!ref.current) return
    frameCount.current += 1
    if (frameCount.current % RETRO_FRAME_SKIP !== 0) return
    ref.current.rotation.y += (pointer.x * 0.3 - ref.current.rotation.y) * 0.06
    ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * 0.06
  })
  return (
    <group ref={ref}>
      <DistributedNetwork />
    </group>
  )
}

export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      dpr={[0.4, 0.7]}
      gl={{ antialias: false, alpha: true }}
      className="!absolute inset-0"
      onCreated={({ gl }) => {
        gl.domElement.style.imageRendering = 'pixelated'
      }}
    >
      <fog attach="fog" args={['#05060a', 6, 12.5]} />
      <ambientLight intensity={0.6} />
      <Drift />
    </Canvas>
  )
}
