"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer } from "three";

const Skeleton = (props: ThreeElements["mesh"]) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/해골/scene.gltf");
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
      position={[25, -5, -6]}
      scale={[8, 8, 8]}
      rotation={[0, (Math.PI / 2) * 3, 0]}
    >
      <Html>
        <div className="w-[3rem] h-[1.5rem] rounded text-xs bg-black flex items-center justify-center">
          김병수
        </div>
      </Html>
    </primitive>
  );
};

export default Skeleton;
