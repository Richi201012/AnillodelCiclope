import { Product } from '../models/product.model';

export class ProductsService {
    private products: Product[] = [];

    public createProduct(productData: Product): Product {
        const newProduct = { ...productData, id: this.generateId() };
        this.products.push(newProduct);
        return newProduct;
    }

    public getAllProducts(): Product[] {
        return this.products;
    }

    public getProductById(productId: string): Product | undefined {
        return this.products.find(product => product.id === productId);
    }

    public updateProduct(productId: string, updatedData: Partial<Product>): Product | undefined {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex === -1) return undefined;

        const updatedProduct = { ...this.products[productIndex], ...updatedData };
        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }

    public deleteProduct(productId: string): boolean {
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex === -1) return false;

        this.products.splice(productIndex, 1);
        return true;
    }

    private generateId(): string {
        return (Math.random() * 1000000).toString(36).substring(0, 8);
    }
}