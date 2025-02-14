import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useCart } from "../../context/CartContext"; // ✅ Para obtener el total
import { useNavigate } from "react-router-dom";

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
  const handlePayment = () => {
    console.log("💳 Datos de pago enviados:", paymentData);

    // 🔥 Guardar los datos del pedido antes de vaciar el carrito
    localStorage.setItem("lastOrder", JSON.stringify(state.items));

    // Simulamos la confirmación del pago
    setTimeout(() => {
      alert("✅ Pago exitoso. ¡Gracias por tu compra!");
      dispatch({ type: "CLEAR_CART" }); // Vaciamos el carrito después del pago
      navigate("/order-summary"); // Redirigimos a la página de mis alquileres
    }, 1500);
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
        Total: ${state.total.toFixed(2)}
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
