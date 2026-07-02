import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface DashboardData {
  revenue: { total: number; thisMonth: number; growth: number };
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      if (!res.data.success) throw new Error("Failed to fetch dashboard data");
      return res.data.data;
    },
    staleTime: 1000 * 60, // cache 1 menit
  });
}
