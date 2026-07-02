"use client";
import { useEffect, useState } from "react";
import CardContent from "./cardcontent";
import { Progress } from "../ui/progress";

interface CardCourseProps {
  courseId: string;
  title: string;
  description: string;
  total: number;
  completed: number;
}

interface CourseContent {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default function CardCourse({
  courseId,
  title,
  description,
  total,
  completed,
}: CardCourseProps) {
  const [contents, setContents] = useState<CourseContent[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await fetch(`/api/progress/course/${courseId}`);
        const data = await res.json();
        // jika API mengembalikan { courseId, contents: [...] }
        setContents(Array.isArray(data.contents) ? data.contents : []);
      } catch (err) {
        console.error("Failed to fetch course contents:", err);
        setContents([]);
      }
    };
    fetchContents();
  }, [courseId]);

  const handleComplete = async (contentId: string) => {
    try {
      const res = await fetch(`/api/progress/content/${contentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!res.ok) throw new Error("Failed to update progress");

      // Update state lokal
      setContents((prev) =>
        prev.map((c) =>
          c._id === contentId ? { ...c, isCompleted: true } : c,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-card space-y-4 rounded-xl border p-6 shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm font-medium">
        Progress: {contents.filter((c) => c.isCompleted).length}/{total}
      </p>
      <Progress
        value={(contents.filter((c) => c.isCompleted).length / total) * 100}
        className="h-4 rounded-full"
      />

      <div className="flex w-full flex-col gap-4">
        {contents.map((content) => (
          <CardContent
            key={content._id}
            contentId={content._id}
            title={content.title}
            completed={content.isCompleted}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
}
