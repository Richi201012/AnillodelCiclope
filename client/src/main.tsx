import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 🔔 Importar Toaster
import "./index.css"; // ← Esta línea debe estar presente

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
        {/* 🔥 Toaster global para notificaciones */}
        <Toaster position="top-right" reverseOrder={false} />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
