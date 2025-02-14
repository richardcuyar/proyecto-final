import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Importamos PropTypes

// Crear el contexto de películas
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // 🔥 Simulación de API de películas
    const fetchMovies = async () => {
      const fakeMovies = [
        {
          id: 1,
          name: "Jurassic Park",
          price: 3.99,
          image: "/img/jurassic.jpg",
        },
        { id: 2, name: "Titanic", price: 2.99, image: "/img/titanic.jpg" },
        { id: 3, name: "Matrix", price: 4.99, image: "/img/matrix.jpg" },
      ];
      console.log("🎬 Películas cargadas en MovieContext:", fakeMovies);

      setMovies(fakeMovies);
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
};

// ✅ Agregamos la validación de `children`
MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personalizado para acceder al contexto
export const useMovies = () => useContext(MovieContext);
