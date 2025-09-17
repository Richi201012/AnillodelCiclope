import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.productsService.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating product', error });
    }
  }

  public async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productsService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products', error });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.productsService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching product', error });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const updatedProduct = await this.productsService.update(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating product', error });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const deletedProduct = await this.productsService.delete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}