"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Poster(props) {
  const { scene } = useGLTF("/poster.glb");
  return (
    <group {...props} scale={0.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
