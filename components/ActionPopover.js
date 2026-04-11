/** @format */

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ActionPopover({
  message,
  description,
  x,
  y,
  isError = false,
  onClose,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      onClose?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!mounted || typeof document === "undefined") return null;

  const style = {
    position: "absolute",
    left:
      x !== undefined
        ? x + (typeof window !== "undefined" ? window.scrollX : 0)
        : "50%",
    top:
      y !== undefined
        ? y - 10 + (typeof window !== "undefined" ? window.scrollY : 0)
        : "20%",
    transform:
      x !== undefined ? "translate(-50%, -100%)" : "translate(-50%, -50%)",
    zIndex: 99999,
  };

  const bgBorder = isError
    ? "bg-red-500 border-red-500 dark:bg-red-600 dark:border-red-600"
    : "bg-red-400 border-red-400 dark:bg-red-500 dark:border-red-500";

  const arrowColor = isError
    ? "border-t-red-500 dark:border-t-red-600"
    : "border-t-red-400 dark:border-t-red-500";

  const iconColor = "text-white";
  const textColor = "text-white font-semibold";

  return createPortal(
    <div
      style={style}
      className="animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 pointer-events-none"
    >
      <div
        className={`px-4 py-3 rounded-lg shadow-xl backdrop-blur-md border ${bgBorder} flex items-center gap-3 min-w-[200px] max-w-[320px]`}
      >
        <div
          className={`flex shrink-0 items-center justify-center size-6 rounded-full bg-white/25 ${iconColor}`}
        >
          <i
            className={
              isError
                ? "fas fa-exclamation-circle text-sm"
                : "fas fa-check text-sm"
            }
          ></i>
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className={`text-sm ${textColor} truncate`}>{message}</span>
          {description && (
            <span className="text-xs text-white/80 mt-0.5 truncate">
              {description}
            </span>
          )}
        </div>
      </div>

      {x !== undefined && y !== undefined && (
        <>
          {/* Arrow */}
          <div
            className={`w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] ${arrowColor} absolute -bottom-[7px] left-1/2 -translate-x-1/2`}
          ></div>
        </>
      )}
    </div>,
    document.body,
  );
}
