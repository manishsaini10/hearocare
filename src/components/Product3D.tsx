"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, MeshTransmissionMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function ProductMesh() {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture("/images/Hear-o-Care.png");

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={[2.2, 2.2, 0.3]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial
          map={texture}
          transparent
          side={2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function BackgroundGlow() {
  return (
    <mesh scale={8} position={[0, 0, -2]}>
      <planeGeometry />
      <meshBasicMaterial color="#0f172a" />
    </mesh>
  );
}

export default function Product3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "auto" }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#e91e63" />
      <pointLight position={[-3, -2, 4]} intensity={0.8} color="#0284c7" />
      <BackgroundGlow />
      <ProductMesh />
    </Canvas>
  );
}
