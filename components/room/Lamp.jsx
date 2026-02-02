"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Lamp(props) {
  const { scene } = useSafeGLTF("/models/floor_lamp.glb");
  return (
    <group {...props} scale={0.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
