"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { AdminProduct, Product } from "@/app/type/product.type";
import Cookies from "js-cookie";
import axiosInstance from "@/app/(main)/services/axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    slug: string;
    categoryId: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    price: "",
    slug: "",
    categoryId: "",
    description: "",
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );
  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");

      setProducts(res.data.data as AdminProduct[]);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải danh sách");
    }
  };
  fetchProducts();
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.image) {
        const dataUpload = new FormData();
        dataUpload.append("image", formData.image);
        const token = Cookies.get("accessToken");
        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/admin/upload`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: dataUpload,
          },
        );

        if (!uploadRes.ok) throw new Error("Upload ảnh thất bại");
        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.url;
      }
      const token = Cookies.get("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/admin/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            price: Number(formData.price),
            slug: formData.slug,
            categoryId: Number(formData.categoryId),
            description: formData.description,
            image: imageUrl,
          }),
        },
      );

      if (res.ok) {
        toast.success("Thêm thành công!");
        setIsModalOpen(false);
        setFormData({
          name: "",
          price: "",
          slug: "",
          categoryId: "",
          description: "",
          image: null,
        });
        fetchProducts();
      } else {
        toast.error("Có lỗi xảy ra khi lưu sản phẩm");
      }
    } catch (err) {
      toast.error("Không thể kết nối server");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          + Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Tên sản phẩm</th>
              <th className="p-4">Giá</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id} className="border-b hover:bg-slate-50">
                <td className="p-4">{product.id}</td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">{product.price.toLocaleString()}đ</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        const adminProduct = product as AdminProduct;

                        setEditingProduct(adminProduct);
                        setFormData({
                          name: adminProduct.name,
                          price: adminProduct.price.toString(),
                          slug: adminProduct.slug,
                          categoryId: adminProduct.categoryId.toString(),
                          description: adminProduct.description,
                          image: null,
                        });
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Sửa
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <form
            onSubmit={handleCreateProduct}
            className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold">Thêm sản phẩm</h2>

            <input
              required
              placeholder="Tên sản phẩm"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="number"
                placeholder="Giá"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <input
                required
                type="number"
                placeholder="Category ID"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
              />
            </div>

            <input
              required
              placeholder="Slug"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, image: file });
                }
              }}
            />

            <textarea
              rows={3}
              placeholder="Mô tả sản phẩm"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu sản phẩm
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
