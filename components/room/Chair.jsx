"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Chair(props) {
  const { scene } = useSafeGLTF("/low_poly_computer_chair.glb");
  return (
    <group {...props} scale={0.6}>
      <Center>
        <primitive object={scene} castShadow receiveShadow />
      </Center>
    </group>
  );
}
