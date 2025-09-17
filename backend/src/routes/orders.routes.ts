import { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller';

const router = Router();
const ordersController = new OrdersController();

router.post('/', ordersController.createOrder.bind(ordersController));
router.get('/', ordersController.getAllOrders.bind(ordersController));
router.get('/:id', ordersController.getOrderById.bind(ordersController));
router.delete('/:id', ordersController.deleteOrder.bind(ordersController));

export default router;