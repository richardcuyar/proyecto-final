import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const OrderSummaryListPage = () => {
  const { userId } = useParams(); // Obtenemos el ID del pedido desde la URL

  const [order, setOrder] = useState([]);

  console.log("🎬 OrderSummaryPage Renderizado"); // Esto se verá cada vez que el componente se renderice

  useEffect(() => {
    console.log("🧐 Order ID: ", userId); // Verifica si el ID del pedido es correcto
    // 🔍 Cargar el pedido correcto usando el orderId de la URL
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/orders?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("No se pudo cargar el pedido");
        }
        const data = await response.json();
        console.log("🚨 Pedidos obtenidos:", data); // Añadir log para ver la estructura

        setOrder(data);
      } catch (error) {
        console.error("❌ Error al cargar el pedido:", error);
      }
    };

    fetchOrder();
  }, [userId]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        📦 Todos mis alquileres
      </Typography>

      {/* Condicional para mostrar datos dependiendo si se cargó el pedido o no */}
      {order.length ? (
        <>
          <List>
            {order.map((order, orderIndex) => (
              <ListItem key={`${order._id}`} divider>
                {/* Mostrar el número de pedido */}
                <Typography variant="h6">
                  Pedido #{orderIndex + 1}
                </Typography>{" "}
                {/* orderIndex aquí */}
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
                {/* Mostrar el total de la compra */}
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Total: €{order.total.toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/*   <Typography variant="h6">
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
          </Typography>  */}
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default OrderSummaryListPage;
