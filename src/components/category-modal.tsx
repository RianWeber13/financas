"use client"

import { useState } from 'react';
import { X, Tag, ShoppingBasket, Car, Film, DollarSign, Heart, Wifi, Zap, Fuel, Utensils, Hamburger, TreePalm, CircleEllipsis, Pill } from 'lucide-react';
import { createCategory } from '@/lib/api';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: () => void;
}

const iconOptions = [
  { name: 'ShoppingBasket', icon: ShoppingBasket, label: 'Compras' },
  { name: 'Car', icon: Car, label: 'Transporte' },
  { name: 'Film', icon: Film, label: 'Entretenimento' },
  { name: 'DollarSign', icon: DollarSign, label: 'Dinheiro' },
  { name: 'Heart', icon: Heart, label: 'Saúde' },
  { name: 'Wifi', icon: Wifi, label: 'Internet' },
  { name: 'Zap', icon: Zap, label: 'Energia' },
  { name: 'Fuel', icon: Fuel, label: 'Combustível' },
  { name: 'Utensils', icon: Utensils, label: 'Cozinha' },
  { name: 'Hamburger', icon: Hamburger, label: 'Comida' },
  { name: 'TreePalm', icon: TreePalm, label: 'Viagem' },
  { name: 'Pill', icon: Pill, label: 'Medicamento' },
  { name: 'CircleEllipsis', icon: CircleEllipsis, label: 'Outros' },
];

export function CategoryModal({ isOpen, onClose, onCategoryCreated }: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim() || !selectedIcon) {
      alert('Por favor, insira o nome da categoria e selecione um ícone');
      return;
    }

    setLoading(true);
    try {
      await createCategory(categoryName.trim(), selectedIcon);
      onCategoryCreated();
      onClose();
      setCategoryName('');
      setSelectedIcon('');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      alert('Erro ao criar categoria');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--bg-color)',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--text-color)'
          }}>
            Nova Categoria
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-color)',
              padding: '8px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Tag size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Nome da categoria"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--input-bg)',
                color: 'var(--text-color)',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--text-color)',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Selecione um ícone:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '12px',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {iconOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedIcon(option.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '12px 8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: selectedIcon === option.name ? 'var(--primary-color)' : 'transparent',
                    color: selectedIcon === option.name ? 'white' : 'var(--text-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <option.icon size={24} />
                  <span style={{ fontSize: '12px', textAlign: 'center' }}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary-color)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Criando...' : 'Criar Categoria'}
          </button>
        </form>
      </div>
    </div>
  );
} 