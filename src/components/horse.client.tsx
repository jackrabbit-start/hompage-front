"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

const Horse = (props: ThreeElements["mesh"]) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/말/scene.gltf");
  const mixer = useRef<AnimationMixer | null>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [animations, scene]);

  useEffect(() => {
    // camera.position.z = 10;
    // camera.position.y = -3;
  }, [camera]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <primitive
      ref={group}
      object={scene}
      position={[-10, -5, 0]}
      scale={[6, 6, 6]}
      rotation={[0, 0, 0]}
    />
  );
};

export default Horse;