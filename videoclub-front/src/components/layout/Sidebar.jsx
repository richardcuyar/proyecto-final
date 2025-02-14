// import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types"; // ✅ Importamos PropTypes;

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <List>
        <ListItem button>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Películas" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Mi Cuenta" />
        </ListItem>
      </List>
    </Drawer>
  );
};
// ✅ Validación de PropTypes
Sidebar.propTypes = {
  open: PropTypes.bool.isRequired, // 🔥 Validamos que `open` es un booleano requerido
  toggleSidebar: PropTypes.func.isRequired, // 🔥 Validamos que `toggleSidebar` es una función requerida
};

export default Sidebar;
