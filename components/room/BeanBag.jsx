"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function BeanBag(props) {
  const { scene } = useSafeGLTF("/models/bean_bag.glb");
  return (
    <group {...props} scale={1.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
