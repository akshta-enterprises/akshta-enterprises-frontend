"use client";

import { motion, type MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export function MotionInView({
  children,
  className,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

