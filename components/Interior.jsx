"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Interior() {
  const gltf = useSafeGLTF("/house_interior3.glb");

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
