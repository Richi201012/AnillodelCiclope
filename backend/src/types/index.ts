// Este archivo exporta tipos e interfaces utilizados en la aplicación para asegurar la consistencia de los datos.

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface Order {
    id: string;
    products: Product[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: 'user' | 'admin';
}