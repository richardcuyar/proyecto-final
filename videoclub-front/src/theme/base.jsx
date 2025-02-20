import { createTheme } from "@mui/material/styles";

const BaseTheme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Amarillo brillante similar a Blockbuster
    },
    secondary: {
      main: "#0000FF", // Azul intenso
    },
    background: {
      default: "#000000", // Fondo negro
    },
    text: {
      primary: "#ffffff", // Texto blanco para resaltar sobre el fondo oscuro
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h1: {
      fontWeight: "bold",
      fontSize: "2.5rem", // Títulos grandes al estilo retro
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1.1rem",
    },
  },
});
export default BaseTheme; // ✅ Asegurar que la exportación sea correcta
