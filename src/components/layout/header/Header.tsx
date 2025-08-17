import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Header() {
  const { logout, token } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>
          <Link to="/gallery" style={{ color: "inherit", textDecoration: "none" }}>
            Mi Galería
          </Link>
        </Typography>

        {token && (
          <Box>
            <Link to="/upload" style={{ color: "inherit", textDecoration: "none" }}>
              <Button
                color="inherit"
                component={Link}
                to="/upload"
                sx={{ mr: 2 }}
              >
                Subir Imagen
              </Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
          
        )}
      </Toolbar>
    </AppBar>
  );
}
