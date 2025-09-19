import { Routes, Route, Navigate } from "react-router-dom";
import OrdersDashboard from "./pages/OrdersDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import ClosedSalesDashboard from "./pages/ClosedSalesDashboard"; // ✅ importa la nueva página
import Home from "./components/Home";
import Login from "./components/Login";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendedor" element={<OrdersDashboard />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas privadas */}
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <SalesDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/closed"
        element={
          <PrivateRoute>
            <ClosedSalesDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

