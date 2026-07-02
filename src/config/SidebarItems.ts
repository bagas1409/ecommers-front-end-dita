// src/config/sidebarItems.ts
import {
  Home,
  LayoutDashboardIcon,
  Package,
  ShoppingCart,
  UserCircle,
  BarChart3,
  ClipboardList,
  Settings,
  Heart,
} from "lucide-react";

interface SidebarSubItem {
  title?: string;
  url?: string;
  icon?: React.ElementType;
}

interface SidebarItem {
  title?: string;
  url?: string;
  menu?: string;
  submenu?: string;
  icon?: React.ElementType;
  children?: SidebarSubItem[];
}

export const sidebarItems: Record<string, SidebarItem[]> = {
  // ==========================
  //       ADMIN MENU
  // ==========================
  admin: [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboardIcon },

    {
      title: "Produk",
      icon: Package,
      children: [
        { title: "Daftar Produk", url: "/admin/products", icon: Package },
        {
          title: "Tambah Produk",
          url: "/admin/products/create",
          icon: Package,
        },
        { title: "Kategori", url: "/admin/categories", icon: Package },
      ],
    },

    {
      title: "Pesanan",
      icon: ShoppingCart,
      children: [
        { title: "Daftar Pesanan", url: "/admin/orders", icon: ClipboardList },
      ],
    },

    {
      title: "Pelanggan",
      url: "/admin/customers",
      icon: UserCircle,
    },

    {
      title: "Laporan",
      url: "/admin/reports",
      icon: BarChart3,
    },

    {
      title: "Pengaturan",
      url: "/admin/settings",
      icon: Settings,
    },
  ],

  // ==========================
  //        USER MENU
  // ==========================
  customer: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: LayoutDashboardIcon,
    },

    {
      title: "Belanja",
      icon: Package,
      children: [
        { title: "Semua Produk", url: "/customer/products", icon: Package },
      ],
    },

    { title: "Keranjang", url: "/customer/cart", icon: ShoppingCart },

    {
      title: "Pesanan Saya",
      url: "/customer/orders",
      icon: ClipboardList,
    },

    {
      title: "Akun",
      icon: UserCircle,
      children: [
        { title: "Profil", url: "/customer/profile", icon: UserCircle },
        { title: "Alamat", url: "/customer/address", icon: UserCircle },
      ],
    },
  ],
};
