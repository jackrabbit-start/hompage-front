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
import { OrbitControls, useScroll } from "@react-three/drei";
import { Text } from "@react-three/drei";

const Box = (props: ThreeElements["mesh"]) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, "/retro_computer_setup_free/scene.gltf");
  const { camera } = useThree();
  const scroll = useScroll();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    camera.position.z = 20;
    camera.position.y = 5;
  }, [camera]);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta / 2;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 0.2 : 0.1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <OrbitControls />

      <primitive object={gltf.scene} />

      {/* <boxGeometry args={[1, 1, 1]} />*/}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Box;
