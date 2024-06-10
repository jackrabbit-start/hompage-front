"use client";

import DoubleSidedCard from "@/components/card3D.client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Page = () => {
  return (
    <div className="relative bg-red-100 h-[80vh] w-full mx-[1rem] rounded-2xl text-white p-4 bg-opacity-30 flex justify-center items-center">
      <div className=" w-full h-full p-8 bg-opacity-30 text-6xl">삼성카드</div>
      <div className="w-full h-full absolute">
        <Canvas shadows>
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <directionalLight position={[-3, -3, -3]} intensity={0.5} />
          <DoubleSidedCard />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default Page;
