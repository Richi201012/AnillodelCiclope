import express from 'express';
import cors from 'cors';

import ordersRoutes from './routes/orders.routes';
import productsRoutes from './routes/products.routes';
import notifyRoutes from './routes/notifyRoutes';


import { errorMiddleware } from './middlewares/error.middleware';
import authMiddleware from './middlewares/auth.middleware';

import config from './config';

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // frontend en dev
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(authMiddleware);

// ✅ Rutas
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/notify', notifyRoutes);

// ✅ Manejo de errores
app.use(errorMiddleware);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
