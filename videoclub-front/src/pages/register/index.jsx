import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // 🔥 Importamos el contexto de autenticación
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth(); // 🔥 Usamos la función `register` del contexto
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔥 Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Enviar el formulario de registro
  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData); // 📌 Llamamos a la función de registro
    navigate("/home"); // ✅ Redirigimos al usuario al login
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4">Crear Cuenta</Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
