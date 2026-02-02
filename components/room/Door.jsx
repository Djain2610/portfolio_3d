"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Door(props) {
  const { scene } = useGLTF("/models/low_poly_door.glb");
  return (
    <group {...props} scale={2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

