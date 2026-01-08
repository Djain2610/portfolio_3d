"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Lamp(props) {
  const { scene } = useGLTF("/floor_lamp.glb");
  return (
    <group {...props} scale={0.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
