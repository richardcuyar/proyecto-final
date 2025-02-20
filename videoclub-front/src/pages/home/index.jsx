// import React from "react";
import { useMovies } from "../../context/MovieContext";
import MovieList from "../../components/movie/MovieList";

const HomePage = () => {
  const { movies } = useMovies(); // 🔥 Obtenemos las películas

  return (
    <div className="home-container">
      <h1 className="home-title">PELICULAS DISPONIBLES</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
