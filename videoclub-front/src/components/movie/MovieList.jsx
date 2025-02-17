// import React from "react";
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
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default MovieList;
