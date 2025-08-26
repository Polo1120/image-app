const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function getToken() {
  return localStorage.getItem("token");
}

interface UploadImageData {
  file: File
  dateSpecial: string
  title: string
  location: string
  description: string
  tags: string[]
}
export async function uploadImage(data: UploadImageData) {
  const formData = new FormData();

 
  formData.append("file", data.file);
  formData.append("dateSpecial", data.dateSpecial);
  formData.append("title", data.title);
  formData.append("location", data.location);
  formData.append("description", data.description);

  
  formData.append("tags", JSON.stringify(data.tags));

  const res = await fetch(`https://image-service-orod.onrender.com/api/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,

    },
    body: formData,
  });

  if (!res.ok) throw new Error("Error al subir imagen");
  return res.json();
}

export async function getUserImages() {
  const res = await fetch(`${API_URL}/api/images`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) console.error("Error al obtener imágenes");
  return res.json();
}

export async function deleteImage(_id: string) {
  const res = await fetch(`${API_URL}/api/images/${_id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) console.error("Error al eliminar imagen");
  return res.json();
}


export async function searchImage(q: string) {
  const res = await fetch(`${API_URL}/api/images/search?q=${encodeURIComponent(q)}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) console.error("Error al buscar imagen");
  return res.json();
}
