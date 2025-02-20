import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useCart } from "../../context/CartContext"; // 🔥 Importamos el contexto del carrito
import { useNavigate } from "react-router-dom"; // 🔥 Para redirigir a la página de pago

const Cart = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // 🔥 Eliminar película del carrito
  const handleRemoveFromCart = (movie) => {
    dispatch({ type: "REMOVE_ITEM", payload: movie });
  };

  // 🔥 Vaciar todo el carrito
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // 🔥 Ir a la página de pago y cerrar el carrito
  const handlePayment = () => {
    onClose(); // 🔥 Cierra el carrito antes de redirigir
    setTimeout(() => {
      navigate("/payment");
    }, 300); // 🔥 Pequeña espera para que el Drawer se cierre correctamente
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "400px" }}>
      <Typography variant="h6">🎥 Carrito de Alquiler</Typography>

      {state.items.length === 0 ? (
        <Typography variant="body1">El carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {state.items.map((movie, index) => (
              <ListItem key={`${movie.id}-${index}`} divider>
                <ListItemText
                  primary={movie.name}
                  secondary={`Precio: €${movie.price}`}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(movie)}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* 🔥 Mostrar el total del carrito */}
          <Typography variant="h6">
            Total: <strong>€{state.total.toFixed(2)}</strong>
          </Typography>

          {/* 🔥 Botón para vaciar carrito */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleClearCart}
          >
            🗑 Vaciar Carrito
          </Button>

          {/* 🔥 Botón para ir a pagar, ahora cierra el carrito antes de redirigir */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handlePayment}
          >
            💳 Pagar
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
