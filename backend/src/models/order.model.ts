import { Schema, model } from 'mongoose';

interface Order {
  items: { productId: string; quantity: number }[];
  total: number;
  userId: string;
  status: 'pending' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<Order>({
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  total: { type: Number, required: true },
  userId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;