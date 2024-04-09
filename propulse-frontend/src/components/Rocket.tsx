import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader  } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DDSLoader } from "three-stdlib";
import { Suspense, useRef, useState } from "react";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const RocketModel = () => {
  const rocketRef = useRef<THREE.Mesh>(null)

  const gltf = useLoader(GLTFLoader , "src\\assets\\rocket.gltf");

  const [keyState, setKeyState] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      setKeyState({ ...keyState, up: true });
    }
    if (e.key === "ArrowDown") {
      setKeyState({ ...keyState, down: true });
    }
    if (e.key === "ArrowLeft") {
      setKeyState({ ...keyState, left: true });
    }
    if (e.key === "ArrowRight") {
      setKeyState({ ...keyState, right: true });
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") {
      setKeyState({ ...keyState, up: false });
    }
    if (e.key === "ArrowDown") {
      setKeyState({ ...keyState, down: false });
    }
    if (e.key === "ArrowLeft") {
      setKeyState({ ...keyState, left: false });
    }
    if (e.key === "ArrowRight") {
      setKeyState({ ...keyState, right: false });
    }
  });

  useFrame(() => {
    if (rocketRef.current === null) return;
    
    if (keyState.up) {
      rocketRef.current.rotation.x += 0.01;
    }
    if (keyState.down) {
      rocketRef.current.rotation.x -= 0.01;
    }
    if (keyState.left) {
      rocketRef.current.rotation.y += 0.01;
    }
    if (keyState.right) {
      rocketRef.current.rotation.y -= 0.01;
    }


    rocketRef.current.rotation.x += 0.01;
    rocketRef.current.rotation.y += 0.02;
    rocketRef.current.rotation.z -= 0.005;
  });

  return <mesh ref={rocketRef}>
    <primitive object={gltf.scene} />
  </mesh>;
};

export default function Rocket() {
  return (
    <div className="flex flex-col h-full">
      <div className=" flex-1 bg-transparent">
      <Canvas className="" flat linear>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight intensity={5} position={new THREE.Vector3(-10, 0, 0)} />
          <RocketModel />
        </Suspense>
      </Canvas>
    </div>
    </div>
  );
}
