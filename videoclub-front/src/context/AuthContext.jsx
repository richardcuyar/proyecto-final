import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "./CartContext"; // ✅ Importamos el contexto del carrito

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { dispatch } = useCart() || {}; // 🔥 Evita errores si `useCart()` es undefined

  useEffect(() => {
    console.log("👤 Usuario actual:", user);

    // ✅ Restaurar carrito si hay un usuario
    if (user) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      const savedTotal =
        JSON.parse(localStorage.getItem(`cartTotal_${user.email}`)) || 0;

      if (dispatch) {
        dispatch({
          type: "SET_CART",
          payload: { items: savedCart, total: savedTotal },
        });
        console.log(`🛒 Carrito restaurado para ${user.email}:`, savedCart);
      }
    }
  }, [user, dispatch]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Restaurar el carrito al iniciar sesión
    const savedCart =
      JSON.parse(localStorage.getItem(`cart_${userData.email}`)) || [];
    const savedTotal =
      JSON.parse(localStorage.getItem(`cartTotal_${userData.email}`)) || 0;

    if (dispatch) {
      dispatch({
        type: "SET_CART",
        payload: { items: savedCart, total: savedTotal },
      });
      console.log(
        `🛒 Carrito restaurado en login para ${userData.email}:`,
        savedCart
      );
    }
  };

  const logout = () => {
    if (user) {
      // ✅ Guardar el carrito antes de cerrar sesión
      localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(JSON.parse(localStorage.getItem("cart")) || [])
      );
      localStorage.setItem(
        `cartTotal_${user.email}`,
        JSON.stringify(JSON.parse(localStorage.getItem("cartTotal")) || 0)
      );
    }

    setUser(null);
    localStorage.removeItem("user");

    if (dispatch) {
      dispatch({ type: "CLEAR_CART" }); // 🔥 Limpia el estado, pero no `localStorage`
    }
  };

  // 🔥 Nueva función para registrar usuarios
  const register = async ({ name, email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        console.error("Error en el registro:", response.statusText);
        return false;
      }

      const userData = await response.json();
      login(userData); // 🔥 Inicia sesión automáticamente tras el registro
      return true;
    } catch (error) {
      console.error("Error al registrarse:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Validación de PropTypes
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
