import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCart } from "./CartContext"; // ✅ Importamos el contexto del carrito

// Crear el contexto de autenticación
const AuthContext = createContext();
// const API_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { dispatch } = useCart() || {};

  useEffect(() => {
    console.log("👤 Usuario actual:", user);
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
  /*
  // ✅ Iniciar sesión
  const login = async (email, password) => {
    const trimmedEmail = email.trim(); // Elimina espacios en blanco
    const trimmedPassword = password.trim(); // Elimina espacios en blanco
    console.log("🔑 Datos enviados desde el frontend:", {
      trimmedEmail,
      trimmedPassword,
    });

    //  console.log("🔑 Datos enviados desde el frontend:", { email, password }); // Verifica los datos
    // console.log("🔑 Contraseña enviada desde el frontend:", password); // Verifica la contraseña
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📨 Respuesta del backend:", data); // Verifica la respuesta
      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log("✅ Login exitoso:", data);
      } else {
        console.error("❌ Error en el login:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("🔥 Error al iniciar sesión:", error);
    }
  };
*/
  // ✅ LOGIN DE USUARIO
  const login = async (email, password) => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);

        // 🛠️ Guardar usuario en sessionStorage para que se elimine al cerrar el navegador
        sessionStorage.setItem("user", JSON.stringify(data));

        // 🛠️ Mantener el carrito en localStorage
        localStorage.setItem(`cart_${data.email}`, JSON.stringify([]));
        localStorage.setItem(`cartTotal_${data.email}`, JSON.stringify(0));

        console.log("✅ Login exitoso:", data);
      } else {
        console.error("❌ Error en el login:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("🔥 Error al iniciar sesión:", error);
    }
  };

  // ✅ LOGOUT DEL USUARIO
  const logout = () => {
    if (user) {
      // 🛠️ Mantener el carrito en localStorage pero eliminar la sesión
      sessionStorage.removeItem("user"); // Elimina la sesión
    }

    // 🔍 Limpiamos el carrito global (pero se mantiene el específico del usuario)
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    // 🔍 Limpiamos el estado global
    setUser(null);
    if (dispatch) dispatch({ type: "CLEAR_CART" });
  };

  /* const logout = () => {
    if (user) {
      // 🔍 Eliminamos las claves del carrito específicas del usuario
      localStorage.removeItem(`cart_${user.email}`);
      localStorage.removeItem(`cartTotal_${user.email}`);
    }

    // 🔍 Limpiamos el carrito global y la sesión
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("user");

    setUser(null);
    if (dispatch) dispatch({ type: "CLEAR_CART" });
  };
*/
  // ✅ Cerrar sesión
  /*const logout = () => {
    if (user) {
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
    if (dispatch) dispatch({ type: "CLEAR_CART" });
  };
*/

  // ✅ Registrar nuevo usuario
  const register = async ({ name, email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("✅ Usuario registrado con éxito:", data);
        login(email, password);
        return true;
      } else {
        console.error("❌ Error en el registro:", data.message);
        alert(data.message);
        return false;
      }
    } catch (error) {
      console.error("🔥 Error al registrarse:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
