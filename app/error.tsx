"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9FB] px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-[#E91E63] mb-4">Something went wrong</h2>
        <p className="text-[#777777] mb-6">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-[#E91E63] text-white rounded-lg hover:bg-[#C2185B] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
