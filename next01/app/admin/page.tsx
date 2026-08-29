"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, Users, Package, TrendingUp } from "lucide-react";
import axiosInstance from "../(main)/services/axios";

type DashboardStats = {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/dashboard/stats");

        const result = response.data;

        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;

  const revenue = stats?.totalRevenue ?? 0;
  const orders = stats?.totalOrders ?? 0;
  const users = stats?.totalUsers ?? 0;

  const statCards = [
    {
      title: "Tổng doanh thu",
      value: `${revenue.toLocaleString()}đ`,
      icon: <TrendingUp className="text-emerald-600" />,
      trend: "+12%",
    },
    {
      title: "Tổng đơn hàng",
      value: orders.toLocaleString(),
      icon: <ShoppingCart className="text-blue-600" />,
      trend: "+5%",
    },
    {
      title: "Tổng khách hàng",
      value: users.toLocaleString(),
      icon: <Users className="text-purple-600" />,
      trend: "+18%",
    },
    {
      title: "Sản phẩm tồn kho",
      value: "85",
      icon: <Package className="text-amber-600" />,
      trend: "-2",
    },
  ];
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-100 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-slate-500">{stat.title}</p>
            <h3 className="text-xl font-bold text-slate-800 mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
