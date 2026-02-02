"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Plant(props) {
  const { scene } = useGLTF("/models/potted_plant_low_poly.glb");
  return (
    <group {...props} scale={2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

