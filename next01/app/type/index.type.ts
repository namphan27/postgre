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

export interface ReceiptItemResponse
  extends ReceiptItemInput {
  id: number;
  amount: number;

  product?: {
    id: number;
    name: string;
    code: string;
    unit: string;
  };
}

export interface ReceiptResponse {
  id: number;
  receiptCode: string;
  receivedDate: string;
  totalAmount: number;

  items: ReceiptItemResponse[];

  createdAt: string;
}
