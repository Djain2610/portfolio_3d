"use client";

import { useFrame } from "@react-three/fiber";
import { useAnimations, Html } from "@react-three/drei";
import { useSafeGLTF } from "@/lib/safeGltf";
import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import Bubble from "@/components/SpeechBubble";

export const Player = forwardRef(function Player(
  {
    dialogueStep = 0,
    interactionPrompt = null,
    onPositionChange,
    speedMultiplier = 1,
  },
  externalRef
) {
  /* =========================
     INTERNAL GROUP REF
  ========================== */
  const groupRef = useRef(null);

  /* =========================
     EXPOSE GROUP TO PARENT
  ========================== */
  useImperativeHandle(externalRef, () => groupRef.current, []);

  /* =========================
     LOAD MODELS + ANIMATIONS
  ========================== */
  const avatar = useSafeGLTF("/anim_avatar.glb");
  const idle = useSafeGLTF("/idle.glb");

  // Name animations safely
  if (avatar.animations?.length) {
    avatar.animations[0].name = "Walk";
  }
  if (idle.animations?.length) {
    idle.animations[0].name = "Idle";
    avatar.animations.push(idle.animations[0]);
  }

  const { actions } = useAnimations(avatar.animations, groupRef);

  /* =========================
     INPUT STATE
  ========================== */
  const [keys, setKeys] = useState({});
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const down = (e) =>
      setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
    const up = (e) =>
      setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  /* =========================
     ANIMATION SWITCHING
  ========================== */
  useEffect(() => {
    if (!actions) return;

    const walk = actions["Walk"];
    const idleAction = actions["Idle"];

    if (moving) {
      idleAction?.fadeOut(0.2);
      walk?.reset().fadeIn(0.2).play();
    } else {
      walk?.fadeOut(0.2);
      idleAction?.reset().fadeIn(0.2).play();
    }
  }, [moving, actions]);

  /* =========================
     MOVEMENT + CAMERA
  ========================== */
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const speed = 4 * speedMultiplier * delta;

    let dx = 0;
    let dz = 0;

    if (keys.w) dz -= speed;
    if (keys.s) dz += speed;
    if (keys.a) dx -= speed;
    if (keys.d) dx += speed;

    const nextX = groupRef.current.position.x + dx;
    const nextZ = groupRef.current.position.z + dz;

    /* === ISLAND BOUNDARY === */
    const ISLAND_RADIUS = 12.2;
    if (Math.sqrt(nextX * nextX + nextZ * nextZ) > ISLAND_RADIUS) {
      dx = 0;
      dz = 0;
    }

    /* === HOUSE BACK BLOCKER === */
    const HOUSE_Z = -9;
    if (nextZ < HOUSE_Z - 2 && Math.abs(nextX) < 3.5) {
      dz = 0;
    }

    groupRef.current.position.x += dx;
    groupRef.current.position.z += dz;
    groupRef.current.position.y = 0;

    const isMoving = dx !== 0 || dz !== 0;
    setMoving(isMoving);

    if (isMoving) {
      groupRef.current.rotation.y = Math.atan2(dx, dz);
    }

    /* === CAMERA FOLLOW === */
    const camOffset = new THREE.Vector3(20, 20, 20);
    const camTarget = groupRef.current.position.clone().add(camOffset);
    state.camera.position.lerp(camTarget, 0.1);
    state.camera.lookAt(groupRef.current.position);

    /* === SEND POSITION UP === */
    const forward = new THREE.Vector3(0, 0, 1)
      .applyQuaternion(groupRef.current.quaternion)
      .normalize();

    onPositionChange?.({
      position: groupRef.current.position.clone(),
      forward,
    });
  });

  /* =========================
     RENDER
  ========================== */
  return (
    <group ref={groupRef}>
      {/* SPEECH / INTERACTION BUBBLES */}
      {dialogueStep === 1 && (
        <Html position={[0, 2.4, 0]} center billboard>
          <Bubble text="Hey! Welcome to my world 🌱" />
        </Html>
      )}

      {dialogueStep === 2 && (
        <Html position={[0, 2.4, 0]} center billboard>
          <Bubble text="Explore the house to see my full portfolio 👀" />
        </Html>
      )}

      {dialogueStep === 0 && interactionPrompt && (
        <Html position={[0, 2.4, 0]} center billboard>
          <Bubble text={interactionPrompt} />
        </Html>
      )}

      {/* AVATAR */}
      <primitive object={avatar.scene} scale={0.012} />
    </group>
  );
});
