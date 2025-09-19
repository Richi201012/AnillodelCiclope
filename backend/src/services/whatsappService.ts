// @ts-ignore
import fetch from "node-fetch";


export async function sendWhatsAppMessage(to: string, message: string) {
  const token = process.env.WHATSAPP_TOKEN;   // 👈 en tu .env
  const phoneId = process.env.WHATSAPP_PHONE_ID; // 👈 en tu .env

  if (!token || !phoneId) {
    throw new Error("Faltan variables de entorno de WhatsApp");
  }

  const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      text: { body: message },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error enviando WhatsApp: ${errorText}`);
  }

  return await res.json();
}
