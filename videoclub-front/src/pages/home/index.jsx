// import React from "react";
import { useMovies } from "../../context/MovieContext";
import MovieList from "../../components/movie/MovieList";

const HomePage = () => {
  const { movies } = useMovies(); // 🔥 Obtenemos las películas

  return (
    <div>
      <h1>Películas Disponibles</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
