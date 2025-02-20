import React from "react";
import { Typography, Box, Divider, Paper } from "@mui/material";
import { useAuth } from "../../context/authContext";

const ProfilePage = () => {
  const { user } = useAuth(); // Obtenemos el usuario autenticado

  // Verificamos si hay un usuario activo
  if (!user) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" color="error">
          ⚠️ No hay usuario autenticado.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2, color: "black" }}>
        👤 Mi Perfil
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body1" sx={{ color: "black" }}>
        <strong>Nombre:</strong> {user.name}
      </Typography>
      <Typography variant="body1" sx={{ color: "black" }}>
        <strong>Email:</strong> {user.email}
      </Typography>
      {/* <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
        <strong>ID:</strong> {user._id}
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: 2, fontStyle: "italic", color: "gray" }}
      >
        🔐 Token (parcial): {user.token?.slice(0, 30)}...
      </Typography> */}
    </Paper>
  );
};

export default ProfilePage;
