// import React from "react";
import { Typography, Box } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">👤 Mi Perfil</Typography>
      <Typography variant="body1">
        Aquí se mostrarán los datos del usuario.
      </Typography>
    </Box>
  );
};

export default ProfilePage;
