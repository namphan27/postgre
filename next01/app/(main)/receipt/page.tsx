"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreateReceiptDTO, ReceiptItemInput } from "@/app/type/index.type";

export default function CreateReceiptPage() {
  const router = useRouter();

  const [receiptCode, setReceiptCode] = useState<string>("0");
  const [receivedDate, setReceivedDate] = useState<string>("0");
  const [deliveryPersonId, setDeliveryPersonId] = useState<number>(0);
  const [warehouseId, setWarehouseId] = useState<number>(0);

  const [items, setItems] = useState<ReceiptItemInput[]>([
    {
      productId: 0,
      docQuantity: 0,
      realQuantity: 0,
      unitPrice: 0,
    },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof ReceiptItemInput,
    value: number,
  ): void => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

  const handleAddItem = (): void => {
    setItems([
      ...items,
      {
        productId: 0,
        docQuantity: 0,
        realQuantity: 0,
        unitPrice: 0,
      },
    ]);
  };

  const handleCreate = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const payload: CreateReceiptDTO = {
      receiptCode,
      receivedDate,
      deliveryPersonId: Number(deliveryPersonId),
      warehouseId: Number(warehouseId),

      items: items.map((item) => ({
        productId: Number(item.productId),
        docQuantity: Number(item.docQuantity),
        realQuantity: Number(item.realQuantity),
        unitPrice: Number(item.unitPrice),
      })),
    };

    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Tạo phiếu thành công!");
        router.push("/");
      } else {
        alert("Lỗi tạo phiếu từ Backend!");
      }
    } catch (err) {
      console.log(err);
      alert("Không kết nối được tới Backend!");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-black font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Tạo Phiếu Nhập Kho</h1>

        <Link
          href="/receipts"
          className="text-blue-600 underline text-sm font-semibold"
        >
          &larr; Xem Danh Sách Phiếu
        </Link>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-white p-6 border rounded shadow space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Số Phiếu (*)
            </label>

            <input
              type="text"
              value={receiptCode}
              onChange={(e) => setReceiptCode(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Ngày Nhập (*)
            </label>

            <input
              type="date"
              value={receivedDate}
              onChange={(e) => setReceivedDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              ID Người Giao (*)
            </label>

            <input
              type="number"
              value={deliveryPersonId}
              onChange={(e) => setDeliveryPersonId(Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              ID Kho (*)
            </label>

            <input
              type="number"
              value={warehouseId}
              onChange={(e) => setWarehouseId(Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div className="border p-4 rounded bg-gray-50 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm">Chi tiết hàng hóa</h3>

            <button
              type="button"
              onClick={handleAddItem}
              className="bg-green-600 text-white text-xs px-3 py-1 rounded font-semibold hover:bg-green-700"
            >
              + Thêm Hàng
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 border-b pb-2">
              <div>
                <label className="text-xs font-semibold block">
                  ID Sản Phẩm
                </label>

                <input
                  type="number"
                  value={item.productId}
                  onChange={(e) =>
                    handleItemChange(index, "productId", Number(e.target.value))
                  }
                  className="w-full border p-1 rounded text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block">
                  SL Chứng Từ
                </label>

                <input
                  type="number"
                  value={item.docQuantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "docQuantity",
                      Number(e.target.value),
                    )
                  }
                  className="w-full border p-1 rounded text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block">
                  SL Thực Nhập
                </label>

                <input
                  type="number"
                  value={item.realQuantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "realQuantity",
                      Number(e.target.value),
                    )
                  }
                  className="w-full border p-1 rounded text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block">Đơn Giá</label>

                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", Number(e.target.value))
                  }
                  className="w-full border p-1 rounded text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
        >
          Gửi Tạo Phiếu 
        </button>
      </form>
    </div>
  );
}
