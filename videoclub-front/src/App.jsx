import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import BaseTheme from "./theme/base"; // ✅ Sin llaves si es `export default`
import {
  HomePage,
  CheckoutPage,
  LoginPage,
  RegisterPage, // 🔥 Nueva ruta de registro añadida
  OrderSummaryPage,
  ProfilePage,
  PaymentPage,
} from "./pages"; // ✅ Importamos directamente desde `pages/index.jsx`
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext"; // 🔥 CartProvider ahora envuelve todo
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider, useAuth } from "./context/AuthContext"; // ✅ Importamos correctamente
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";

// 🔍 Restaurar sesión al cargar la aplicación
function RestoreSession() {
  const { setUser } = useAuth();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    if (sessionUser) {
      setUser(sessionUser);
      console.log("🔍 Sesión restaurada desde sessionStorage:", sessionUser);
    }
  }, [setUser]);

  return null;
}

function App() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <UserProvider>
        <CartProvider>
          <AuthProvider>
            <MovieProvider>
              {/* 🔍 Restauramos la sesión al cargar la aplicación */}
              <RestoreSession />
              <BrowserRouter>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                  }}
                >
                  <Header />
                  <Container component="main" sx={{ flex: 1, mt: 4 }}>
                    <Routes>
                      {/* Ruta pública para Login */}
                      <Route path="/login" element={<LoginPage />} />

                      {/* 🔥 Nueva Ruta Pública para Registro */}
                      <Route path="/register" element={<RegisterPage />} />

                      {/* Ruta protegida para Checkout */}
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <CheckoutPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Ruta protegida para Resumen del Pedido */}
                      <Route
                        path="/order-summary/:orderId"
                        element={
                          <ProtectedRoute>
                            <OrderSummaryPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Ruta protegida para el perfil del usuario */}
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Ruta protegida para el pago */}
                      <Route
                        path="/payment"
                        element={
                          <ProtectedRoute>
                            <PaymentPage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Ruta pública para Home */}
                      <Route path="/" element={<HomePage />} />

                      {/* Redirección en caso de ruta no encontrada */}
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </Container>
                  <Footer />
                </Box>
              </BrowserRouter>
            </MovieProvider>
          </AuthProvider>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
