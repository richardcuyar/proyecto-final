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
    <Box
      sx={{ padding: "20px", maxWidth: "400px", backgroundColor: "#ffffff" }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", marginBottom: 2, color: "black" }}
      >
        🎥 Carrito de Alquiler
      </Typography>

      {state.items.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "black" }}
        >
          El carrito está vacío.
        </Typography>
      ) : (
        <>
          <List>
            {state.items.map((movie, index) => (
              <ListItem key={`${movie.id}-${index}`} divider>
                <ListItemText
                  primary={movie.name}
                  secondary={`Precio: €${movie.price}`}
                  sx={{ color: "black" }} // Aquí añadimos el estilo
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(movie)}
                  sx={{
                    borderRadius: 5,
                    padding: "8px 20px",
                    "&:hover": {
                      backgroundColor: "#FFCC00",
                    },
                  }}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* 🔥 Mostrar el total del carrito */}
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Total: <strong>€{state.total.toFixed(2)}</strong>
          </Typography>

          {/* 🔥 Botón para vaciar carrito */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#FFD700", // Color amarillo
              color: "#000", // Texto negro
              borderRadius: 5,
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#FFCC00",
              },
            }}
            onClick={handleClearCart}
          >
            🗑 Vaciar Carrito
          </Button>

          {/* 🔥 Botón para ir a pagar */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#FFD700", // Color amarillo
              color: "#000", // Texto negro
              borderRadius: 5,
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#FFCC00",
              },
            }}
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
