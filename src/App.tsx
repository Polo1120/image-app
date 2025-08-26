import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import LoginPage from "./page/Login/LoginPage";
import Gallery from "./page/Gallery/Gallery";
import Header from "./layout/header/Header";
import { JSX, useState, useEffect, useCallback } from "react";
import UploadImage from "./page/UploadImage/UploadImage";
import { getUserImages, searchImage } from "./services/images";
import { Image } from "./types/Image";
import ImageDetail from "./page/ImageDetail/ImageDetail.tsx";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import SearchResultsPage from "./page/SearchPage/SearchResultsPage";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [images, setImages] = useState<Image[]>([]);
  const { token } = useAuth();

  const loadImages = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getUserImages();
      setImages(data);
    } catch (err) {
      console.error("Error cargando imágenes", err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchImages = async () => {
      try {
       
        const all = await getUserImages();
        setImages(all);
      } catch (err) {
        console.error("Error cargando imágenes", err);
      }
    };

    fetchImages();
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Header />
              
              <Gallery images={images} loading={!images.length} />
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

      <Route
        path="/q"
        element={
          <PrivateRoute>
            <>
              <Header />
              <SearchResultsPage searchImage={searchImage} />
            </>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
