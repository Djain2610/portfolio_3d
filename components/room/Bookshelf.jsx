"use client";
import { Center } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";

export default function Bookshelf(props) {
  const { scene } = useSafeGLTF("/models/book_shelf_low_poly.glb");
  return (
    <group {...props} scale={2.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}
