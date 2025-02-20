import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types"; // ✅ Importamos PropTypes

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No hay películas disponibles.</p>;
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        console.log("🧐 Película en MovieList:", movie); // 🔥 Debugging
        return (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        );
      })}
    </Grid>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Ajustamos para que coincida con el _id en lugar de id
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired, // Asegúrate de que la película tenga este campo
      genre: PropTypes.string.isRequired, // Género
      actors: PropTypes.arrayOf(PropTypes.string).isRequired, // Actores
    })
  ).isRequired, // Añadimos isRequired para asegurarnos de que la propiedad 'movies' sea obligatoria
};

export default MovieList;
