'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const { scene } = useGLTF('/models/globe_model.glb');

  return <primitive object={scene} scale={1.5} />;
}
useGLTF.preload('/models/globe_model.glb');



export default function ModelCanvas() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 20 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <Globe />
        {/* <Beam /> */}
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={6} />
    </Canvas>
  );
}
