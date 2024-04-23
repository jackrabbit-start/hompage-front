"use client";

import Box from "@/components/test.client";
import { Canvas, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-gray-300 mx-[1rem] h-[40rem] rounded-2xl text-white p-4 bg-opacity-30 flex justify-center items-center">
      <div ref={ref} className="relative w-full h-full bg-opacity-30 ">
        <div className="absolute text-center h-full w-full text-9xl text-wrap break-words">
          {
            "김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현 김기현"
          }
        </div>
        <Canvas shadows eventPrefix="offset">
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
          <ambientLight intensity={0.1} />
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

          <Box position={[0, -1, 0]} />
        </Canvas>
      </div>
    </div>
  );
}
