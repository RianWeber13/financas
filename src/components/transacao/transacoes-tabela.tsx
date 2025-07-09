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


interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  bank: { name: string };
  category: {
    icon: string; 
    name: string;
  };
  date: string;
}


interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {

  
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    
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
            {}
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