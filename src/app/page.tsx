"use client";

import Box from "@/components/test.client";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="bg-gray-300 mx-[1rem] h-full rounded-2xl text-white p-4 bg-opacity-30">
      hello worldsfawef
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}
