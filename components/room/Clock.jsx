"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Clock(props) {
  const { scene } = useGLTF("/clock.glb");
  return (
    <group {...props} scale={3}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
