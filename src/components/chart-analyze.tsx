"use client"

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { getTransactions } from '@/lib/api';

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  bank: { name: string };
  category: { id: string, name: string; icon: string; };
  date: string;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe',
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa',
  '#93c5fd', '#dbeafe', '#bfdbfe', '#dbeafe'
];

export function ChartAnalyze() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  const processData = () => {
    const categoryMap = new Map<string, number>();
    const monthlyData = new Map<string, { income: number; expense: number }>();

    transactions.forEach(tx => {
      if (tx.type === 'expense') {
        // Agrupar por categoria
        const current = categoryMap.get(tx.category.name) || 0;
        categoryMap.set(tx.category.name, current + tx.amount);

        // Agrupar por mês
        const date = new Date(tx.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthData = monthlyData.get(monthKey) || { income: 0, expense: 0 };
        monthData.expense += tx.amount;
        monthlyData.set(monthKey, monthData);
      } else {
        // Para entradas, apenas agrupar por mês
        const date = new Date(tx.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthData = monthlyData.get(monthKey) || { income: 0, expense: 0 };
        monthData.income += tx.amount;
        monthlyData.set(monthKey, monthData);
      }
    });

    return { categoryData: categoryMap, monthlyData };
  };

  const { categoryData, monthlyData } = processData();

  const pieData: ChartData[] = Array.from(categoryData.entries()).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));

  const barData = Array.from(monthlyData.entries()).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
    balance: data.income - data.expense
  }));

  const lineData = Array.from(monthlyData.entries()).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense
  }));

  if (loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        backgroundColor: "var(--card-bg)",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid var(--border-color)"
      }}>
        <h3 style={{ color: "var(--text-color)", margin: 0 }}>Análise de Gastos</h3>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          color: "var(--text-muted)"
        }}>
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
      backgroundColor: "var(--card-bg)",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid var(--border-color)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <h3 style={{ color: "var(--text-color)", margin: 0 }}>Análise de Gastos</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setChartType('bar')}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              background: chartType === 'bar' ? "var(--primary-color)" : "transparent",
              color: chartType === 'bar' ? "white" : "var(--text-color)",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            Barras
          </button>
          <button
            onClick={() => setChartType('pie')}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              background: chartType === 'pie' ? "var(--primary-color)" : "transparent",
              color: chartType === 'pie' ? "white" : "var(--text-color)",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            Pizza
          </button>
          <button
            onClick={() => setChartType('line')}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border-color)",
              background: chartType === 'line' ? "var(--primary-color)" : "transparent",
              color: chartType === 'line' ? "white" : "var(--text-color)",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            Linha
          </button>
        </div>
      </div>

      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' && (
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--text-color)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-color)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-color)"
                }}
              />
              <Bar dataKey="income" fill="#22c55e" name="Entradas" />
              <Bar dataKey="expense" fill="#ef4444" name="Saídas" />
            </BarChart>
          )}

          {chartType === 'pie' && (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-color)"
                }}
              />
            </PieChart>
          )}

          {chartType === 'line' && (
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--text-color)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-color)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-color)"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Entradas"
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Saídas"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {pieData.length === 0 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "var(--text-muted)",
          fontSize: "14px"
        }}>
          Nenhum dado disponível para exibir no gráfico
        </div>
      )}
    </div>
  );
}