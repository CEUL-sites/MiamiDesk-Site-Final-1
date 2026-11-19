// WebGL half of the House Bot. Loaded only through a dynamic import from
// HouseBotStage, after first paint and once the bot is on screen, so three.js
// never touches the homepage LCP bundle.

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Box3, LoopOnce, LoopRepeat, Vector3, type AnimationAction, type Group } from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
import {
  CLIPS,
  CROSSFADE_SECONDS,
  DPR_CAP,
  HOUSEBOT_ASSETS,
  PRESENT_DELAY_MS,
  clipForLook,
  type LookDirection,
} from "./houseBotModel";

export interface HouseBotCanvasProps {
  /** "hero": Greet → Idle → Present. "dock": Idle only. */
  mode: "hero" | "dock";
  /** Render loop runs only while true (on screen + tab visible). */
  active: boolean;
  /** Incremented on each hover start → Nod. */
  nodSignal: number;
  /** Incremented look request (already throttled by the stage). */
  look: { dir: LookDirection; n: number } | null;
  onReady: () => void;
}

/** Normalised model height in scene units; camera is framed for this. */
const MODEL_HEIGHT = 1.6;

function Bot({ mode, nodSignal, look, onReady }: Omit<HouseBotCanvasProps, "active">) {
  const { scene, animations } = useGLTF(HOUSEBOT_ASSETS.glb, HOUSEBOT_ASSETS.draco);
  // Each canvas (hero + dock) needs its own skeleton/mixer.
  const model = useMemo(() => cloneSkinned(scene), [scene]);
  const fit = useMemo(() => {
    const box = new Box3().setFromObject(model);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = size.y > 0 ? MODEL_HEIGHT / size.y : 1;
    return { scale, offset: center.multiplyScalar(-scale) };
  }, [model]);

  const root = useRef<Group>(null);
  const { actions, mixer } = useAnimations(animations, root);
  const current = useRef<AnimationAction | null>(null);
  const oneShotBusy = useRef(false);

  const fadeTo = (name: string, once: boolean) => {
    const next = actions[name];
    if (!next) return false;
    const prev = current.current;
    next.reset();
    if (once) {
      next.setLoop(LoopOnce, 1);
      next.clampWhenFinished = true;
    } else {
      next.setLoop(LoopRepeat, Infinity);
    }
    next.enabled = true;
    if (prev && prev !== next) {
      next.crossFadeFrom(prev, CROSSFADE_SECONDS, false);
    }
    next.play();
    current.current = next;
    oneShotBusy.current = once;
    return true;
  };

  const playOnce = (name: string) => {
    if (oneShotBusy.current) return;
    fadeTo(name, true);
  };

  // One-shot finished → crossfade back to Idle.
  useEffect(() => {
    const onFinished = (e: { action: AnimationAction }) => {
      if (e.action !== current.current) return;
      oneShotBusy.current = false;
      fadeTo(CLIPS.idle, false);
    };
    mixer.addEventListener("finished", onFinished as never);
    return () => mixer.removeEventListener("finished", onFinished as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixer, actions]);

  // Entry sequence.
  useEffect(() => {
    onReady();
    if (mode === "dock") {
      fadeTo(CLIPS.idle, false);
      return;
    }
    const greet = actions[CLIPS.greet];
    if (!greet) {
      fadeTo(CLIPS.idle, false);
      return;
    }
    fadeTo(CLIPS.greet, true);
    const greetMs = greet.getClip().duration * 1000;
    const t = window.setTimeout(() => playOnce(CLIPS.present), greetMs + PRESENT_DELAY_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, mode]);

  useEffect(() => {
    if (nodSignal > 0) playOnce(CLIPS.nod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodSignal]);

  useEffect(() => {
    if (look) playOnce(clipForLook(look.dir));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [look?.n]);

  return (
    <group ref={root}>
      <primitive object={model} scale={fit.scale} position={fit.offset} />
    </group>
  );
}

export default function HouseBotCanvas({ active, ...botProps }: HouseBotCanvasProps) {
  return (
    <Canvas
      // flat = NoToneMapping, so the emissive eyes/antenna keep full strength.
      flat
      dpr={[1, DPR_CAP]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.15, 3.6], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.5, 3, 2]} intensity={0.9} />
      {/* Procedural studio environment (no HDR download from a third-party CDN). */}
      <Environment resolution={64} environmentIntensity={0.55}>
        <Lightformer form="rect" intensity={2} position={[0, 3, 2]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1} position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={1} position={[4, 1, 1]} rotation-y={-Math.PI / 2} scale={[4, 2, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Bot {...botProps} />
        <ContactShadows position={[0, -MODEL_HEIGHT / 2 - 0.12, 0]} opacity={0.35} scale={2.4} blur={2.6} far={1.2} frames={1} />
      </Suspense>
    </Canvas>
  );
}
