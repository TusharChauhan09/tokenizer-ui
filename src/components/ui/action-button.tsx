"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  variant = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg border-2 border-gray-800 px-6 py-3 font-medium",
        "transition-all duration-200 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-gray-600",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary"
          ? "bg-black text-white hover:bg-gray-800"
          : "bg-white text-black hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
};
