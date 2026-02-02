"use client";
import { Center } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

export default function Bookshelf(props) {
  const { scene } = useGLTF("/models/book_shelf_low_poly.glb");
  return (
    <group {...props} scale={2.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

