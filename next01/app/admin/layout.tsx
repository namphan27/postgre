"use client"; 

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); 

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-white">Admin Panel</h2>

        <nav className="space-y-2 flex-1">
          {[
            {
              href: "/admin",
              label: "Dashboard",
              icon: <LayoutDashboard size={20} />,
            },
            {
              href: "/admin/products",
              label: "Sản phẩm",
              icon: <Package size={20} />,
            },
            {
              href: "/admin/orders",
              label: "Đơn hàng",
              icon: <ShoppingCart size={20} />,
            },
            {
              href: "/admin/users",
              label: "Người dùng",
              icon: <Users size={20} />,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded transition-colors ${
                isActive(item.href)
                  ? "bg-red-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-8 shadow-sm justify-between">
          <span className="font-semibold text-slate-700">
            Chào mừng trở lại, Admin
          </span>
          <Link href="/" className="text-sm text-slate-500 hover:text-red-600">
            Về trang chủ
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
