"use client";

import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import {
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from "react";

type PremiumPointerOptions = {
  magnetic?: boolean;
  strength?: number;
  tilt?: number;
};

export default function usePremiumPointer({
  magnetic = true,
  strength = 0.12,
  tilt = 3.5,
}: PremiumPointerOptions = {}) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const spring = { stiffness: 360, damping: 26, mass: 0.48 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);
  const rotateX = useSpring(rawRotateX, spring);
  const rotateY = useSpring(rawRotateY, spring);

  const reset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY, rawX, rawY]);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const localX = Math.min(
        rect.width,
        Math.max(0, event.clientX - rect.left),
      );
      const localY = Math.min(
        rect.height,
        Math.max(0, event.clientY - rect.top),
      );
      const normalizedX = localX / rect.width - 0.5;
      const normalizedY = localY / rect.height - 0.5;

      target.style.setProperty("--pointer-x", `${localX}px`);
      target.style.setProperty("--pointer-y", `${localY}px`);
      target.style.setProperty("--pointer-nx", normalizedX.toFixed(3));
      target.style.setProperty("--pointer-ny", normalizedY.toFixed(3));

      if (reduceMotion || !magnetic) return;
      rawX.set(normalizedX * rect.width * strength);
      rawY.set(normalizedY * rect.height * strength);
      rawRotateX.set(normalizedY * -tilt);
      rawRotateY.set(normalizedX * tilt);
    },
    [
      magnetic,
      rawRotateX,
      rawRotateY,
      rawX,
      rawY,
      reduceMotion,
      strength,
      tilt,
    ],
  );

  const onPointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      event.currentTarget.style.setProperty("--pointer-x", "50%");
      event.currentTarget.style.setProperty("--pointer-y", "50%");
      reset();
    },
    [reset],
  );

  const style: MotionStyle | undefined =
    reduceMotion || !magnetic
      ? undefined
      : {
          x,
          y,
          rotateX,
          rotateY,
          transformPerspective: 780,
        };

  return { onPointerMove, onPointerLeave, style };
}
