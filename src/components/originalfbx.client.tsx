"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import {
  AnimationMixer,
  MeshStandardMaterial,
  TextureLoader,
  Mesh,
  DoubleSide,
  Group,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const OriginalFbx = () => {
  const group = useRef<Group>(null);
  const fbx = useLoader(FBXLoader, "/BananaDancing.fbx"); // FBX 파일 경로
  const pngTexture = useLoader(TextureLoader, "/Banana.png");
  const mixer = useRef<AnimationMixer | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (fbx.animations && fbx.animations.length) {
      mixer.current = new AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      action.play();
    }

    // 텍스처 적용 (M_MED_Bananamo 메쉬에 적용)
    fbx.traverse((child) => {
      if ((child as Mesh).isMesh && child.name === "M_MED_Bananamo") {
        const mesh = child as Mesh;
        mesh.material = new MeshStandardMaterial({
          map: pngTexture,
          side: DoubleSide, // 필요에 따라 추가
        });
      }
    });
    setLoaded(true);
  }, [fbx, pngTexture]);

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
            group.current.position.y + 50, // 머리 위로 약간 올린 위치
            group.current.position.z + 40,
          ]}
          fontSize={20}
          fontWeight={700}
          color="blue"
        >
          윤현지
        </Text>
      )}
    </>
  );
};

export default OriginalFbx;
