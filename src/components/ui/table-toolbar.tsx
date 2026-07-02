import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TableToolbar({ onSearch, children }) {
  return (
    <div className="my-4 flex items-center justify-between">
      <Input
        placeholder="Search..."
        className="max-w-sm"
        onChange={(e) => onSearch?.(e.target.value)}
      />

      <div className="flex gap-2">{children}</div>
    </div>
  );
}
