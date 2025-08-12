"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OutputBoxProps {
  value: string;
  className?: string;
  label?: string;
  placeholder?: string;
}

export const OutputBox: React.FC<OutputBoxProps> = ({
  value,
  className,
  label,
  placeholder = "Output will appear here...",
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        className={cn(
          "min-h-[60px] w-full rounded-lg border-2 border-gray-800 bg-gray-50",
          "px-4 py-3 text-black overflow-auto",
          className
        )}
      >
        <pre className="whitespace-pre-wrap text-sm">
          {value || <span className="text-gray-500 italic">{placeholder}</span>}
        </pre>
      </div>
    </div>
  );
};
