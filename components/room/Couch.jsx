"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Couch(props) {
  const { scene } = useGLTF("/old_couch.glb");
  return (
    <group {...props} scale={0.018}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
