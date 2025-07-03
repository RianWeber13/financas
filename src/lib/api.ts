const API_URL = "http://localhost:3333/api";

export async function getTransactions() {
  const response = await fetch(`${API_URL}/transactions`);
  if (!response.ok) {
    throw new Error("Falha ao buscar transações");
  }
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("Falha ao buscar categorias");
  }
  return response.json();
}