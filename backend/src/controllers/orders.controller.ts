import { Request, Response } from 'express';

export class OrdersController {
  // Obtener todos los pedidos
  public async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      // 🔹 Aquí pondrías la lógica real con base de datos (ej. Mongoose)
      // Por ahora devolvemos un mock
      res.json([
        { id: 1, product: 'Coca-Cola', quantity: 2 },
        { id: 2, product: 'Papas Sabritas', quantity: 1 }
      ]);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo pedidos' });
    }
  }

  // Obtener un pedido por ID
  public async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Mock de ejemplo (reemplazar por lógica real)
      res.json({ id, product: 'Coca-Cola', quantity: 2 });
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo pedido por id' });
    }
  }

  // Crear un nuevo pedido
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { product, quantity } = req.body;
      // Aquí iría lógica de guardado en DB
      const newOrder = { id: Date.now(), product, quantity };
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error creando pedido' });
    }
  }

  // Eliminar un pedido por ID
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Aquí iría lógica para eliminar en DB
      res.json({ message: `Pedido con id ${id} eliminado` });
    } catch (error) {
      res.status(500).json({ message: 'Error eliminando pedido' });
    }
  }
}
