import { Request, Response } from "express";
import { receiptService } from "../services/receipt.service";

export const receiptController = {
  async createReceipt(req: Request, res: Response) {
    try {
      const receipt = await receiptService.createReceipt(req.body);

      return res.status(201).json({
        message: "Tạo phiếu nhập thành công",
        data: receipt,
      });
    } catch (error) {
      console.error("Create receipt error:", error);

      return res.status(500).json({
        message: "Không thể tạo phiếu nhập",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async getAllReceipts(req: Request, res: Response) {
    try {
      const receipts = await receiptService.getAllReceipts();

      return res.status(200).json({
        message: "Lấy danh sách phiếu nhập thành công",
        data: receipts,
      });
    } catch (error) {
      console.error("Get receipts error:", error);

      return res.status(500).json({
        message: "Không thể lấy danh sách phiếu nhập",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  async getReceiptById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: "ID phiếu nhập không hợp lệ",
        });
      }

      const receipt = await receiptService.getReceiptById(id);

      if (!receipt) {
        return res.status(404).json({
          message: "Không tìm thấy phiếu nhập",
        });
      }

      return res.status(200).json({
        message: "Lấy phiếu nhập thành công",
        data: receipt,
      });
    } catch (error) {
      console.error("Get receipt by id error:", error);

      return res.status(500).json({
        message: "Không thể lấy phiếu nhập",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};