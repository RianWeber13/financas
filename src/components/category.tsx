import { type LucideIcon } from "lucide-react";

interface CategoryProps {
  categories: {
    id: string;
    icon: LucideIcon;
    name: string;
    quantity: number;
    amount: number;
  }[]
}
export function Category(props: CategoryProps) {
  const { categories } = props
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
        {categories.map((cat) => (
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
              backgroundColor: "#f0f0f0",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {cat.icon && < cat.icon/>}
              <span>{cat.name}</span>
            </div>
            <span>{cat.quantity}</span>
            <span>{cat.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}