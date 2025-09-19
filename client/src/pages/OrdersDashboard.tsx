import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // 🔔 Notificaciones

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderToDelete, setOrderToDelete] = useState<any | null>(null);
  const prevOrdersRef = useRef<string[]>([]);

  useEffect(() => {
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔔 Detectar nuevos pedidos
      const prevOrders = prevOrdersRef.current;
      const addedOrders = newOrders.filter(
        (o) => !prevOrders.includes(o.id)
      );

      if (addedOrders.length > 0) {
        addedOrders.forEach((order) => {
          toast.success(`📦 Nuevo pedido de ${order.customerName}`, {
            style: {
              background: "#1e293b",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px",
            },
            icon: "🛎️",
          });

          // 🔊 Reproducir sonido (archivo en /public/notification.mp3)
          const audio = new Audio("/notification.mp3");
          audio.play().catch(() => {});
        });
      }

      prevOrdersRef.current = newOrders.map((o) => o.id);
      setOrders(newOrders);
    });

    return () => {
      unsubOrders();
    };
  }, []);

  // 👇 Modificado para enviar WhatsApp cuando el vendedor acepte
  const updateStatus = async (id: string, status: string, order?: any) => {
    const ref = doc(db, "orders", id);
    await updateDoc(ref, { status });

    if (status === "in_progress" && order?.customerPhone) {
      try {
        await fetch("http://localhost:4000/api/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: order.customerPhone, // ⚠️ debe ir con lada internacional (ej: "5215551234567" en México)
            message:
              "✅ Tu pedido está en preparación, gracias por tu compra 🍔🚀",
          }),
        });
        console.log("📲 Mensaje de WhatsApp enviado");
      } catch (err) {
        console.error("❌ Error enviando WhatsApp:", err);
      }
    }
  };

  const confirmDelete = (order: any) => {
    setOrderToDelete(order);
  };

  const deleteOrder = async () => {
    if (orderToDelete) {
      await deleteDoc(doc(db, "orders", orderToDelete.id));
      setOrderToDelete(null);
    }
  };

  const markAsDelivered = async (order: any) => {
    await addDoc(collection(db, "sales"), {
      ...order,
      deliveredAt: new Date(),
    });
    await deleteDoc(doc(db, "orders", order.id));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* 🔔 Toaster global */}
      <Toaster position="top-right" />

      {/* Header */}
      <header className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">📋 Panel de Pedidos</h1>
        <Link
          to="/sales"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition"
        >
          <BarChart3 className="h-5 w-5" />
          Reporte de Ventas
        </Link>
      </header>

      {/* Grid de pedidos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow-lg flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-yellow-400">
                🧾 Pedido #{o.id.slice(0, 6)}
              </h2>
              <span
                className={`px-3 py-1 rounded text-xs font-bold ${
                  o.status === "pending"
                    ? "bg-yellow-500 text-black"
                    : o.status === "in_progress"
                    ? "bg-blue-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {o.status || "pending"}
              </span>
            </div>

            {/* Cliente */}
            <div className="text-sm text-gray-300 space-y-1 mb-3">
              <p>
                <strong>👤 Cliente:</strong> {o.customerName}
              </p>
              <p>
                <strong>📞 Teléfono:</strong> {o.customerPhone}
              </p>
              <p>
                <strong>📍 Dirección:</strong> {o.address || "No proporcionada"}
              </p>
            </div>

            {/* Productos */}
            {o.items && o.items.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-3 mb-4">
                <strong className="block text-purple-400 mb-2">
                  📦 Productos:
                </strong>
                {o.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-200 border-b border-gray-600 py-1 last:border-0"
                  >
                    <div>
                      <span className="font-medium">
                        {item.quantity}x {item.name}
                      </span>
                      {item.customization && (
                        <p className="text-yellow-300 text-xs">
                          ✨ {item.customization}
                        </p>
                      )}
                      {item.specialInstructions && (
                        <p className="text-blue-300 text-xs">
                          📌 {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    <span className="text-green-400 font-semibold">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Total */}
            <p className="text-right text-lg font-bold text-green-400 mb-4">
              💰 Total: ${o.total}
            </p>

            {/* Acciones */}
            <div className="flex flex-wrap gap-2">
              <button
                className="flex-1 bg-blue-600 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                onClick={() => updateStatus(o.id, "in_progress", o)} // 👈 pasamos order completo
              >
                ✅ Aceptar
              </button>
              <button
                className="flex-1 bg-green-600 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                onClick={() => markAsDelivered(o)}
              >
                📦 Entregado
              </button>
              <button
                className="flex-1 bg-red-600 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                onClick={() => confirmDelete(o)}
              >
                ❌ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-500">
              ⚠️ Eliminar Pedido
            </h2>
            <p className="mb-4 text-gray-300">
              ¿Seguro que quieres eliminar el pedido de{" "}
              <strong>{orderToDelete.customerName}</strong>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                onClick={() => setOrderToDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                onClick={deleteOrder}
              >
                ❌ Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
