import { Router } from "express";
import { receiptController } from "../controllers/receipt.controller";

const router = Router();

router.post("/", receiptController.createReceipt);
router.get("/", receiptController.getAllReceipts);
router.get("/:id", receiptController.getReceiptById);

export default router;