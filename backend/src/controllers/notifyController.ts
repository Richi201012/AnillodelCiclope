import { Request, Response } from "express";
import axios from "axios";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN as string;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID as string;

export const sendWhatsAppMessage = async (req: Request, res: Response) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Faltan parámetros: to, message" });
    }

    const url = `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to, // Número destino (ej. "5215551234567")
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error("❌ Error enviando mensaje:", error.response?.data || error);
    return res.status(500).json({
      error: "Error al enviar el mensaje de WhatsApp",
      details: error.response?.data || error.message,
    });
  }
};
