"use client";

import * as THREE from "three";
import {
  useFrame,
  ThreeElements,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  OrbitControls,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { Text } from "@react-three/drei";

const Box = (props: ThreeElements["mesh"]) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, "/retro_computer_setup_free/scene.gltf");
  const { camera, gl } = useThree();
  const scroll = useScroll();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(1); // 1: 시계방향, -1: 반시계방향

  useEffect(() => {
    camera.position.z = 1000;
    camera.position.y = 100;
  }, [camera]);

  useFrame((state, delta) => {
    if (meshRef.current && scroll) {
      const scrollOffset = scroll.offset; // 0에서 1 사이의 값
      const scrollRotation = scrollOffset * Math.PI; // 0에서 180도(π 라디안)까지 회전

      // 회전을 애니메이션으로 부드럽게 변경
      const rotationDiff = targetRotation - currentRotation;
      const rotationStep = rotationDiff * delta * 4; // 애니메이션 속도 조절 (delta에 비례)
      setCurrentRotation(currentRotation + rotationStep);
      meshRef.current.rotation.y = scrollRotation + currentRotation;
    }
  });

  const handleMeshClick = () => {
    setTargetRotation((prev) => prev + rotationDirection * Math.PI); // 클릭할 때마다 180도(π 라디안) 추가 회전
    setRotationDirection((prev) => -1 * prev); // 회전 방향 변경
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={0.1}
      onClick={handleMeshClick}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/* <OrbitControls args={[camera, gl.domElement]} /> */}

      {/* <primitive object={gltf.scene} /> */}
      <TexturedPlane />
      <TexturedPlane />

      {/* <boxGeometry args={[1, 1, 1]} />*/}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const TexturedPlane = () => {
  const texture = useTexture("/myImage.png");

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Box;
