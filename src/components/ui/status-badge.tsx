import { Badge } from "@/components/ui/badge";

export function BadgeStatus({ status }) {
  const color = {
    paid: "bg-green-500",
    pending: "bg-yellow-500",
    canceled: "bg-red-500",
    shipped: "bg-blue-500",
  };

  return (
    <Badge className={`${color[status]} text-white capitalize`}>{status}</Badge>
  );
}
