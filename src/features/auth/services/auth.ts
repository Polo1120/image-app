const API_URL = process.env.REACT_APP_API_URL as string;


export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_API_KEY as string,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Error en login");
  return res.json();
}
