import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; // 🔥 Contexto del carrito
import { useAuth } from "../../context/AuthContext"; // 🔥 Contexto de autenticación
import { useNavigate } from "react-router-dom"; // 🚀 Para redirigir
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Cart from "../cart/Cart"; // 📌 Asegúrate de que está bien importado
import { Link } from "react-router-dom"; // Importamos link

const Header = () => {
  const { user, logout } = useAuth(); // ✅ Obtener usuario y logout
  console.log("holi", user);
  const { state } = useCart(); // ✅ Obtener carrito
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  // 🔥 Alternar visibilidad del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
        <Toolbar>
          {/* 🎬 Título del Videoclub */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "#FFD700",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#FFD700",
                fontSize: "1.8rem",
                fontWeight: "bold",
              }}
            >
              🎬 Rent a Movie
            </Link>
          </Typography>

          {/* 👤 Icono de usuario */}
          <IconButton color="inherit" sx={{ color: "#FFD700" }}>
            <AccountCircle />
          </IconButton>

          {/* Si el usuario está autenticado, mostramos su email y logout */}
          {user ? (
            <>
              <Typography
                variant="body1"
                sx={{ marginRight: 2, color: "#FFD700" }}
              >
                {user.email}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  color: "white",
                  "&:hover": {
                    color: "white", // Cambia el color al hacer hover
                    backgroundColor: "#FF6F00", // Un color retro de hover (naranja)
                  },
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "white", // Cambia el color al hacer hover
                  backgroundColor: "#FF6F00", // Un color retro de hover (naranja)
                },
              }}
            >
              Iniciar Sesión
            </Button>
          )}
          {!user && (
            <Button
              color="inherit"
              onClick={() => navigate("/register")}
              sx={{
                color: "white",
                "&:hover": {
                  color: "white", // Cambia el color al hacer hover
                  backgroundColor: "#FF6F00", // Un color retro de hover (naranja)
                },
              }}
            >
              Crear Cuenta
            </Button>
          )}

          {/* 🛒 Icono del carrito con el número de películas alquiladas */}
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={state.items.length} color="secondary">
              <ShoppingCartIcon
                className="shake-animation"
                sx={{ color: "#FFD700" }}
              />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 📌 Enlace a "Mis Alquileres" */}
      <Button
        onClick={() => navigate(`/order-summary-list/${user?._id}`)}
        color="inherit"
        sx={{
          fontWeight: "bold",
          color: "#FFD700", // Color amarillo por defecto
          textTransform: "uppercase",
          "&:hover": {
            color: "#ffffff", // Cambiar color de texto a azul Blockbuster
            backgroundColor: "transparent", // Fondo transparente
            borderBottom: "3px solidrgb(255, 255, 255)", // Barra azul Blockbuster
          },
        }}
      >
        Mis Alquileres
      </Button>

      {/* 📌 Enlace a "Mi Perfil" */}
      <Link to="/profile">
        <Button
          color="inherit"
          sx={{
            fontWeight: "bold",
            color: "#FFD700", // Color amarillo por defecto
            textTransform: "uppercase",
            "&:hover": {
              color: "#ffffff", // Cambiar color de texto a azul Blockbuster
              backgroundColor: "transparent", // Fondo transparente
              borderBottom: "3px solidrgb(248, 252, 255)", // Barra azul Blockbuster
            },
          }}
        >
          Mi Perfil
        </Button>
      </Link>

      {/* 📌 Drawer para el carrito con nueva prop para cerrar el carrito */}
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Drawer>
    </>
  );
};

export default Header;
