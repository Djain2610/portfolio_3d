"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Clock(props) {
  const { scene } = useSafeGLTF("/models/clock.glb");
  return (
    <group {...props} scale={3}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
