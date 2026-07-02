"use client";

import { useState } from "react";

interface Props {
  images: string[];
}

export function ProductGallery({ images }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden rounded-md">
        <img src={images[active]} className="h-full w-full object-cover" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setActive(idx)}
            className={`overflow-hidden rounded-md border ${
              idx === active ? "border-primary" : "border-muted"
            }`}
          >
            <img src={img} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
