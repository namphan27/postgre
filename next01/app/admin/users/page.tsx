"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "@/app/(main)/services/axios";
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/admin/users");

        const data = res.data;

        setUsers(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <span className="text-sm text-slate-500">
          Tổng: {users.length} người dùng
        </span>
      </div>

      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-400">
                <th className="pb-3">Họ tên</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Vai trò</th>
                <th className="pb-3">Ngày gia nhập</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="py-4 font-medium">{user.name}</td>
                  <td className="py-4">{user.email}</td>

                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-4 text-sm text-slate-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
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
