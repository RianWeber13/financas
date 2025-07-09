import React from 'react';


interface CategoryProps {
  categories: {
    id: string;
    icon: React.ElementType; 
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
        {}
        {Array.isArray(categories) && categories.map((cat) => {
          
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
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {}
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