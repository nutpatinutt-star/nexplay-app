"use client";

import { RotateCw } from "lucide-react";
import { useEffect, useRef } from "react";

export default function PullToRefresh({
  isBengali = false,
}: {
  isBengali?: boolean;
}) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    let startX = 0;
    let startY = 0;
    let pullDistance = 0;
    let frame = 0;

    const reset = () => {
      pullDistance = 0;
      indicator.classList.remove("is-ready");
      indicator.style.opacity = "0";
      indicator.style.transform = "translate3d(-50%, -64px, 0)";
    };

    const onTouchStart = (event: TouchEvent) => {
      if (window.scrollY > 0 || event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!startY || window.scrollY > 0 || event.touches.length !== 1) return;
      const deltaX = event.touches[0].clientX - startX;
      const deltaY = event.touches[0].clientY - startY;
      if (deltaY <= 8 || Math.abs(deltaX) > deltaY) return;

      event.preventDefault();
      pullDistance = Math.min(94, deltaY * 0.42);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        indicator.style.opacity = `${Math.min(1, pullDistance / 38)}`;
        indicator.style.transform = `translate3d(-50%, ${-58 + pullDistance}px, 0)`;
        indicator.classList.toggle("is-ready", pullDistance >= 68);
      });
    };

    const onTouchEnd = () => {
      startX = 0;
      startY = 0;
      if (pullDistance < 68) {
        reset();
        return;
      }

      indicator.classList.add("is-refreshing");
      indicator.style.opacity = "1";
      indicator.style.transform = "translate3d(-50%, 14px, 0)";
      window.setTimeout(() => window.location.reload(), 480);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="pull-refresh-indicator"
      role="status"
      aria-live="polite"
    >
      <RotateCw size={17} />
      <span>{isBengali ? "রিফ্রেশ করতে টানুন" : "ดึงเพื่อรีเฟรช"}</span>
    </div>
  );
}
