import {
  describe,
  it,
  expect,
  beforeEach,
  jest,
} from "@jest/globals";

import {
  receiptService,
  CreateReceiptDTO,
} from "./receipt.service";

import { prisma } from "../utils/prisma";

jest.mock("../utils/prisma", () => ({
  prisma: {
    receipt: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

const mockPrisma = prisma as any;

describe("Receipt Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createReceipt", () => {
    it("tạo phiếu nhập thành công", async () => {
      const data: CreateReceiptDTO = {
        receiptCode: "PN001",
        receivedDate: "2026-08-29",
        deliveryPersonId: 1,
        warehouseId: 1,
        items: [
          {
            productId: 1,
            docQuantity: 10,
            realQuantity: 8,
            unitPrice: 50000,
          },
        ],
      };

      mockPrisma.receipt.create.mockResolvedValue({
        id: 1,
        receiptCode: "PN001",
        totalAmount: 400000,
      });

      const result =
        await receiptService.createReceipt(data);

      expect(result).toEqual({
        id: 1,
        receiptCode: "PN001",
        totalAmount: 400000,
      });

      expect(
        mockPrisma.receipt.create
      ).toHaveBeenCalledTimes(1);
    });

    it("tính tổng tiền chính xác", async () => {
      const data: CreateReceiptDTO = {
        receiptCode: "PN002",
        receivedDate: "2026-08-29",
        deliveryPersonId: 1,
        warehouseId: 1,
        items: [
          {
            productId: 1,
            docQuantity: 2,
            realQuantity: 2,
            unitPrice: 10000,
          },
          {
            productId: 2,
            docQuantity: 3,
            realQuantity: 3,
            unitPrice: 5000,
          },
        ],
      };

      mockPrisma.receipt.create.mockResolvedValue({
        id: 2,
        receiptCode: "PN002",
        totalAmount: 35000,
      });

      await receiptService.createReceipt(data);

      expect(
        mockPrisma.receipt.create
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalAmount: 35000,
          }),
        })
      );
    });

    it("tạo phiếu không có các trường tùy chọn", async () => {
      const data: CreateReceiptDTO = {
        receiptCode: "PN003",
        receivedDate: "2026-08-29",
        deliveryPersonId: 1,
        warehouseId: 1,
        items: [
          {
            productId: 1,
            docQuantity: 1,
            realQuantity: 1,
            unitPrice: 10000,
          },
        ],
      };

      mockPrisma.receipt.create.mockResolvedValue({
        id: 3,
        receiptCode: "PN003",
        totalAmount: 10000,
      });

      const result =
        await receiptService.createReceipt(data);

      expect(result).toEqual({
        id: 3,
        receiptCode: "PN003",
        totalAmount: 10000,
      });
    });

    it("ném lỗi khi database bị lỗi", async () => {
      const data: CreateReceiptDTO = {
        receiptCode: "PN004",
        receivedDate: "2026-08-29",
        deliveryPersonId: 1,
        warehouseId: 1,
        items: [
          {
            productId: 1,
            docQuantity: 1,
            realQuantity: 1,
            unitPrice: 10000,
          },
        ],
      };

      mockPrisma.receipt.create.mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        receiptService.createReceipt(data)
      ).rejects.toThrow("Database error");
    });
  });

  describe("getAllReceipts", () => {
    it("lấy danh sách phiếu nhập", async () => {
      const mockReceipts = [
        {
          id: 1,
          receiptCode: "PN001",
        },
        {
          id: 2,
          receiptCode: "PN002",
        },
      ];

      mockPrisma.receipt.findMany.mockResolvedValue(
        mockReceipts
      );

      const result =
        await receiptService.getAllReceipts();

      expect(result).toEqual(mockReceipts);

      expect(
        mockPrisma.receipt.findMany
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("getReceiptById", () => {
    it("lấy phiếu nhập theo id", async () => {
      const mockReceipt = {
        id: 1,
        receiptCode: "PN001",
      };

      mockPrisma.receipt.findUnique.mockResolvedValue(
        mockReceipt
      );

      const result =
        await receiptService.getReceiptById(1);

      expect(result).toEqual(mockReceipt);

      expect(
        mockPrisma.receipt.findUnique
      ).toHaveBeenCalledTimes(1);
    });

    it("không tìm thấy phiếu", async () => {
      mockPrisma.receipt.findUnique.mockResolvedValue(
        null
      );

      const result =
        await receiptService.getReceiptById(999);

      expect(result).toBeNull();
    });
  });
});