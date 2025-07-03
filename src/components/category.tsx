import React from 'react';

// 1. A interface agora aceita um 'React.ElementType' para o ícone.
// Este é o tipo correto que está sendo passado a partir do page.tsx.
interface CategoryProps {
  categories: {
    id: string;
    icon: React.ElementType; // Correção principal aqui
    name: string;
    quantity: number;
    amount: number;
  }[]
}

export function Category(props: CategoryProps) {
  const { categories } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "350px",
        width: "100%",
        height: "100%",
      }}
    >
      <h3 style={{color: "white"}}>Categorias</h3>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
        height: "100%",
      }}>
        {/* 2. Adicionamos a verificação de segurança, igual fizemos na tabela */}
        {Array.isArray(categories) && categories.map((cat) => {
          // 3. Renomeamos 'cat.icon' para 'IconComponent' para usá-lo como um componente JSX.
          const IconComponent = cat.icon;
          return (
            <div
              key={cat.id}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#fff", // Fundo branco para melhor contraste
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {/* 4. Renderizamos o ícone de forma segura */}
                {IconComponent && <IconComponent size={20} />}
                <span>{cat.name}</span>
              </div>
              <div style={{display: 'flex', gap: '1rem', color: '#666'}}>
                <span>{cat.quantity}x</span>
                <span style={{fontWeight: 'bold'}}>
                  {cat.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}