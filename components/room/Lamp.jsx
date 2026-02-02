"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Lamp(props) {
  const { scene } = useGLTF("/models/floor_lamp.glb");
  return (
    <group {...props} scale={0.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

