import { Order } from '../models/order.model';

export class OrdersService {
    private orders: Order[] = [];

    public createOrder(orderData: Order): Order {
        const newOrder = { ...orderData, id: this.generateId() };
        this.orders.push(newOrder);
        return newOrder;
    }

    public getOrderById(orderId: string): Order | undefined {
        return this.orders.find(order => order.id === orderId);
    }

    public getAllOrders(): Order[] {
        return this.orders;
    }

    public updateOrder(orderId: string, updatedData: Partial<Order>): Order | undefined {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex === -1) return undefined;

        const updatedOrder = { ...this.orders[orderIndex], ...updatedData };
        this.orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

    public deleteOrder(orderId: string): boolean {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex === -1) return false;

        this.orders.splice(orderIndex, 1);
        return true;
    }

    private generateId(): string {
        return (Math.random() * 100000).toFixed(0);
    }
}