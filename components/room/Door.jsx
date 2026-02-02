"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Door(props) {
  const { scene } = useSafeGLTF("/low_poly_door.glb");
  return (
    <group {...props} scale={2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
