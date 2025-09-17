import express from 'express';
import { json } from 'body-parser';
import { ordersRoutes } from './routes/orders.routes';
import { productsRoutes } from './routes/products.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { config } from './config';

const app = express();

// Configuración de middleware
app.use(json());
app.use(authMiddleware);

// Rutas
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

// Inicialización del servidor
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;