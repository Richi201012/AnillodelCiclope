import { Router } from "express";
import { sendWhatsAppMessage } from "../controllers/notifyController";

const router = Router();

// POST /api/notify
router.post("/notify", sendWhatsAppMessage);

export default router;
