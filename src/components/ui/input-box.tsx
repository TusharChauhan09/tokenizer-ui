"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InputBoxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  value,
  onChange,
  className,
  label,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "min-h-[60px] w-full rounded-lg border-2 border-gray-800 bg-white",
          "px-4 py-3 text-black placeholder:text-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-gray-600",
          "resize-none transition-all duration-200",
          className
        )}
        rows={3}
      />
    </div>
  );
};
