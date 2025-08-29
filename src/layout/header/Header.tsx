import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import BottomBar from "../../components/bottomBar/BottomBar"; // Asegúrate de crear este componente
import { useBreakpoint } from "../../hooks/useBreakpoint";
import "./styles.css";
import SearchBar from "../../components/searchBar/SearchBar";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";

export default function Header() {
  const { token } = useAuth();

  const { isSm } = useBreakpoint();

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
          }}
        >
          <Typography component="div" sx={{ cursor: "pointer" }}>
            <Link
              to="/gallery"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Mi Galería
            </Link>
          </Typography>

          {token && (
            <Box>
              {isSm ? (
                <IconButton
                  component={Link}
                  to="/upload"
                  color="inherit"
                  edge="start"
                  aria-label="add"
                  className="add-icon-button"
                  sx={{
                    position: "absolute",
                    right: 16,
                    padding: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></IconButton>
              ) : (
                <>
                  <Box display="flex" alignItems="center" gap={2}>
                    <SearchBar />
                    <AvatarMenu />
                  </Box>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isSm && <SearchBar />}
      {isSm && <BottomBar />}
    </>
  );
}
