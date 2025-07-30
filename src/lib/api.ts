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

export async function getBanks() {
  const response = await fetch(`${API_URL}/banks`);
  if (!response.ok) {
    throw new Error("Falha ao buscar bancos");
  }
  return response.json();
}

export async function createBank(name: string) {
  const response = await fetch(`${API_URL}/banks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Falha ao criar banco");
  }
  return response.json();
}

export async function createCategory(name: string, icon: string) {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, icon }),
  });
  if (!response.ok) {
    throw new Error("Falha ao criar categoria");
  }
  return response.json();
}

export async function createTransaction(data: {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  bankId: string;
  categoryId: string;
  date: string;
}) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: data.description,
      amount: data.amount,
      type: data.type,
      bankId: data.bankId,
      categoryId: data.categoryId,
      date: new Date(data.date).toISOString()
    }),
  });
  if (!response.ok) {
    throw new Error("Falha ao criar transação");
  }
  return response.json();
}