"use client";

import React, { useRef, useEffect, useState, createElement } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ThreeElements,
} from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimationMixer, Group, Vector2, Color } from "three";
import {
  EffectComposer,
  OutlinePass,
  RenderPass,
  UnrealBloomPass,
} from "three-stdlib";
import BackGround from "@/components/background.client";
import Cat from "@/components/cat.client";
import Horse from "@/components/horse.client";
import Lamp from "@/components/lamp.client";
import Lion from "@/components/lion.client";
import MyCharacter from "@/components/mycharacter.client";
import ScaryDoll from "@/components/scarydoll.client";
import Skeleton from "@/components/skeleton.client";

extend({ EffectComposer, OutlinePass, RenderPass, UnrealBloomPass });

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-gray-300 mx-[1rem] h-[80vh] rounded-2xl text-white p-4 bg-opacity-30 flex justify-center items-center">
      <div ref={ref} className="relative w-full h-full bg-opacity-30 ">
        <Canvas shadows>
          <OrbitControls />
          <ambientLight intensity={1.2} />
          <directionalLight
            color="white"
            position={[0, 0, 10]}
            intensity={1.2}
          />
          <spotLight
            position={[100, 100, 100]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={1}
          />
          <Effects>
            <MyCharacter position={[0, 0, 0]} />
            <Lamp position={[0, 0, 0]} />
            <ScaryDoll position={[0, 0, 0]} />
            <Lion position={[0, 0, 0]} />
            <Cat />
            <Horse />
            <Skeleton />
          </Effects>
          <BackGround />
        </Canvas>
      </div>
    </div>
  );
}

const Effects = ({ children }: any) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();
  const [selectedObjects, setSelectedObjects] = useState<Group[]>([]);
  const refs = useRef(new Map<number, React.RefObject<Group>>()).current;

  useEffect(() => {
    const renderPass = new RenderPass(scene, camera);
    const outlinePass = new OutlinePass(
      new Vector2(size.width, size.height),
      scene,
      camera
    );
    const bloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      1.5,
      0.4,
      0.85
    );

    outlinePass.edgeStrength = 10;
    outlinePass.edgeGlow = 0.5;
    outlinePass.edgeThickness = 1.0;
    outlinePass.visibleEdgeColor.set("#ffffff");
    outlinePass.hiddenEdgeColor.set("#190a05");

    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderPass);
    composer.current.addPass(outlinePass);
    composer.current.addPass(bloomPass);
  }, [gl, scene, camera, size]);

  useEffect(() => {
    if (composer.current) {
      const outlinePass = composer.current.passes.find(
        (pass) => pass instanceof OutlinePass
      ) as OutlinePass;
      if (outlinePass) {
        outlinePass.selectedObjects = selectedObjects;
      }
    }
  }, [selectedObjects]);

  useFrame(() => {
    if (composer.current) composer.current.render();
  }, 1);

  return (
    <>
      {React.Children.map(children, (child, index) => {
        if (!refs.has(index)) {
          refs.set(index, React.createRef<Group>());
        }
        const ref = refs.get(index);

        return createElement(
          "group",
          {
            ref,
            key: index,
            onPointerOver: (e: React.PointerEvent) => {
              if (ref && ref.current) {
                setSelectedObjects([ref.current]);
              }
              if (child.props.onPointerOver) child.props.onPointerOver(e);
            },
            onPointerOut: (e: React.PointerEvent) => {
              setSelectedObjects([]);
              if (child.props.onPointerOut) child.props.onPointerOut(e);
            },
          },
          React.cloneElement(child as React.ReactElement)
        );
      })}
    </>
  );
};
