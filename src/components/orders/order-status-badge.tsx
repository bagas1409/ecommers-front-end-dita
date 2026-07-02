"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED";
}

export function OrderStatusBadge({ status }: Props) {
  const colorMap: Record<Props["status"], string> = {
    PENDING: "bg-yellow-500",
    PROCESSING: "bg-blue-500",
    SHIPPED: "bg-purple-500",
    DELIVERED: "bg-green-600",
    CANCELED: "bg-red-600",
  };

  return (
    <Badge className={`${colorMap[status]} text-white`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}
