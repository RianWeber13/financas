"use client"

import { useState } from "react"
import { CirclePlus, Sun, Moon, Building, Tag, Menu, X } from "lucide-react"
import Image from "next/image"
import LogoImage from "../assets/logo.svg"
import { useTheme } from "@/contexts/ThemeContext"

interface HeaderProps {
  onOpenTransactionModal: () => void;
  onOpenBankModal: () => void;
  onOpenCategoryModal: () => void;
}

export function Header({ onOpenTransactionModal, onOpenBankModal, onOpenCategoryModal }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      position: "relative"
    }}>
      <Image 
        src={LogoImage}
        width={40}
        height={40}
        alt="Picture of a piggy bank"
      />
      
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-color)",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-color)",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          backgroundColor: "var(--bg-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "8px",
          marginTop: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 100,
          minWidth: "200px"
        }}>
          <button
            onClick={() => {
              onOpenTransactionModal();
              setIsMenuOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          >
            <CirclePlus size={20} />
            Nova Transação
          </button>
          
          <button
            onClick={() => {
              onOpenBankModal();
              setIsMenuOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          >
            <Building size={20} />
            Novo Banco
          </button>
          
          <button
            onClick={() => {
              onOpenCategoryModal();
              setIsMenuOpen(false);
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-color)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderRadius: "8px",
              fontSize: "14px"
            }}
          >
            <Tag size={20} />
            Nova Categoria
          </button>
        </div>
      )}
    </header>
  )
}