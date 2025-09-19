import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = Router();
const productsController = new ProductsController();

// Ruta: obtener todos los productos
router.get('/', productsController.getAllProducts.bind(productsController));

// Ruta: obtener un producto por id
router.get('/:id', productsController.getProductById.bind(productsController));

// Ruta: crear un producto
router.post('/', productsController.createProduct.bind(productsController));

// Ruta: eliminar un producto
router.delete('/:id', productsController.deleteProduct.bind(productsController));

export default router;
