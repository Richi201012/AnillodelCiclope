import { Request, Response } from 'express';

export class ProductsController {
  // Obtener todos los productos
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      // 🔹 Aquí pondrías la lógica real con base de datos (ej. Mongoose)
      res.json([
        { id: 1, name: 'Coca-Cola', price: 20 },
        { id: 2, name: 'Papas Sabritas', price: 15 }
      ]);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo productos' });
    }
  }

  // Obtener un producto por ID
  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Mock de ejemplo (reemplazar con DB real)
      res.json({ id, name: 'Coca-Cola', price: 20 });
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo producto por id' });
    }
  }

  // Crear un nuevo producto
  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, price } = req.body;
      // Aquí iría lógica de guardado en DB
      const newProduct = { id: Date.now(), name, price };
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creando producto' });
    }
  }

  // Eliminar un producto por ID
  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // Aquí iría lógica para eliminar en DB
      res.json({ message: `Producto con id ${id} eliminado` });
    } catch (error) {
      res.status(500).json({ message: 'Error eliminando producto' });
    }
  }
}
