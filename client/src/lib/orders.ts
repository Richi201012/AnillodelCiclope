// src/lib/orders.ts
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function createOrder(order: any) {
  try {
    console.log("📦 Pedido recibido en createOrder:", order);

    const orderData = {
      ...order,
      createdAt: serverTimestamp(),
      status: 'pending'
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);

    console.log("✅ Pedido guardado con ID:", docRef.id);
    return docRef.id;
    
  } catch (error: any) {
    console.error("❌ Error al crear pedido en Firestore:", error);
    
    // Manejo específico de errores comunes
    if (error?.code === 'permission-denied') {
      throw new Error('No tienes permisos para crear pedidos');
    } else if (error?.code === 'unavailable') {
      throw new Error('Servicio temporalmente no disponible. Intenta de nuevo.');
    } else if (error?.code === 'deadline-exceeded') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión.');
    } else {
      throw new Error('Error al procesar el pedido. Intenta de nuevo.');
    }
  }
}
