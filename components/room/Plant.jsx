"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Plant(props) {
  const { scene } = useSafeGLTF("/potted_plant_low_poly.glb");
  return (
    <group {...props} scale={2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
