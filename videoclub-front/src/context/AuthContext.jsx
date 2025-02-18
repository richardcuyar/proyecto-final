import React from "react";
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

  const { dispatch } = useCart() || {};

  // Lógica para cargar el carrito guardado si el usuario está logueado
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

    // Escuchar el evento beforeunload para cerrar sesión al cerrar la ventana o pestaña
    const handleBeforeUnload = () => {
      if (user) {
        // Guardar el carrito antes de cerrar la ventana
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const currentTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;

        // Guardar el carrito y total en localStorage
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(currentCart));
        localStorage.setItem(
          `cartTotal_${user.email}`,
          JSON.stringify(currentTotal)
        );

        // Eliminar la sesión
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");

        dispatch && dispatch({ type: "CLEAR_CART" }); // Limpiar el carrito global
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, dispatch]);

  // Login del usuario
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
        localStorage.setItem("user", JSON.stringify(data)); // Guardar el usuario en localStorage

        // Recuperamos el carrito guardado del usuario desde localStorage
        const savedCart =
          JSON.parse(localStorage.getItem(`cart_${data.email}`)) || [];
        const savedTotal =
          JSON.parse(localStorage.getItem(`cartTotal_${data.email}`)) || 0;

        // Guardamos el carrito en el estado global
        if (dispatch) {
          dispatch({
            type: "SET_CART",
            payload: { items: savedCart, total: savedTotal },
          });
        }
      } else {
        console.error("❌ Error en el login:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("🔥 Error al iniciar sesión:", error);
    }
  };

  // Logout del usuario
  const logout = () => {
    if (user) {
      // Guardamos el carrito del usuario antes de hacer logout
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const currentTotal = JSON.parse(localStorage.getItem("cartTotal")) || 0;

      localStorage.setItem(`cart_${user.email}`, JSON.stringify(currentCart));
      localStorage.setItem(
        `cartTotal_${user.email}`,
        JSON.stringify(currentTotal)
      );
    }

    // Limpiar los datos de la sesión
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    if (dispatch) dispatch({ type: "CLEAR_CART" });
  };

  // Registrar nuevo usuario
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
