import * as lucide from "lucide-react";
import transactions from "../../assets/transactions.json" with { type: "json" };
import React, { useEffect } from "react";

type Transaction = typeof transactions[0];

export function TransactionTable() {

  useEffect(() => {
    import("lucide-react").then((mod) => console.log(mod));
  })

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
            {transactions.map((transaction: Transaction) => (
              (
                <tr key={transaction.id} style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  padding: "0.5rem",
                }}>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {transaction.category.icon in lucide
                      ? React.createElement(lucide[transaction.category.icon as keyof typeof lucide] as React.ElementType)
                      : null}

                  </td>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {transaction.description}
                  </td>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {transaction.type === "income" ? "Entrada" : "Saída"}
                  </td>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {transaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {transaction.bank}
                  </td>
                  <td style={{
                    textAlign: "start",
                    fontWeight: "normal",
                    padding: "0.5rem",

                  }}>
                    {new Date(transaction.date).toLocaleString("pt-BR")}
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