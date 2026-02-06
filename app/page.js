"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrthographicCamera,
  Resize,
  Center,
  Float,
} from "@react-three/drei";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Interior from "@/components/Interior";
import Desk from "@/components/Desk";
// Room Assets
import Chair from "@/components/room/Chair";
import Lamp from "@/components/room/Lamp";
import Plant from "@/components/room/Plant";
import BeanBag from "@/components/room/BeanBag";
import Bookshelf from "@/components/room/Bookshelf";
import Door from "@/components/room/Door";
import Couch from "@/components/room/Couch";
import Clock from "@/components/room/Clock";
import Poster from "@/components/room/Poster";
import PortfolioOverlay from "@/components/PortfolioOverlay";


import { Player } from "@/components/Player";

const INTERACTION_ZONES = [
  {
    id: "house",
    position: [0, 0, -6.2], // slightly in front of house
    radius: 0.6,
    text: "Press E to enter",
  },
  {
    id: "bench",
    position: [2.5, 0, -3],
    radius: 0.8,
    text: "Press E to sit",
  },
];




/* ===================== ASSET ===================== */
function Asset({
  url,
  size = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  sway = false,
  swaySpeed = 1,
  userData = {},
}) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  useFrame((state) => {
    if (sway && ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.z =
        rotation[2] + Math.sin(t * swaySpeed + position[0]) * 0.05;
    }
  });

  const clone = useMemo(() => {
    const c = scene.clone();
    c.traverse((m) => {
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <group ref={ref} position={position} rotation={rotation}  userData={userData}>
      <Resize scale={size}>
        <Center top>
          <primitive object={clone} />
        </Center>
      </Resize>
    </group>
  );
}

/* ===================== FIREFLIES ===================== */
function Fireflies({ count = 10 }) {
  const positions = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        x: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 12,
        y: 0.6 + Math.random() * 1.2,
        speed: 0.5 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <group>
      {positions.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={2}>
          <mesh position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffe066" transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ===================== LEVEL ===================== */
function Level() {
  const pathZ = [6, 4.8, 3.6, 2.4, 1.2, 0, -1.2, -2.4, -3.6, -4.8];

  return (
    <group>
      {/* ===== HOUSE ===== */}
      <Asset url="/models/house.glb" size={9} position={[0, 0, -9]} rotation={[0, Math.PI, 0]} userData={{block: true}} />

      {/* ===== PATH ===== */}
      {pathZ.map((z, i) => (
        <Asset key={i} url="/models/paving_stone.glb" size={1} position={[0, 0.02, z]} />
      ))}

      {/* ===== PATH FENCES ===== */}
      {pathZ.map((z, i) => (
        <group key={`fence-${i}`}>
          <Asset url="/models/fence.glb" size={1.5} position={[-2, 0, z]} userData={{ block: true }} />
          <Asset url="/models/fence.glb" size={1.5} position={[4, 0, z]} userData={{ block: true }} />
        </group>
      ))}

      {/* ===== LAMPS ===== */}
      <group position={[-1.3, 0, 6.4]}>
        <Asset url="/models/street_lamps.glb" size={3} sway userData={{ block: true }}/>
        <pointLight intensity={2} distance={6} color="#ffb703" position={[0, 2.5, 0]} />
      </group>

      <group position={[3, 0, 6.4]}>
        <Asset url="/models/street_lamps.glb" size={3} sway userData={{ block: true }} />
        <pointLight intensity={2} distance={6} color="#ffb703" position={[0, 2.5, 0]} />
      </group>

      {/* ===== HOUSE PROPS ===== */}
      <Asset url="/models/pot.glb" size={0.7} position={[-0.8, 0, -7.4]} />
      <Asset url="/models/pot.glb" size={0.7} position={[0.8, 0, -7.4]} />

      <Asset url="/models/bench.glb" size={3} position={[2.5, 0, 0.5]} rotation={[0, -1.5, 0]} userData={{ block: true }}/>
      <Asset url="/models/mailbox.glb" size={2} position={[2, 0, 7.5]} rotation={[0, 0.35, 0]} userData={{ block: true }}/>

      {/* ===== ORIGINAL VEGETATION ===== */}
      <Asset url="/models/bush.glb" size={1} position={[-3, 0, 4]} />
      <Asset url="/models/bush2.glb" size={1} position={[3, 0, 3.6]} />
      <Asset url="/models/bush.glb" size={1} position={[-2.8, 0, -5.6]} />
      <Asset url="/models/bush2.glb" size={1} position={[3, 0, -6]} />

      {/* ===== EXTRA BUSHES (NEW – SAFE FILL) ===== */}
      <Asset url="/models/bush.glb" size={1.5} position={[-9, 0, 3]} />
      <Asset url="/models/bush3.glb" size={1.5} position={[-7.2, 0, 1.5]} />

      <Asset url="/models/bush.glb" size={0.8} position={[6.8, 0, 2.2]} />
      <Asset url="/models/bush2.glb" size={0.9} position={[7.4, 0, 0.8]} />

      <Asset url="/models/bush.glb" size={0.8} position={[-6, 0, -4]} />
      <Asset url="/models/bush2.glb" size={0.9} position={[-7.2, 0, -5.2]} />

      <Asset url="/models/bush.glb" size={0.8} position={[6.4, 0, -5]} />
      <Asset url="/models/bush2.glb" size={0.9} position={[7.2, 0, -6.2]} />

      {/* ===== ROCKS & STUMPS ===== */}
      <Asset url="/models/rock.glb" size={1} position={[-4.4, 0, 1.6]} userData={{ block: true }}/>
      <Asset url="/models/rock.glb" size={0.8} position={[4.6, 0, -1.8]} userData={{ block: true }}/>
      <Asset url="/models/stump.glb" size={2} position={[-5.2, 0, -2.2]} userData={{ block: true }}/>
      <Asset url="/models/stump.glb" size={3} position={[5.2, 0, 7]} userData={{ block: true }}/>

      {/* ===== TREES ===== */}
      <Asset url="/models/low_poly_tree1.glb" size={6} position={[-10, 0, 6]} sway userData={{ block: true }}/>
      <Asset url="/models/low_poly_tree1.glb" size={7} position={[10, 0, 5]} sway userData={{ block: true }}/>
      <Asset url="/models/low_poly_tree1.glb" size={6} position={[-9, 0, -6]} sway userData={{ block: true }}/>
      <Asset url="/models/low_poly_tree3.glb" size={6} position={[9, 0, -6]} sway userData={{ block: true }}/>
      <Asset url="/models/low_poly_tree3.glb" size={7} position={[-9, 0, 0]} sway userData={{ block: true }}/>
      <Asset url="/models/low_poly_tree1.glb" size={6} position={[0, 0, -12]} sway userData={{ block: true }}/>

      <Fireflies />
    </group>
  );
}

function EntryOverlay({ onEnter }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Subtle grain */}
      {/* <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      /> */}

      {/* Window */}
      <div className="relative z-10 w-[420px] rounded-xl bg-[#0f0f0f] shadow-2xl border border-white/10">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-sm font-medium text-white/70">
            Welcome
          </span>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            Daksh Jain
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Designer × Developer
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            I build thoughtful digital experiences
            where design, code, and systems meet.
          </p>

           <p className="mt-4 text-sm leading-relaxed text-white/70">
           An experimental portfolio exploring new interactions — occasional bugs are part of the process.
          </p>

          <button
            onClick={onEnter}
            className="mt-6 w-full rounded-lg bg-black text-white py-3 text-sm font-medium hover:bg-black/90 transition"
          >
            Step into my workspace
          </button>

          <p className="mt-4 text-sm text-white/60">
  Interactive 3D portfolio — built from scratch using Next.js + React Three Fiber.·{" "}
  <a
    href="https://github.com/Djain2610/portfolio_3d"
    target="_blank"
    className="text-white/70 underline hover:text-white transition"
  >
    View Code ↗
  </a>
</p>
        </div>
      </div>
    </div>
  );
}




/* ===================== SCENE ===================== */
export default function Home() {
  const [entered, setEntered] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [interactionPrompt, setInteractionPrompt] = useState(null);
  const [scene, setScene] = useState("outside"); 
const [isSitting, setIsSitting] = useState(false);
const [sitTarget, setSitTarget] = useState(null);
const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
const [loading3D, setLoading3D] = useState(false);

// 🔥 Player Reference (needed for sitting)
const playerRef = useRef(null);

useEffect(() => {
  window.playerRef = playerRef.current;
}, [playerRef]);


// 🎥 Desk View Camera
const setCameraToDesk = () => {
  const cam = document.querySelector("canvas")?.__r3f?.root?.getState().camera;
  if (!cam) return;

  cam.position.set(3, 5, -2);
  cam.zoom = 120;
  cam.updateProjectionMatrix();
};


useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    // 🚫 Close Portfolio (Escape)
    if (key === "escape" && isPortfolioOpen) {
      setIsPortfolioOpen(false);
      return;
    }

    // 🌍 Enter House
    if (key === "e" && interactionPrompt === "Press E to enter") {
      setScene("inside");
      playerRef.current.position.set(0, 0.1, 1.8);
      playerRef.current.rotation.y = 0;
      return;
    }

    // 🌍 Exit House
    if (key === "e" && interactionPrompt === "Press E to go outside") {
      setScene("outside");
      playerRef.current.position.set(0, 0.1, 7);
      playerRef.current.rotation.y = 0;
      return;
    }

    // 📱 View Portfolio
    if (key === "e" && interactionPrompt === "Press E to view portfolio") {
      setIsPortfolioOpen(true);
      return;
    }

    // 🎯 Sit Down
    if (key === "e" && interactionPrompt === "Press E to sit" && sitTarget && !isSitting) {
      setIsSitting(true);

      if (sitTarget === "bench") {
        playerRef.current.position.set(2.5, 0.1, -4.6);
        playerRef.current.rotation.y = Math.PI / 2;
      }
      if (sitTarget === "sofa") {
        playerRef.current.position.set(-3.5, 0.1, 1);
        playerRef.current.rotation.y = Math.PI;
      }

      setInteractionPrompt(null);
      return;
    }

    // 🚫 Get up (movement breaks sit)
    if (isSitting && ["w", "a", "s", "d"].includes(key)) {
      setIsSitting(false);
      setSitTarget(null);
      return;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [interactionPrompt, sitTarget, isSitting, scene, isPortfolioOpen]);



  useEffect(() => {
  if (!entered) return;

  const t0 = setTimeout(() => setDialogueStep(1), 1000); // delay start
  const t1 = setTimeout(() => {
    setDialogueStep(2); // second bubble
  }, 4500);

  const t2 = setTimeout(() => {
    setDialogueStep(0); // hide all
  }, 8500);

  return () => {
    clearTimeout(t0);
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, [entered]);

useEffect(() => {
  if (loading3D) {
    const t = setTimeout(() => setLoading3D(false), 4000);
    return () => clearTimeout(t);
  }
}, [loading3D]);

useEffect(() => {
  if (scene === "inside") {
    setLoading3D(true);
  }
}, [scene]);

const handlePlayerPosition = ({ position }) => {
  // Reset every frame
  setInteractionPrompt(null);
  setSitTarget(null);

  // Don't show prompts when portfolio is open
  if (isPortfolioOpen) return;

  if (scene === "outside") {
    // House entry
    if (position.z > -12 && position.z < -10) {
      setInteractionPrompt("Press E to enter");
      return;
    }

    // Bench sit
    if (
      position.x > 2 &&
      position.x < 3 &&
      position.z > 0.3 &&
      position.z < 0.7 &&
      !isSitting
    ) {
      setInteractionPrompt("Press E to sit");
      setSitTarget("bench");
      return;
    }
  } else if (scene === "inside") {
    // Sofa
    if (
      position.x < -2.5 &&
      position.x > -4.5 &&
      position.z > 2.8 &&
      position.z < 3.2 &&
      !isSitting
    ) {
      setInteractionPrompt("Press E to sit");
      setSitTarget("sofa");
      return;
    }

    // Desk portfolio (works sitting OR standing)
    if (
      position.x > -0.3 &&
      position.x < 0.3 &&
      position.z > -12 &&
      position.z < -10
    ) {
      setInteractionPrompt("Press E to view portfolio");
      return;
    }

    // Exit door
    if (position.z > 14.5 && position.z < 14.9) {
      setInteractionPrompt("Press E to go outside");
      return;
    }
  }
};





  return (
    <div className="h-screen w-full bg-[#87CEEB]">
      {!entered && <EntryOverlay onEnter={() => { setEntered(true); setLoading3D(true); }} /> }
{entered && loading3D && (
  <div className="absolute inset-0 z-50">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
    {/* <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "url('https://grainy-gradients.vercel.app/noise.svg')",
      }}
    /> */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-white text-2xl font-light tracking-wide animate-pulse">
        Entering workspace
      </h1>
    </div>
  </div>
)}
<div className="absolute bottom-4 right-4 z-50 bg-black/70 text-white px-4 py-2 rounded">
  Scene: {scene}
</div>
<PortfolioOverlay
  mode={isPortfolioOpen ? "focus" : null}
  onClose={() => setIsPortfolioOpen(false)}
/>

{loading3D && (
  <div className="absolute inset-0 z-40 flex items-center justify-center">
    <p className="bg-white/90 px-4 py-2 rounded-lg text-black/70 text-sm shadow-lg">Initializing workspace...</p>
  </div>
)}
        
{entered && !loading3D && (
  <Canvas shadows dpr={[1, 2]} >
  {/* Background (restore blue sky) */}
  <color attach="background" args={["#55cedb"]} />

  {/* SINGLE CAMERA — scene-aware */}
  <OrthographicCamera
    makeDefault
    position={scene === "outside" ? [20, 20, 20] : [8, 10, 8]}
    zoom={scene === "outside" ? 65 : 110}
  />

  {/* ================= OUTSIDE SCENE ================= */}
  {scene === "outside" && (
    <>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow />

      {/* Environment */}
      <Environment preset="city" />

      {/* Level */}
      <Suspense fallback={null}>
        <Level />
      </Suspense>

      <group position={[0, 0, 0]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.02, 0]}
          receiveShadow
        >
          <circleGeometry args={[13, 96]} />
          <meshStandardMaterial color="#7fa35b" roughness={0.9} />
        </mesh>

        <mesh position={[0, -1.1, 0]} receiveShadow>
          <cylinderGeometry args={[13, 12.5, 2, 64]} />
          <meshStandardMaterial color="#5b6b4f" roughness={1} />
        </mesh>

        <mesh position={[0, -3.8, 0]} receiveShadow>
          <coneGeometry args={[6.5, 4.5, 32]} />
          <meshStandardMaterial color="#3f3f3f" roughness={1} />
        </mesh>
      </group>
    </>
  )}

  {/* ================= INSIDE SCENE ================= */}
{scene === "inside" && (
  <Suspense fallback={null}>
    <color attach="background" args={["#E8E6E1"]} />

    <OrthographicCamera makeDefault position={[14, 14, 14]} zoom={70} />

    <ambientLight intensity={0.8} />
    <directionalLight
      castShadow
      position={[3, 8, 3]}
      intensity={1.3}
      color="#ffd7b1"
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.0005}
    />

    {/* ===== ROOM ===== */}
    <group scale={1.5}>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#9b7146"
          roughness={0.88}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={1}
        />
      </mesh>

      {/* Floor Base */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <boxGeometry args={[12, 0.5, 12]} />
        <meshStandardMaterial color="#7c5837" roughness={1} />
      </mesh>

      {/* Back, Left, Right Walls */}
      <mesh position={[0, 3.5, -6]} receiveShadow>
        <planeGeometry args={[12, 7]} />
        <meshStandardMaterial color="#E6D5BA" />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 3.5, 0]} receiveShadow>
        <planeGeometry args={[12, 7]} />
        <meshStandardMaterial color="#E6D5BA" />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 3.5, 0]} receiveShadow>
        <planeGeometry args={[12, 7]} />
        <meshStandardMaterial color="#C4BEB6" />
      </mesh>

    </group>

    {/* Desk + Player */}
    {/* === OBJECT PLACEMENTS (CORRECTED) === */}

{/* ============= ROOM OBJECTS CORRECTED ============= */}

{/* === INTERIOR PLACEMENT (FIXED) === */}

{/* DESK (unchanged) */}
<Desk position={[0, 2, -7]} scale={0.008} rotation={[0, Math.PI / 2, 0]} />

{/* CHAIR — in front of desk */}
<Chair
  position={[0, 1.5, -5.5]}
  rotation={[0, 3.3, 0]}
/>

{/* LAMP — back-left corner */}
<Lamp
  position={[-7, 2, -7]}
  rotation={[0, Math.PI / 4, 0]}
/>

{/* PLANT — front-left */}
<Plant
  position={[3, 1, -8]}
/>
<Plant
  position={[3, 1, -8]}
/>


{/* BOOKSHELF — left wall */}
<Bookshelf
  position={[-8, 0, -4]}
  rotation={[0, Math.PI / 2, 0]}
/>

{/* BOOKSHELF — left wall */}
<Couch
  position={[-7.5, 1, 2]}
  rotation={[0, Math.PI / 2, 0]}
/>

<Clock
  position={[-8, 4, -1]}
  rotation={[0, Math.PI / 2, 0]}
/>

<Poster
  position={[4, 8, -5]}
  rotation={[0, 0,0]}
/>


{/* BEAN BAG — right side chill zone */}
<BeanBag
  position={[3.2, 1, 1.5]}
  rotation={[0, -Math.PI / 5, 0]}
/>

{/* DOOR — exit point */}
<Door
  position={[0, 2.8, 9.8]}
  rotation={[0, Math.PI, 0]}
  scale={3}
/>





  </Suspense>
)}

  <Suspense fallback={null}>
    <group position={[0, 0.1, 7]}>
      <Player
        ref={playerRef}
        dialogueStep={dialogueStep}
        interactionPrompt={interactionPrompt}
        onPositionChange={handlePlayerPosition}
      />
    </group>
  </Suspense>

  {/* Shadows */}
  <ContactShadows blur={2} opacity={0.6} />

</Canvas>
)}

  <div className="absolute top-8 left-8 flex items-center gap-2 text-black/80 text-m font-large tracking-wide z-50">
  <span className="px-2 py-1 bg-white/100 rounded-md border border-white/100">
    WASD
  </span>
  <span>Move</span>

  <span className="opacity-40">·</span>

  <span className="px-2 py-1 bg-white/100 rounded-md border border-white/100">
    E
  </span>
  <span>Interact</span>
</div>



          </div>
  );
}
