"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  orderId: string;
  initialStatus:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELED";
  onUpdate: (id: string, status: Props["initialStatus"]) => void;
}

export function OrderStatusSelect({ orderId, initialStatus, onUpdate }: Props) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={status}
        onValueChange={(v) => setStatus(v as Props["initialStatus"])}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="PROCESSING">Processing</SelectItem>
          <SelectItem value="SHIPPED">Shipped</SelectItem>
          <SelectItem value="DELIVERED">Delivered</SelectItem>
          <SelectItem value="CANCELED">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="secondary"
        size="sm"
        onClick={() => onUpdate(orderId, status)}
      >
        Update
      </Button>
    </div>
  );
}
