import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function testFirestoreConnection() {
  try {
    console.log("🔍 Probando conexión con Firestore...");

    // Intentar leer documentos de la colección "orders"
    const snapshot = await getDocs(collection(db, "orders"));

    console.log(`✅ Firestore conectado. Documentos en 'orders': ${snapshot.size}`);
    snapshot.forEach((doc) => {
      console.log("📄", doc.id, "=>", doc.data());
    });

  } catch (error) {
    console.error("❌ Error al conectar con Firestore:", error);
  }
}
