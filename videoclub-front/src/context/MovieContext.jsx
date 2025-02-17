import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Crear el contexto de películas
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/movies`);
        if (!response.ok) {
          throw new Error("Error al obtener las películas");
        }
        const data = await response.json();
        setMovies(data);
        console.log("🎬 Películas cargadas desde el backend:", data);
      } catch (error) {
        console.error("❌ Error al cargar películas:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMovies = () => useContext(MovieContext);
