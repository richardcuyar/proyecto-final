import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useCart } from "../../context/CartContext"; // ✅ Importamos el contexto del carrito

const Cart = () => {
  const { state, dispatch } = useCart(); // ✅ Accedemos al estado y acciones del carrito

  // 🔥 Eliminar una película del carrito
  const handleRemoveFromCart = (movie) => {
    dispatch({ type: "REMOVE_ITEM", payload: movie });
  };

  // 🔥 Vaciar todo el carrito
  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <Box sx={{ width: 320, p: 2 }}>
      {/* 🔥 Título del carrito */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        🎥 Carrito de Alquiler
      </Typography>

      <List>
        {state.items.length === 0 ? (
          <Typography variant="body1">El carrito está vacío</Typography>
        ) : (
          <>
            {state.items.map((movie, index) => (
              <ListItem key={`${movie.id}-${index}`} divider>
                <ListItemText
                  primary={movie.name}
                  secondary={`$${movie.price.toFixed(2)}`}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveFromCart(movie)}
                >
                  ❌
                </Button>
              </ListItem>
            ))}

            {/* 🔥 Mostrar el total del carrito */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${state.total.toFixed(2)}
            </Typography>

            {/* 🔥 Botón para vaciar el carrito */}
            <Button
              variant="contained"
              color="error"
              onClick={handleClearCart}
              fullWidth
              sx={{ mt: 2 }}
            >
              Vaciar Carrito 🗑️
            </Button>
          </>
        )}
      </List>
    </Box>
  );
};

export default Cart;
