"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Poster(props) {
  const { scene } = useGLTF("/models/poster.glb");
  return (
    <group {...props} scale={0.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

