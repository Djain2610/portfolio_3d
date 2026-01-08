"use client";
import { useGLTF, Center } from "@react-three/drei";

export default function Door(props) {
  const { scene } = useGLTF("/low_poly_door.glb");
  return (
    <group {...props} scale={2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
