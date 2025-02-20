import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  Modal,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext"; // 🔥 Importamos el contexto del carrito
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const { dispatch } = useCart(); // 🔥 Accedemos al dispatch del carrito

  // Verificar si la película está fuera de stock
  const isOutOfStock = movie.stock === 0;

  // Función para añadir la película al carrito
  const handleAddToCart = () => {
    console.log("🆔 ID de la película enviado al carrito:", movie._id); // ➡️ Agregado para depuración
    dispatch({
      type: "ADD_ITEM",
      payload: {
        movie: {
          _id: movie._id,
          name: movie.name,
          price: movie.price,
        },
        quantity: 1,
      },
    });
  };

  console.log("🎬 MovieCard - Datos de la película:", movie); // 🔥 Debugging

  // A PARTIR DE AUQÍ SE HACE PARA LA VENTANA DE FICHA DE LAS PELÍCULAS
  // Estado para controlar el Modal
  const [open, setOpen] = useState(false);

  // Función para abrir el Modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el Modal
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "0.3s ease-in-out",
          "&:hover": { boxShadow: "0 5px 15px rgba(0,0,0,0.2)" },
          filter: isOutOfStock ? "grayscale(100%)" : "none", // Blanco y negro si no hay stock
          backgroundColor: "#282828", // Color de fondo más oscuro
        }}
      >
        <CardActionArea onClick={handleOpen}>
          {/* Imagen de la película */}
          <CardMedia
            component="img"
            height="200"
            image={movie.image} // ✅ Aseguramos que se usa correctamente
            alt={movie.name} // ✅ Se usa `name` en lugar de `title`
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              filter: isOutOfStock ? "grayscale(100%)" : "none", // Blanco y negro si no hay stock
            }}
            onError={(e) =>
              console.error("❌ Error cargando imagen:", e.target.src)
            }
          />
          <CardContent sx={{ backgroundColor: "#333" }}>
            {/* Nombre de la película */}
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              noWrap
              sx={{
                color: "#FFD700", // Color amarillo brillante
                textTransform: "uppercase", // Texto en mayúsculas
                fontWeight: "bold", // Texto en negrita
              }}
            >
              {movie.name} {/* ✅ Usamos `name` en lugar de `title` */}
            </Typography>
            {/* Precio de la película */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                paddingTop: "8px",
                color: "#FFD700", // Color amarillo brillante
              }}
            >
              €{movie.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{ justifyContent: "flex-end", backgroundColor: "#333" }}
        >
          {/* 🔥 Botón para añadir al carrito, desactivado si no hay stock */}
          <Button
            size="small"
            color="primary"
            onClick={handleAddToCart}
            disabled={isOutOfStock} // Desactiva el botón si no hay stock
            sx={{
              backgroundColor: isOutOfStock ? "#aaa" : "#FFD700", // Color amarillo cuando hay stock
              color: isOutOfStock ? "#666" : "#000", // Color negro cuando hay stock
              "&:hover": {
                backgroundColor: isOutOfStock ? "#aaa" : "#FFCC00", // Color dorado cuando se pasa por encima
              },
              borderRadius: "20px", // Bordes redondeados
            }}
          >
            {isOutOfStock ? "Sin Stock" : "Agregar al carrito"}
          </Button>
        </CardActions>
      </Card>

      {/* Modal con los detalles de la película */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#ffa900", fontSize: "1.8rem", fontWeight: "bold" }}
          >
            {movie.name}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Año:</strong> {movie.releaseYear}
          </Typography>
          <Typography>
            <strong>Género:</strong> {movie.genre}
          </Typography>
          <Typography>
            <strong>Actores:</strong> {movie.actors.join(", ")}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Precio:</strong> €{movie.price}
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: movie.stock === 0 ? "red" : "#0d3fa9", // Rojo si no hay stock
            }}
          >
            <strong>Stock disponible:</strong> {movie.stock} unidades
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

// ✅ Corregimos PropTypes para coincidir con los datos usados
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // 🔥 Agregamos `_id` correctamente
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired, // Añadimos el campo stock
    image: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default MovieCard;
