import { useState } from "react";
import { loginUser } from "../../features/auth/services/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      login(data.token);
      navigate("/gallery");
    } catch {
      setError("email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 400, width: "100%", position: "relative" }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Iniciar sesión
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            {error && (
              <Typography color="error" variant="body2" textAlign="center">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Iniciar sesión
            </Button>
          </Stack>
        </Box>
        <CircularProgress
          color="info"
          size={24}
          sx={{
            display: loading ? "flex" : "none",
            position: "absolute",
            bottom: "4px",
            left: "48%",
            transform: "translateX(-50%)",
          }}
        />
      </Paper>
    </Box>
  );
}

export { LoginForm };
