// components/FaqItem.tsx
"use client"; // Ini adalah Client Component

import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-dark-text text-lg font-medium">{question}</h3>
        <span className="text-subtle-text text-2xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="text-subtle-text mt-4">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
