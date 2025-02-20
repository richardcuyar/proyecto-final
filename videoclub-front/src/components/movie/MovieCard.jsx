import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCart } from "../../context/CartContext"; // 🔥 Importamos el contexto del carrito

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

  return (
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
      <CardActionArea>
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
  }).isRequired,
};

export default MovieCard;
