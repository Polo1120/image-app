import {
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  ImageListItemBar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Masonry } from "@mui/lab";
import { deleteImage } from "../../api/images";
import { useState } from "react";
import "./styles.css";

type Image = {
  _id: string;
  url: string;
  title: string;
  filename: string;
};

export default function Gallery({
  images,
  onReload,
}: {
  images: Image[];
  onReload: () => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (_id: string) => {
    setSelectedId(_id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteImage(selectedId);
      onReload();
    } catch {
      alert("Error al eliminar la imagen");
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <div className="gallery-container">
      <Box sx={{ width: "100%", minHeight: 500, p: 2 }}>
        <Masonry columns={{ xs: 2, sm: 3, md: 3, lg: 4 }} spacing={2}>
          {images.length === 0 && (
            <Box sx={{ textAlign: "center", width: "100%", p: 3 }}>
              No hay imágenes aún.
            </Box>
          )}
          {images.map((img) => (
            <Box
              key={img._id}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <img
                src={img.url}
                alt={img.filename}
                style={{ width: "100%", display: "block" }}
              />
              <ImageListItemBar position="below" title={img.title} />
              <IconButton
                onClick={() => handleDeleteClick(img._id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Masonry>
      </Box>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>¿Eliminar esta imagen?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
