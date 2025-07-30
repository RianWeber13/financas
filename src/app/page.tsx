
"use client"

import { CardSummary } from "@/components/card-summary";
import { Category } from "@/components/category";
import { ChartAnalyze } from "@/components/chart-analyze";
import { Header } from "@/components/header";
import { TransactionTable } from "@/components/transacao/transacoes-tabela";
import { TransactionModal } from "@/components/transaction-modal";
import { BankModal } from "@/components/bank-modal";
import { CategoryModal } from "@/components/category-modal";
import { 
  Banknote, BanknoteArrowDown, BanknoteArrowUp, Car, CircleEllipsis, 
  Film, Hamburger, Heart, Pill, ShoppingBasket, DollarSign, TreePalm, Utensils, Wifi, Zap, Fuel 
} from "lucide-react";
import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/api";

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  bank: { name: string };
  category: { id: string, name: string; icon: string; };
  date: string;
}

interface CategorySummary {
  id: string;
  icon: React.ElementType;
  name: string;
  quantity: number;
  amount: number;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getTransactions();
      
      if (!Array.isArray(data)) {
        console.error("Os dados recebidos da API não são um array:", data);
        return; 
      }

      setTransactions(data);

      let totalIncome = 0;
      let totalExpense = 0;
      const categoryMap = new Map<string, { quantity: number, amount: number, name: string, icon: string }>();

      data.forEach(tx => {
        if (tx.type === 'income') {
          totalIncome += tx.amount;
        } else {
          totalExpense += tx.amount;
        }

        const cat = categoryMap.get(tx.category.id) || { quantity: 0, amount: 0, name: tx.category.name, icon: tx.category.icon };
        cat.quantity += 1;
        cat.amount += tx.amount;
        categoryMap.set(tx.category.id, cat);
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome - totalExpense);
      
      const lucideIcons: { [key: string]: React.ElementType } = { 
        ShoppingBasket, Car, Film, DollarSign, Heart, Wifi, Zap, Fuel, Utensils, 
        Hamburger, TreePalm, CircleEllipsis, Pill
      };

      const formattedCategories = Array.from(categoryMap.entries()).map(([id, data]) => ({
        id,
        name: data.name,
        icon: lucideIcons[data.icon] || CircleEllipsis,
        quantity: data.quantity,
        amount: data.amount,
      }));
      setCategories(formattedCategories);

    } catch (error) {
      console.error("Falha ao buscar dados da API", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionCreated = () => {
    fetchData();
  };

  const handleBankCreated = () => {
    // Recarregar dados se necessário
  };

  const handleCategoryCreated = () => {
    // Recarregar dados se necessário
  };

  const cards = [
    { icon: BanknoteArrowUp, title: "Entradas", amount: income, description: "Soma de todas as entradas do período" },
    { icon: BanknoteArrowDown, title: "Saídas", amount: expense, description: "Soma de todas as saídas do período" },
    { icon: Banknote, title: "Balanço", amount: balance, description: "Soma de todas as entradas e saídas do período" }
  ];

  return (
    <main style={{
      display: "flex", 
      flexDirection: "column", 
      gap: "1rem", 
      justifyContent: "start", 
      alignItems: "start", 
      maxWidth: "1000px", 
      width: "100%", 
      margin: "0 auto", 
      padding: "1rem", 
      backgroundColor: "var(--bg-color)",
      minHeight: "100vh"
    }}>
      <Header 
        onOpenTransactionModal={() => setIsTransactionModalOpen(true)}
        onOpenBankModal={() => setIsBankModalOpen(true)}
        onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
      />
      
      <section style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "100%" }}>
        {cards.map((card) => (
          <CardSummary key={card.title} card={card}/>
        ))}
      </section>

      <section style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "100%" }}>
        <ChartAnalyze/>
        <Category categories={categories}/>
      </section>

      <section style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "100%" }}>
        <TransactionTable transactions={transactions} />
      </section>

      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onTransactionCreated={handleTransactionCreated}
      />

      <BankModal 
        isOpen={isBankModalOpen}
        onClose={() => setIsBankModalOpen(false)}
        onBankCreated={handleBankCreated}
      />

      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </main>
  );
}