"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Couch(props) {
  const { scene } = useGLTF("/models/old_couch.glb");
  return (
    <group {...props} scale={0.018}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

