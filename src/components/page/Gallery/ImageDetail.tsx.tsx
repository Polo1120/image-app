import { useParams, Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { Image } from "../../types/Image";


type ImageDetailProps = {
  images: Image[];
};

const ImageDetail = ({ images }: ImageDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const image = images.find((img) => img._id === id);

  if (!image) return <Typography>No se encontró la imagen</Typography>;

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {image.title}
      </Typography>
      <img
        src={image.url}
        alt={image.title}
        style={{ maxWidth: "100%", borderRadius: "12px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" component={Link} to="/">
          Volver a la galería
        </Button>
      </div>
    </Container>
  );
};

export default ImageDetail;
