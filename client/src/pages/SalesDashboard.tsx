import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  Calendar,
  DollarSign,
  ShoppingBag,
  Lock,
  ArrowLeft,
  RefreshCcw,
  Archive,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Sale {
  id: string;
  customerName: string;
  total: number;
  items: {
    name: string;
    price: number;
    quantity: number;
    customization?: string;
    specialInstructions?: string;
  }[];
  deliveredAt: any;
}

export default function SalesDashboard() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [dayToClose, setDayToClose] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sales"), (snapshot) => {
      setSales(
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Sale[]
      );
    });
    return () => unsub();
  }, []);

  // Agrupamos ventas por día
  const groupedSales = sales.reduce((acc: Record<string, Sale[]>, sale) => {
    const date = sale.deliveredAt?.toDate
      ? sale.deliveredAt.toDate().toLocaleDateString()
      : "Sin fecha";
    if (!acc[date]) acc[date] = [];
    acc[date].push(sale);
    return acc;
  }, {});

  // Total general
  const totalGeneral = sales.reduce((sum, s) => sum + s.total, 0);

  // Cerrar ventas de un día
  const closeSalesDay = async (date: string) => {
    const salesForDay = groupedSales[date];
    if (!salesForDay) return;

    try {
      await addDoc(collection(db, "closedSales"), {
        date,
        total: salesForDay.reduce((sum, s) => sum + s.total, 0),
        orders: salesForDay,
        closedAt: Timestamp.now(),
      });

      const batch = writeBatch(db);
      salesForDay.forEach((s) => {
        batch.delete(doc(db, "sales", s.id));
      });
      await batch.commit();

      setDayToClose(null);
    } catch (error) {
      console.error("Error cerrando ventas del día:", error);
    }
  };

  // Reiniciar todas las ventas
  const resetAllSales = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sales"));
      const batch = writeBatch(db);
      querySnapshot.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
      await batch.commit();
      setShowResetModal(false);
    } catch (error) {
      console.error("Error reiniciando ventas:", error);
    }
  };

  // 🔥 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/vendedor");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <DollarSign className="h-10 w-10 text-green-400" />
          <h1 className="text-3xl font-bold">Panel de Ventas</h1>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/vendedor")}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Regresar a Pedidos
          </Button>
          <Button
            onClick={() => navigate("/closed")}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Archive className="h-4 w-4" />
            Ventas Cerradas
          </Button>
          <Button
            onClick={() => setShowResetModal(true)}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Reiniciar Ventas
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Resumen general */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center">
          <ShoppingBag className="h-8 w-8 text-purple-400 mb-2" />
          <p className="text-gray-400">Órdenes completadas</p>
          <h2 className="text-2xl font-bold">{sales.length}</h2>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center">
          <DollarSign className="h-8 w-8 text-green-400 mb-2" />
          <p className="text-gray-400">Ingresos Totales</p>
          <h2 className="text-2xl font-bold text-green-300">
            ${totalGeneral.toFixed(2)}
          </h2>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col items-center">
          <Calendar className="h-8 w-8 text-yellow-400 mb-2" />
          <p className="text-gray-400">Días con ventas</p>
          <h2 className="text-2xl font-bold">
            {Object.keys(groupedSales).length}
          </h2>
        </div>
      </div>

      {/* Ventas por día */}
      <div className="space-y-10">
        {Object.entries(groupedSales).map(([date, salesForDay]) => {
          const totalDay = salesForDay.reduce((sum, s) => sum + s.total, 0);
          return (
            <div key={date} className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-yellow-400">
                  📅 {date} — Total: ${totalDay.toFixed(2)}
                </h3>
                <Button
                  onClick={() => setDayToClose(date)}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Cerrar Ventas
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {salesForDay.map((sale) => (
                  <div
                    key={sale.id}
                    className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                  >
                    <h4 className="font-semibold text-green-400 mb-2">
                      🧾 Orden #{sale.id.slice(0, 6)} — ${sale.total.toFixed(2)}
                    </h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Cliente:{" "}
                      <span className="font-medium">{sale.customerName}</span>
                    </p>
                    <div className="text-sm text-gray-400 space-y-1">
                      {sale.items.map((item, idx) => (
                        <p key={idx}>
                          {item.quantity}x {item.name} — $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación de cerrar ventas */}
      {dayToClose && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              ⚠️ Cerrar ventas del {dayToClose}
            </h2>
            <p className="mb-4 text-gray-300">
              Esto moverá todas las ventas de este día a{" "}
              <strong>ventas cerradas</strong> y ya no aparecerán aquí.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setDayToClose(null)}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => closeSalesDay(dayToClose)}
                className="bg-red-600 hover:bg-red-700"
              >
                Cerrar ventas
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de reinicio de ventas */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full text-center shadow-xl">
            <h2 className="text-xl font-bold text-red-500 mb-4">
              ⚠️ Reiniciar todas las ventas
            </h2>
            <p className="mb-4 text-gray-300">
              Esto eliminará <strong>todas</strong> las ventas actuales de
              manera permanente.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowResetModal(false)}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={resetAllSales}
                className="bg-red-600 hover:bg-red-700"
              >
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

