import React from "react";

export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono text-blue-700 dark:text-blue-100 uppercase">
      {children}
    </p>
  );
}
