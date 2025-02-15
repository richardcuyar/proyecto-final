import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Llama a la función login del contexto de autenticación
      await login(email, password);
      navigate("/"); // Redirigir al Home después de login
    } catch (error) {
      console.error("❌ Error en el login:", error);
      alert("Credenciales inválidas"); // Muestra un mensaje de error
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4">Iniciar Sesión</Typography>
        <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Iniciar Sesión
          </Button>
        </form>

        {/* 🔥 Agregamos el enlace a la página de registro */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta?{" "}
          <Button onClick={() => navigate("/register")} color="primary">
            Regístrate aquí
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
