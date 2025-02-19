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
    navigate("/login");
  };

  // 🔥 Alternar visibilidad del carrito
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* 🎬 Título del Videoclub */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              🎬 Mi Videoclub
            </Link>
          </Typography>

          {/* 👤 Icono de usuario */}
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>

          {/* Si el usuario está autenticado, mostramos su email y logout */}
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </Button>
          )}
          {!user && ( // crear cuenta
            <Button color="inherit" onClick={() => navigate("/register")}>
              Crear Cuenta
            </Button>
          )}

          {/* 🛒 Icono del carrito con el número de películas alquiladas */}
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={state.items.length} color="secondary">
              <ShoppingCartIcon className="shake-animation" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 📌 Enlace a "Mis Alquileres" */}

      <Button
        onClick={() => navigate(`/order-summary-list/${user._id}`)}
        color="inherit"
      >
        Mis Alquileres
      </Button>

      {/* 📌 Enlace a "Mi Perfil" */}
      <Link to="/profile">
        <Button color="inherit">Mi Perfil</Button>
      </Link>

      {/* 📌 Drawer para el carrito con nueva prop para cerrar el carrito */}
      <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Drawer>
    </>
  );
};

export default Header;
