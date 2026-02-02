"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Poster(props) {
  const { scene } = useSafeGLTF("/poster.glb");
  return (
    <group {...props} scale={0.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
