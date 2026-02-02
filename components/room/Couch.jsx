"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Couch(props) {
  const { scene } = useSafeGLTF("/old_couch.glb");
  return (
    <group {...props} scale={0.018}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
