import Home from "../components/Home";
import OrdersDashboard from "../pages/OrdersDashboard";
import SalesDashboard from "../pages/SalesDashboard";
import ClosedSalesDashboard from "../pages/ClosedSalesDashboard"; // 👈 nuevo

export const componentMap: Record<string, React.FC> = {
  Home,
  OrdersDashboard,
  SalesDashboard,
  ClosedSalesDashboard, // 👈 lo añadimos al mapa
};
