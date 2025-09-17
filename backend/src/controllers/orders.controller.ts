import { Request, Response } from 'express';
import { OrdersService } from '../services/orders.service';

export class OrdersController {
  private ordersService: OrdersService;

  constructor() {
    this.ordersService = new OrdersService();
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData = req.body;
      const newOrder = await this.ordersService.createOrder(orderData);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el pedido', error });
    }
  }

  public async getOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const order = await this.ordersService.getOrder(orderId);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el pedido', error });
    }
  }

  public async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const result = await this.ordersService.deleteOrder(orderId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
  }
}