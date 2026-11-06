"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  lift?: number;
};

export default function MotionWrapper({
  children,
  className = "",
  delay = 0,
  lift = 3,
}: MotionWrapperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.992 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-24px" }}
      whileHover={reduceMotion ? undefined : { y: -lift, scale: 1.003 }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        type: "spring",
        stiffness: 360,
        damping: 30,
        mass: 0.66,
      }}
    >
      {children}
    </motion.div>
  );
}
