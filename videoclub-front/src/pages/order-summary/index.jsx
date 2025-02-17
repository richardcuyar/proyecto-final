import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const OrderSummaryPage = () => {
  const { orderId } = useParams(); // Obtenemos el ID del pedido desde la URL

  const [order, setOrder] = useState([]);

  useEffect(() => {
    // 🔍 Cargar el pedido correcto usando el orderId de la URL
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("No se pudo cargar el pedido");
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("❌ Error al cargar el pedido:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

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
            {order.movies.map((movie, index) => (
              <ListItem key={`${movie.movie._id}-${index}`} divider>
                <ListItemText
                  primary={movie.movie.name}
                  secondary={`Precio: €${movie.movie.price} - Cantidad: ${movie.quantity}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">
            Total:{" "}
            <strong>
              €
              {order.movies
                .reduce(
                  (sum, item) => sum + item.movie.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </strong>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default OrderSummaryPage;
