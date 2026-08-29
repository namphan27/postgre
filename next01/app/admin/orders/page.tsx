"use client";

import axiosInstance from "@/app/(main)/services/axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Order = {
  id: number;
  name: string;
  phone: string;
  address: string;
  total: number;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/admin/orders");

        const data = res.data;

        setOrders(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Quản lý Đơn hàng</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-400">
                <th className="pb-3">Mã đơn</th>
                <th className="pb-3">Khách hàng</th>
                <th className="pb-3">Số điện thoại</th>
                <th className="pb-3">Địa chỉ</th>
                <th className="pb-3">Tổng tiền</th>
                <th className="pb-3">Ngày tạo</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="py-4 font-medium">#{order.id}</td>
                  <td className="py-4">{order.name}</td>
                  <td className="py-4">{order.phone}</td>
                  <td className="py-4 text-sm text-slate-600 truncate max-w-xs">
                    {order.address}
                  </td>
                  <td className="py-4 font-bold text-slate-900">
                    {order.total.toLocaleString()}đ
                  </td>
                  <td className="py-4 text-sm text-slate-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
