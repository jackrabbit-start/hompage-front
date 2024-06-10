"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer, LoopOnce, Group } from "three";

const MyCharacter = (props: ThreeElements["mesh"]) => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/뚜벅초/scene.gltf");
  const mixer = useRef<AnimationMixer | null>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[1]);
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
      position={[0, -7, -8]}
      scale={[2, 2, 2]}
    >
      <Html>
        <div className="w-[3rem] h-[1.5rem] rounded text-xs bg-black flex items-center justify-center">
          나림
        </div>
      </Html>
    </primitive>
  );
};

export default MyCharacter;
