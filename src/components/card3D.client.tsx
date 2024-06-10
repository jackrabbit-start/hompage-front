"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { DirectionalLight, Euler, Mesh } from "three";

const DoubleSidedCard = () => {
  const cardRef = useRef<Mesh>(null);
  const lightRef = useRef<DirectionalLight>(null);
  const [flipped, setFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  useFrame(() => {
    if (cardRef.current) {
      const rotationY = flipped ? Math.PI : 0;
      const targetRotation = new Euler(
        (mousePos.y / window.innerHeight - 0.5) * -0.8,
        (mousePos.x / window.innerWidth - 0.5) * 0.8 + rotationY,
        0
      );

      cardRef.current.rotation.x +=
        (targetRotation.x - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y +=
        (targetRotation.y - cardRef.current.rotation.y) * 0.1;
    }

    if (lightRef.current) {
      lightRef.current.position.set(
        (mousePos.x / window.innerWidth - 0.5) * (flipped ? -10 : 10),
        (mousePos.y / window.innerHeight - 0.5) * -10,
        flipped ? -5 : 5
      );
    }
  });

  return (
    <mesh ref={cardRef} onClick={handleCardClick} position={[0, 0, 0]}>
      <boxGeometry args={[5, 3, 0.2]} />
      <meshStandardMaterial color="white" metalness={0.3} roughness={0.5} />
      {!flipped && (
        <Html transform onClick={handleCardClick} position={[0, 0, 0.06]}>
          <div
            className="w-full h-full flex-col flex items-center justify-center"
            onClick={handleCardClick}
          >
            앞면 html 입니다.
            <div className="w-[4rem] bg-yellow-300 flex items-center justify-center">
              설명
            </div>
          </div>
        </Html>
      )}
      {flipped && (
        <Html
          transform
          onClick={handleCardClick}
          rotation={[0, Math.PI, 0]}
          position={[0, 0, -0.06]}
        >
          <div
            onClick={handleCardClick}
            className="w-full h-full  flex items-center justify-center "
          >
            뒷면
          </div>
        </Html>
      )}
      <directionalLight ref={lightRef} position={[3, 3, 3]} intensity={1} />
    </mesh>
  );
};

export default DoubleSidedCard;
