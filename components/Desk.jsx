"use client";
import { useGLTF, Center } from "@react-three/drei";
import { useMemo } from "react";

export default function Desk(props) {
  const { scene } = useGLTF("/desk_lowpoly.glb");

  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <group {...props}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}
