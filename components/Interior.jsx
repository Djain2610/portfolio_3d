"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Interior() {
  const gltf = useGLTF("/house_interior3.glb");

  useEffect(() => {
    const scene = gltf.scene;

    console.log("Scene children:", scene.children);

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.needsUpdate = true;
      }
    });
  }, [gltf]);

  return (
  <group position={[0, -5, 0]}>
    <primitive object={gltf.scene} />
  </group>
);

}
