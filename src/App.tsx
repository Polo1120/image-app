import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/page/Login/LoginPage";
import Gallery from "./components/page/Gallery/Gallery";
import Header from "./components/layout/header/Header";
import { JSX, useState, useEffect } from "react";
import UploadImage from "./components/page/UploadImage/UploadImage";
import { getUserImages } from "./components/api/images";
import { Image } from "./components/types/Image";
import ImageDetail from "./components/page/Gallery/ImageDetail.tsx";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);

  const loadImages = async () => {
    try {
      const data = await getUserImages();
      setImages(data);
    } catch (err) {
      console.error("Error cargando imágenes", err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Galería */}
            <Route
              path="/gallery"
              element={
                <PrivateRoute>
                  <>
                    <Header />
                    <Gallery images={images} />
                  </>
                </PrivateRoute>
              }
            />

            <Route
              path="/image/:id"
              element={
                <PrivateRoute>
                  <>
                    <Header />
                    <ImageDetail images={images} />
                  </>
                </PrivateRoute>
              }
            />

            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <>
                    <Header />
                    <UploadImage onUpload={loadImages} />
                  </>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/gallery" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
