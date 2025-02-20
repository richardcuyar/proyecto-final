import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useCart } from "../../context/CartContext"; // ✅ Para obtener el total
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PaymentPage = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // Estado para los datos de la tarjeta
  const [paymentData, setPaymentData] = useState({
    cardNumber: "4242 4242 4242 4242", // Tarjeta de prueba
    cardName: "Usuario de Prueba",
    expiryDate: "12/26",
    cvv: "123",
  });

  // Manejar cambios en los inputs
  const handleChange = (event) => {
    setPaymentData({ ...paymentData, [event.target.name]: event.target.value });
  };

  // Simular el pago
  // Importamos useAuth para acceder al ID del usuario
  const { user } = useAuth(); // Aquí usamos useAuth correctamente
  const handlePayment = () => {
    console.log("💳 Datos de pago enviados:", paymentData);

    // 🔍 Verificar contenido del carrito
    console.log("🛒 Estado actual del carrito:", state);

    // 🔥 Crear el objeto del pedido
    const orderData = {
      member: user?._id, // Usamos el ID del usuario autenticado si existe
      movies: state.items.map((item) => ({
        movie: item.movie,
        quantity: item.quantity,
      })),
    };

    // Verificar si el ID está presente
    if (!orderData.member) {
      alert("⚠️ Error: No se pudo obtener el ID del usuario.");
      return;
    }

    console.log("📦 orderData completo:", JSON.stringify(orderData, null, 2));

    // Enviar el pedido al backend
    fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el pedido");
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Pedido guardado exitosamente:", data);
        // 🔍 Guardar el ID del pedido en localStorage o pasarlo como parámetro
        //   localStorage.setItem("lastOrderId", data.order._id);

        alert("✅ Pago exitoso. ¡Gracias por tu compra!");

        // Limpiar carrito después de guardar el pedido
        dispatch({ type: "CLEAR_CART" });
        navigate(`/order-summary/${data.order._id}`);
      })
      .catch((error) => {
        console.error("❌ Error al guardar el pedido:", error);
        alert("❌ Hubo un problema al guardar tu pedido. Intenta de nuevo.");
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        💳 Pago Seguro
      </Typography>

      <TextField
        label="Número de Tarjeta"
        name="cardNumber"
        value={paymentData.cardNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Nombre en la Tarjeta"
        name="cardName"
        value={paymentData.cardName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Fecha de Expiración (MM/YY)"
        name="expiryDate"
        value={paymentData.expiryDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="CVV"
        name="cvv"
        value={paymentData.cvv}
        onChange={handleChange}
        type="password"
        fullWidth
        margin="normal"
      />

      {/* 🔥 Total a pagar */}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: €{state.total.toFixed(2)}
      </Typography>

      {/* Botón de pago */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
        onClick={handlePayment}
      >
        💳 Pagar Ahora
      </Button>
    </Box>
  );
};

export default PaymentPage;
