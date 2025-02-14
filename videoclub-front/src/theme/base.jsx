import { createTheme } from "@mui/material/styles";

const BaseTheme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Amarillo Blockbuster
    },
    secondary: {
      main: "#0033A0", // Azul Blockbuster
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
  },
});

export default BaseTheme; // ✅ Asegurar que la exportación sea correcta
