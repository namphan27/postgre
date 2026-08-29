import { prisma } from "../utils/prisma";

export interface ReceiptItemInput {
  productId: number;
  docQuantity: number;
  realQuantity: number;
  unitPrice: number;
}

export interface CreateReceiptDTO {
  receiptCode: string;
  receivedDate: string;
  docCode?: string;
  docDate?: string;
  debitAccount?: string;
  creditAccount?: string;
  note?: string;
  deliveryPersonId: number;
  warehouseId: number;
  items: ReceiptItemInput[];
}

export const receiptService = {
  async createReceipt(data: CreateReceiptDTO) {
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.realQuantity * item.unitPrice,
    0
  );

  return await prisma.receipt.create({
    data: {
      receiptCode: data.receiptCode,
      receivedDate: new Date(data.receivedDate),

      ...(data.docCode !== undefined && {
        docCode: data.docCode,
      }),

      ...(data.docDate !== undefined && {
        docDate: new Date(data.docDate),
      }),

      ...(data.debitAccount !== undefined && {
        debitAccount: data.debitAccount,
      }),

      ...(data.creditAccount !== undefined && {
        creditAccount: data.creditAccount,
      }),

      ...(data.note !== undefined && {
        note: data.note,
      }),

      totalAmount,

      deliveryPersonId: Number(data.deliveryPersonId),
      warehouseId: Number(data.warehouseId),

      items: {
        create: data.items.map((item) => ({
          productId: Number(item.productId),
          docQuantity: Number(item.docQuantity),
          realQuantity: Number(item.realQuantity),
          unitPrice: item.unitPrice,
          amount: item.realQuantity * item.unitPrice,
        })),
      },
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
      warehouse: true,
      deliveryPerson: true,
    },
  });
},
  async getAllReceipts() {
    return await prisma.receipt.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { product: true },
        },
        warehouse: true,
        deliveryPerson: true,
      },
    });
  },

  async getReceiptById(id: number) {
    return await prisma.receipt.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
        warehouse: true,
        deliveryPerson: true,
      },
    });
  },
};