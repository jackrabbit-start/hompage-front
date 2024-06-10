"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

const Lion = (props: ThreeElements["mesh"]) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/정진우/scene.gltf");
  const mixer = useRef<AnimationMixer | null>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[5]);
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
      position={[-3, -5, -30]}
      scale={[0.2, 0.2, 0.2]}
      rotation={[0, (Math.PI / 2) * 3, 0]}
    >
      <Html position={[10, 50, 50]}>
        <div className="w-[3rem] h-[1.5rem] rounded text-xs bg-black flex items-center justify-center">
          김성현
        </div>
      </Html>
    </primitive>
  );
};

export default Lion;
