import DashboardClient from "./dasboard-cllient";

async function getDashboardStats() {
  return {
    revenue: {
      total: 0,
      thisMonth: 0,
      growth: 0
    },
    totalCustomers: 0,
    totalOrders: 0,
    totalProducts: 0,
    chart: [],
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
}
