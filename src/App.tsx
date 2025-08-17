import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/page/Login/LoginPage";
import Gallery from "./components/page/Gallery/Gallery";
import Header from "./components/layout/header/Header";
import { JSX, useState, useEffect } from "react";
import UploadImage from "./components/page/UploadImage/UploadImage";
import { getUserImages } from "./components/api/images";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const [images, setImages] = useState<any[]>([]); 

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
                  <Gallery images={images} onReload={loadImages} />
                </>
              </PrivateRoute>
            }
          />

          {/* Subida de imágenes */}
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

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/gallery" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
