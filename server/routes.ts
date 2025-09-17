import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Orders API
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.json({ success: true, order });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          error: "Datos de pedido inválidos", 
          details: validationError.toString() 
        });
      } else {
        console.error("Error creating order:", error);
        res.status(500).json({ 
          success: false, 
          error: "Error interno del servidor" 
        });
      }
    }
  });

  app.get("/api/orders/:phone", async (req, res) => {
    try {
      const { phone } = req.params;
      const orders = await storage.getOrdersByPhone(phone);
      res.json({ success: true, orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ 
        success: false, 
        error: "Error interno del servidor" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
