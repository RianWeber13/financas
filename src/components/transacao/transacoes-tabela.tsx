import {
  LucideIcon,
  ShoppingBasket,
  Car,
  Film,
  DollarSign,
  Heart,
  Wifi,
  Zap,
  Fuel,
  Utensils
} from "lucide-react";

// Criamos um "mapa" para encontrar o componente de ícone correto a partir de seu nome (string)
const iconMap: { [key: string]: LucideIcon } = {
  ShoppingBasket,
  Car,
  Film,
  DollarSign,
  Heart,
  Wifi,
  Zap,
  Fuel,
  Utensils
};

// Interface para a estrutura de uma transação que vem da API
interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  bank: { name: string };
  category: {
    icon: string; // O ícone virá da API como uma string (ex: "Car")
    name: string;
  };
  date: string;
}

// Interface para as propriedades (props) do nosso componente
interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {

  // Função para obter o componente de ícone correto a partir do nome
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    // Se o ícone for encontrado no mapa, renderiza o componente, senão não renderiza nada
    return IconComponent ? <IconComponent size={20} /> : null;
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        height: "100%",
      }}
    >
      <h3 style={{color:"white"}}>Transações</h3>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        overflowY: "auto",
        height: "100%",
      }}>
        <table style={{
          borderCollapse: "collapse",
        }}>
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Descrição</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Tipo</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Valor</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Banco</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {/* Adicionamos uma verificação para garantir que 'transactions' é um array antes de usar .map */}
            {Array.isArray(transactions) && transactions.map((transaction) => (
              (
                <tr key={transaction.id} style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "0.5rem",
                }}>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem" }}>
                    {getIcon(transaction.category.icon)}
                  </td>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem" }}>
                    {transaction.description}
                  </td>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem" }}>
                    {transaction.type === "income" ? "Entrada" : "Saída"}
                  </td>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem", color: transaction.type === 'income' ? 'green' : 'red' }}>
                    {transaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem" }}>
                    {transaction.bank.name}
                  </td>
                  <td style={{ textAlign: "start", fontWeight: "normal", padding: "0.5rem" }}>
                    {new Date(transaction.date).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}