import { createContext, useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  total: JSON.parse(localStorage.getItem("cartTotal")) || 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      if (!action.payload.movie || !action.payload.movie._id) {
        console.error(
          "❌ Error: La película es inválida o no tiene un _id:",
          action.payload
        );
        return state;
      }

      const updatedCart = [
        ...state.items,
        {
          movie: action.payload.movie._id,
          name: action.payload.movie.name,
          price: action.payload.movie.price,
          quantity: action.payload.quantity,
        },
      ];

      const newTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cartTotal", JSON.stringify(newTotal));

      return { items: updatedCart, total: newTotal };
    }

    case "REMOVE_ITEM": {
      const itemIndex = state.items.findIndex(
        (item) => item.movie === action.payload.movie
      );

      if (itemIndex !== -1) {
        const updatedCart = [...state.items];
        updatedCart.splice(itemIndex, 1); // 🔥 Elimina solo UNA unidad

        const newTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("cartTotal", JSON.stringify(newTotal));

        console.log("❌ Carrito tras eliminar item:", updatedCart);
        return { items: updatedCart, total: newTotal };
      }

      return state;
    }

    case "CLEAR_CART":
      console.log("🗑 Carrito limpiado, pero no se borra de localStorage.");
      return { items: [], total: 0 }; // 🔥 NO borrar `localStorage`

    case "SET_CART":
      console.log("🔄 Restaurando carrito desde localStorage:", action.payload);
      return { items: action.payload.items, total: action.payload.total };

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
    localStorage.setItem("cartTotal", JSON.stringify(state.total));
  }, [state.items, state.total]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
