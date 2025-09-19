import { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller';

const router = Router();
const ordersController = new OrdersController();

// Ruta: obtener todos los pedidos
router.get('/', ordersController.getAllOrders.bind(ordersController));

// Ruta: obtener un pedido por id
router.get('/:id', ordersController.getOrderById.bind(ordersController));

// Ruta: crear un pedido
router.post('/', ordersController.createOrder.bind(ordersController));

// Ruta: eliminar un pedido
router.delete('/:id', ordersController.deleteOrder.bind(ordersController));

export default router;
