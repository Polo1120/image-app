import { Box, ImageList, ImageListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Image } from "../../types/Image";
import "./styles.css";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

export default function Gallery({ images }: { images: Image[] }) {
  const { isSm } = useBreakpoint();

  return (
    <div className="gallery-container">
      <Box sx={{ width: "100%" }}>
        <ImageList variant="masonry" cols={isSm ? 2 : 5} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item._id}>
              <Link to={`/image/${item._id}`}>
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
