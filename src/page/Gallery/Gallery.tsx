import { Box, ImageList, ImageListItem, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { Image } from "../../types/Image";
import "./styles.css";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export default function Gallery({
  images,
  loading,
}: {
  images: Image[];
  loading?: boolean;
}) {
  const { isSm } = useBreakpoint();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!loading && images.length === 0) {
    return <div>No hay imágenes para mostrar</div>;
  }

  return (
    <div className="gallery-container">
      <Box sx={{ width: "100%" }}>
        <ImageList variant="masonry" cols={isSm ? 2 : 5} gap={12} sx={{pb: 5}}>
          {images.map((item) => (
            <ImageListItem key={item._id}>
              <Link to={`/image/${item._id}`} className="gallery-link-item">
                <img
                  srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.url}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  className="gallery-image"
                />
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}
