import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Calendar, Trash2, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ClosedSale {
  id: string;
  date: string;
  total: number;
  orders: any[];
  closedAt: any; // Firestore Timestamp
}

export default function ClosedSalesDashboard() {
  const [closedSales, setClosedSales] = useState<ClosedSale[]>([]);
  const [dayToDelete, setDayToDelete] = useState<ClosedSale | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "closedSales"), (snapshot) => {
      setClosedSales(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as ClosedSale[]
      );
    });
    return () => unsub();
  }, []);

  const deleteClosedDay = async (day: ClosedSale) => {
    try {
      await deleteDoc(doc(db, "closedSales", day.id));
      setDayToDelete(null);
    } catch (error) {
      console.error("Error eliminando ventas cerradas:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between mb-10 border-b border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-12 w-12 text-yellow-400" />
          <h1 className="text-3xl font-extrabold tracking-wide">
            Ventas Cerradas
          </h1>
        </div>
        <Button
          onClick={() => navigate("/sales")}
          className="bg-blue-600 hover:bg-blue-700 rounded-full px-5 py-2 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Regresar a Ventas
        </Button>
      </header>

      {/* Listado de ventas cerradas */}
      <div className="space-y-10">
        {closedSales.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">
            No hay ventas cerradas todavía 📭
          </p>
        ) : (
          closedSales.map((day) => (
            <div
              key={day.id}
              className="bg-gray-800/60 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-yellow-400">
                  📅 {day.date}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-bold text-lg">
                    Total: ${day.total.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => setDayToDelete(day)}
                    className="bg-red-600 hover:bg-red-700 rounded-full flex items-center gap-2 px-4"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {day.orders.map((order, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900/80 rounded-lg p-5 border border-gray-700 shadow-md hover:shadow-lg transition"
                  >
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Orden #{order.id?.slice(0, 6) || idx} — $
                      {order.total.toFixed(2)}
                    </h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Cliente:{" "}
                      <span className="font-medium">{order.customerName}</span>
                    </p>
                    <div className="text-sm text-gray-400 space-y-1">
                      {order.items.map((item: any, i: number) => (
                        <p key={i}>
                          {item.quantity}x {item.name} — $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de confirmación */}
      {dayToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full text-center shadow-2xl border border-red-600/50">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              ⚠️ Eliminar ventas del {dayToDelete.date}
            </h2>
            <p className="mb-4 text-gray-300">
              Esto borrará <span className="font-bold">permanentemente</span> todas las ventas cerradas de este día.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setDayToDelete(null)}
                className="bg-gray-700 hover:bg-gray-800 rounded-full px-5"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => deleteClosedDay(dayToDelete)}
                className="bg-red-600 hover:bg-red-700 rounded-full px-5"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
