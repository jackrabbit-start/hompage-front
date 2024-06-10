"use client";

import BackGround from "@/components/background.client";
import Cat from "@/components/cat.client";
import Horse from "@/components/horse.client";
import Lamp from "@/components/lamp.client";
import Lion from "@/components/lion.client";
import MyCharacter from "@/components/mycharacter.client";
import OriginalFbx from "@/components/originalfbx.client";
import ScaryDoll from "@/components/scarydoll.client";
import Skeleton from "@/components/skeleton.client";
import Box from "@/components/test.client";
import Character from "@/components/test2.client";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-gray-300 mx-[1rem] h-[80vh] rounded-2xl text-white p-4 bg-opacity-30 flex justify-center items-center">
      <div ref={ref} className="relative w-full h-full bg-opacity-30 ">
        <div className="absolute text-center h-full w-full text-9xl text-wrap break-words">
          {"test용"}
        </div>
        <Canvas shadows eventPrefix="offset">
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
          <ambientLight intensity={0.5} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[100, 100, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <OrbitControls />
          <MyCharacter position={[0, 0, 0]} />
          <Lamp position={[0, 0, 0]} />
          <ScaryDoll position={[0, 0, 0]} />
          <Lion position={[0, 0, 0]} />
          <Cat />
          <Horse />
          <Skeleton />
          <BackGround />
          {/* <ScrollControls pages={2} damping={1}> */}
          {/* <Box position={[0, 0, 1]} />
          <Box position={[15, 5, 1]} />
          <OriginalFbx />
          {/* </ScrollControls> */}
          {/* <ScrollControls pages={2} damping={1}></ScrollControls> */}
        </Canvas>
      </div>
    </div>
  );
}
