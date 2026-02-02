"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function BeanBag(props) {
  const { scene } = useGLTF("/models/bean_bag.glb");
  return (
    <group {...props} scale={1.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

