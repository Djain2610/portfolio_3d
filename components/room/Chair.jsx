"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Chair(props) {
  const { scene } = useGLTF("/low_poly_computer_chair.glb");
  return (
    <group {...props} scale={0.6}>
      <Center>
        <primitive object={scene} castShadow receiveShadow />
      </Center>
    </group>
  );
}
