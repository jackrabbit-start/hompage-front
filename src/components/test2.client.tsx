"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import {
  AnimationMixer,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  DoubleSide,
  Group,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const Character = () => {
  const group = useRef<Group>(null);
  const fbx = useLoader(FBXLoader, "/CharaterDropKick.fbx");
  const mixer = useRef<AnimationMixer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (fbx.animations && fbx.animations.length) {
      mixer.current = new AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }

    // 초기 위치 설정
    if (group.current) {
      group.current.position.set(-150, 0, -100); // 초기 위치를 설정 (x, y, z 좌표)
    }

    setLoaded(true);
  }, [fbx]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <>
      <primitive ref={group} object={fbx} />
      {loaded && group.current && (
        <Text
          position={[
            group.current.position.x,
            group.current.position.y + 100, // 머리 위로 약간 올린 위치
            group.current.position.z + 70,
          ]}
          fontSize={20}
          fontWeight={700}
          color="white"
        >
          최찬솔
        </Text>
      )}
    </>
  );
};

export default Character;
