import request from 'supertest';
import app from '../src/app'; // Asegúrate de que la ruta sea correcta

describe('API Endpoints', () => {
  it('should return a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new product', async () => {
    const newProduct = { name: 'Test Product', price: 10.99 };
    const response = await request(app).post('/api/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
  });

  it('should return a list of orders', async () => {
    const response = await request(app).get('/api/orders');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new order', async () => {
    const newOrder = { productId: '1', quantity: 2 };
    const response = await request(app).post('/api/orders').send(newOrder);
    expect(response.status).toBe(201);
    expect(response.body.productId).toBe(newOrder.productId);
  });
});