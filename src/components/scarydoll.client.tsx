"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

const ScaryDoll = (props: ThreeElements["mesh"]) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/무서운인형/scene.gltf");
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
      position={[20, 5, -50]}
      rotate={[0, (Math.PI / 2) * 3, 0]}
      scale={[10, 10, 10]}
    >
      <Html position={[0.2, -0.1, 3]}>
        <div className="w-[3rem] h-[1.5rem] rounded text-xs bg-black flex items-center justify-center">
          정진우
        </div>
      </Html>
    </primitive>
  );
};

export default ScaryDoll;
