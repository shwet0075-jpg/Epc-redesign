import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

function Rack({ position, accent = '#F08020' }) {
  return <group position={position}>
    <mesh castShadow><boxGeometry args={[1.6, 2.9, 1.25]} /><meshStandardMaterial color="#063A25" metalness={0.85} roughness={0.28} /></mesh>
    <mesh position={[0, 0, .64]}><planeGeometry args={[1.25, 2.48]} /><meshStandardMaterial color="#0B2016" emissive="#062B1A" emissiveIntensity={1} /></mesh>
    {[-.85, -.28, .28, .85].map((y) => <mesh key={y} position={[0, y, .67]}><boxGeometry args={[1.08, .08, .04]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.8} /></mesh>)}
  </group>;
}

function Infrastructure() {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * .13;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .75) * .07;
  });
  return <group ref={group} rotation={[-.12, -.45, 0]}>
    <Rack position={[-1.15, 0, 0]} />
    <Rack position={[1.15, 0, 0]} accent="#82D6A3" />
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.54, 0]}><planeGeometry args={[7, 7]} /><meshStandardMaterial color="#064127" metalness={.5} roughness={.58} /></mesh>
    <mesh position={[0, 1.45, 0]}><torusGeometry args={[2.05, .018, 10, 100]} /><meshBasicMaterial color="#F08020" /></mesh>
  </group>;
}

function Atmosphere() {
  const points = useMemo(() => {
    const positions = new Float32Array(132);
    for (let index = 0; index < 44; index += 1) {
      const angle = index * 2.399;
      const radius = 1.8 + (index % 8) * .39;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = ((index * 19) % 32) / 10 - 1.6;
      positions[index * 3 + 2] = Math.sin(angle) * radius - 1;
    }
    return positions;
  }, []);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} /></bufferGeometry><pointsMaterial color="#B5E5C8" size={.035} sizeAttenuation transparent opacity={.72} /></points>;
}

export default function HeroInfrastructureScene() {
  return <Canvas className="hero-r3f-canvas" dpr={[1, 1.5]} camera={{ position: [0, 1.4, 7.4], fov: 42 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
    <color attach="background" args={['#0D1410']} />
    <fog attach="fog" args={['#0D1410', 6, 13]} />
    <ambientLight intensity={1.1} />
    <pointLight color="#F08020" position={[3, 4, 3]} intensity={35} distance={10} />
    <pointLight color="#3ACD7B" position={[-4, 1, 2]} intensity={25} distance={9} />
    <Infrastructure />
    <Atmosphere />
  </Canvas>;
}
