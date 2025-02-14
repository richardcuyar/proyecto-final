import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const OrderSummaryPage = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // 🔥 Recuperamos el pedido guardado en localStorage
    const savedOrder = JSON.parse(localStorage.getItem("lastOrder")) || [];
    setOrder(savedOrder);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        📦 Resumen del Pedido
      </Typography>

      {order.length === 0 ? (
        <Typography variant="body1">No hay pedidos recientes.</Typography>
      ) : (
        <>
          <List>
            {order.map((movie, index) => (
              <ListItem key={`${movie.id}-${index}`} divider>
                <ListItemText
                  primary={movie.name}
                  secondary={`Precio: $${movie.price}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">
            Total:{" "}
            <strong>
              ${order.reduce((sum, movie) => sum + movie.price, 0).toFixed(2)}
            </strong>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default OrderSummaryPage;
