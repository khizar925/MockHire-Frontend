import React, { useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "framer-motion";

// 🔁 MovingBorder reusable wrapper
export const MovingBorder = ({
    children,
    duration = 2000,
    rx = "30%",
    ry = "30%",
    borderRadius = "1.75rem",
}) => {
    const pathRef = useRef();
    const progress = useMotionValue(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x);
    const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y);
    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <div
            className="relative inline-block p-[1px] overflow-hidden"
            style={{ borderRadius }}
        >
            <svg
                className="absolute h-full w-full"
                preserveAspectRatio="none"
                width="100%"
                height="100%"
            >
                <rect
                    ref={pathRef}
                    fill="none"
                    width="100%"
                    height="100%"
                    rx={rx}
                    ry={ry}
                />
            </svg>

            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform,
                    display: "inline-block",
                }}
            >
                <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]" />
            </motion.div>

            {children}
        </div>
    );
};

// 🎯 Reusable AnimatedButton
export default function AnimatedButton({
    children,
    className = "",
    duration,
    borderRadius,
    ...props
}) {
    return (
        <MovingBorder duration={duration} borderRadius={borderRadius}>
            <button
                className={`relative z-10 px-4 py-2 text-sm font-medium text-white bg-slate-900 border border-slate-800 rounded-[1.75rem] backdrop-blur-xl flex items-center ${className}`}
                style={{ borderRadius: borderRadius || "1.75rem" }}
                {...props}
            >
                {children}
            </button>
        </MovingBorder>
    );
}
