// src/components/icons/Stars.jsx
import Star from "./Star";

export default function Stars() {
  return (
    <div className="flex items-center text-rose-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </div>
  );
}
