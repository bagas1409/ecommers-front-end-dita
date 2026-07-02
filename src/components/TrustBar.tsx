import Shield from "./icons/Shield";

export default function TrustBar() {
  const items = [
    "Tanpa Paraben",
    "Cruelty‑Free",
    "Dermatologically Tested",
    "BPOM Certified",
    "Vegan Friendly",
  ];
  return (
    <div className="border-y border-gray-100 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-gray-600 md:text-sm">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
