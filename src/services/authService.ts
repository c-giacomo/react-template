export interface LoginResponse {
  token: string;
}

export async function handleSignIn(username: string, password: string): Promise<LoginResponse> {
  
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Credenziali non valide");
  }

  // Verifica che il backend abbia restituito il token
  if (!data.token) {
    throw new Error("Token JWT non presente nella risposta");
  }

  return data;
};

  