import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import Header from "./Header"; // Importa el componente Header
import Footer from "./Footer"; // Importa el componente Footer

const Layout = ({ children }) => {
  return (
    <div>
      <Header /> {/* Incluye el Header */}
      <main>{children}</main> {/* Contenido de la página */}
      <Footer /> {/* Incluye el Footer */}
    </div>
  );
};

// Validación de props
Layout.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo de React y es obligatorio
};

export default Layout;
