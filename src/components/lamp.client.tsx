"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ThreeElements,
} from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer, Group, Vector2 } from "three";
import { EffectComposer, OutlinePass, RenderPass } from "three-stdlib";

extend({ EffectComposer, OutlinePass, RenderPass });

const Lamp = (props: ThreeElements["mesh"]) => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/램프/scene.gltf");
  const mixer = useRef<AnimationMixer | null>(null);
  const { camera, gl } = useThree();
  const htmlRef = useRef<HTMLDivElement>(null);

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

    // HTML 요소가 애니메이션과 함께 움직이도록 위치 업데이트
    if (group.current && htmlRef.current) {
      const position = group.current.position.clone();
      group.current.getWorldPosition(position);
      htmlRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      onClick={() => {
        alert("램프입니다.");
      }}
      position={[3, -5, 1]}
      rotation={[0, (Math.PI / 2) * 3, 0]}
      scale={[0.3, 0.3, 0.3]}
    >
      <Html position={[1, -5, -10]}>
        <div className="w-[3rem] h-[1.5rem] rounded text-xs bg-black flex items-center justify-center">
          나
        </div>
      </Html>
    </primitive>
  );
};

export default Lamp;
