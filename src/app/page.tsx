"use client"

import { CardSummary } from "@/components/card-summary";
import { Category } from "@/components/category";
import { ChartAnalyze } from "@/components/chart-analyze";
import { Header } from "@/components/header";
import { TransactionTable } from "@/components/transacao/transacoes-tabela";
import { Banknote, BanknoteArrowDown, BanknoteArrowUp, Car, CircleEllipsis, Hamburger, Pill, TreePalm } from "lucide-react";


// RODAR O COMANDO NO TERMINAL: Remove-Item -Recurse -Force .next 
// SEM ESSE COMANDO O NPM RUN DEV FICA STARTING... 


const categories = [
  {
    id: "1",
    icon: Hamburger,
    name: "Alimentação",
    quantity: 3,
    amount: 906,
  },
  {
    id: "2",
    icon: TreePalm,
    name: "Lazer",
    quantity: 2,
    amount: 510,
  },
  {
    id: "3",
    icon: Car,
    name: "Transporte",
    quantity: 1,
    amount: 200,
  },
  {
    id: "4",
    icon: CircleEllipsis,
    name: "Educação",
    quantity: 2,
    amount: 92,
  },    
  {
    id: "5",
    icon: Pill,
    name: "Saúde",
    quantity: 1,
    amount: 50,
  },
  
  
]


const cards = [
  {
    icon: BanknoteArrowDown,
    title: "Entradas",
    amount: 3200,
    description: "Soma de todas as entradas do período",
  },
  {
    icon: BanknoteArrowUp,
    title: "Saídas",
    amount: 1758,
    description: "Soma de todas as saídas do período",
  },
  {
    icon: Banknote,
    title: "Balanço",
    amount: 1442,
    description: "Soma de todas as entradas e saídas do período",
  }
]

export default function Home() {


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
    backgroundColor: "#000000"
      }}>
    <Header/>
    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      {cards.map((card) => (
        <CardSummary key={card.title} card={card}/>
      ))}
    </section>

    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      <ChartAnalyze/>
      <Category categories={categories}/>
    </section>

    <section style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      width: "100%",
    }}>
      <TransactionTable />
    </section>
   </main>
  );
}