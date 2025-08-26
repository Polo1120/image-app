import { useState } from "react";
import { uploadImage } from "../../services/images";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

export default function UploadImage({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [dateSpecial, setDateSpecial] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      await uploadImage({
        file,
        title,
        location,
        description,
        dateSpecial,
        tags: tags.split(",").map((t) => t.trim()),
      });
      onUpload();
      setFile(null);
      setTitle("");
      setLocation("");
      setDescription("");
      setDateSpecial("");
      setTags("");
    } catch {
      alert("Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, p: 2, border: "1px dashed #ccc", borderRadius: 2 }}
    >
      <Stack spacing={2} alignItems="center">
        <Button
          variant="outlined"
          component="label"
          disabled={loading}
          fullWidth
        >
          {file ? "Imagen seleccionada" : "Seleccionar imagen"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </Button>

        {file && (
          <Typography variant="body2" color="text.secondary">
            {file.name}
          </Typography>
        )}

        {/* Campos adicionales */}
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Fecha especial"
          type="date"
          value={dateSpecial}
          onChange={(e) => setDateSpecial(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Tags (separados por coma)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !file}
          fullWidth
        >
          {loading ? "Subiendo..." : "Subir"}
        </Button>

        {loading && <CircularProgress size={28} />}
      </Stack>
    </Box>
  );
}
