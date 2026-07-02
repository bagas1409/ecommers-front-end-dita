"use client";

import { useState } from "react";

interface CardContentProps {
  contentId: string; // contentId
  title: string;
  completed: boolean;
  onComplete: (contentId: string) => Promise<void>;
}

export default function CardProgress({
  contentId,
  title,
  completed: initialCompleted,
  onComplete,
}: CardContentProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  const markComplete = async (contentId?: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/progress/content/${contentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !completed }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to update progress", err);
        return;
      }

      const data = await res.json();
      setCompleted(data.isCompleted);
    } catch (error) {
      console.error("Error updating progress", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      await onComplete(contentId);
      setCompleted(true); // set local state
    } catch (err) {
      console.error("Error updating content:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-accent flex w-full items-center justify-between rounded-xl border p-4 shadow-sm">
      <span className={completed ? "text-gray-400 line-through" : ""}>
        {title}
      </span>
      <button
        onClick={handleClick}
        disabled={loading || completed}
        className={`rounded px-3 py-1 text-sm font-medium ${
          completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {loading ? "..." : completed ? "Completed" : "Mark Complete"}
      </button>
    </div>
  );
}
