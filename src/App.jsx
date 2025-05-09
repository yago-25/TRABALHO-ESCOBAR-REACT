import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginClients from "./pages/LoginClients";
import Register from "./pages/Register";
import HomeClients from "./pages/HomeClients";
import AdminPanel from "./pages/Admin/AdminPanel";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<LoginClients />} />
      <Route path="/register" element={<Register />} />
      <Route path="/client/home" element={<HomeClients />} />
      <Route path="/client/checkout" element={<Checkout />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route
        path="/admin/panel"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
