import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Usamos `useAuth`

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // ✅ Obtener el usuario desde el contexto

  // 🔥 Si no hay usuario autenticado, redirige a Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
