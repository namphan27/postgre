"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ReceiptResponse } from "@/app/type/index.type";

export default function ReceiptListPage() {
  const [receipts, setReceipts] = useState<ReceiptResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await fetch("http://localhost:3000/");

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: ReceiptResponse[] = await res.json();

        setReceipts(data);
      } catch (err) {
        console.error("Lỗi GET:", err);
      } finally {
        setLoading(false);
      }
    };

    getAll();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 text-black font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">
          Danh Sách Phiếu Nhập Kho
        </h1>
        <Link
          href="/receipt"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          + Tạo Phiếu Mới
        </Link>
      </div>

      <div className="bg-white p-6 border rounded shadow">
        {loading ? (
          <p className="text-center text-gray-500 py-4">Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full border text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Mã Phiếu</th>
                <th className="border p-2">Ngày Nhập</th>
                <th className="border p-2">Tổng Tiền</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(receipts) && receipts.length > 0 ? (
                receipts.map((r: ReceiptResponse, index: number) => (
                  <tr key={r.id || index}>
                    <td className="border p-2">{r.id}</td>
                    <td className="border p-2 font-bold text-blue-600">
                      {r.receiptCode}
                    </td>
                    <td className="border p-2">{r.receivedDate}</td>
                    <td className="border p-2">
                      {r.totalAmount?.toLocaleString()} đ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="border p-4 text-center text-gray-500"
                  >
                    Chưa có phiếu nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
