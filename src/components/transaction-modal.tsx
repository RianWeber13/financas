"use client"

import { useState, useEffect } from 'react';
import { X, Plus, DollarSign, Calendar, FileText, Building, Tag } from 'lucide-react';
import { getBanks, getCategories, createTransaction } from '@/lib/api';

interface Bank {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransactionCreated: () => void;
}

export function TransactionModal({ isOpen, onClose, onTransactionCreated }: TransactionModalProps) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    bankId: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isOpen) {
      loadBanksAndCategories();
    }
  }, [isOpen]);

  const loadBanksAndCategories = async () => {
    try {
      const [banksData, categoriesData] = await Promise.all([
        getBanks(),
        getCategories()
      ]);
      setBanks(banksData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar bancos e categorias:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.bankId || !formData.categoryId) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      await createTransaction({
        description: formData.description,
        amount: parseFloat(formData.amount),
        type: formData.type,
        bankId: formData.bankId,
        categoryId: formData.categoryId,
        date: formData.date
      });
      
      onTransactionCreated();
      onClose();
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        bankId: '',
        categoryId: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      alert('Erro ao criar transação');
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
            Nova Transação
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
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: formData.type === 'income' ? 'var(--primary-color)' : 'transparent',
                color: formData.type === 'income' ? 'white' : 'var(--text-color)',
                cursor: 'pointer'
              }}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: formData.type === 'expense' ? 'var(--primary-color)' : 'transparent',
                color: formData.type === 'expense' ? 'white' : 'var(--text-color)',
                cursor: 'pointer'
              }}
            >
              Saída
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <DollarSign size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="number"
              placeholder="Valor"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
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

          <div style={{ position: 'relative' }}>
            <FileText size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Descrição"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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

          <div style={{ position: 'relative' }}>
            <Building size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              value={formData.bankId}
              onChange={(e) => setFormData(prev => ({ ...prev, bankId: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--input-bg)',
                color: 'var(--text-color)',
                fontSize: '16px'
              }}
            >
              <option value="">Selecione um banco</option>
              {banks.map(bank => (
                <option key={bank.id} value={bank.id}>{bank.name}</option>
              ))}
            </select>
          </div>

          <div style={{ position: 'relative' }}>
            <Tag size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--input-bg)',
                color: 'var(--text-color)',
                fontSize: '16px'
              }}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div style={{ position: 'relative' }}>
            <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
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
            {loading ? 'Criando...' : 'Criar Transação'}
          </button>
        </form>
      </div>
    </div>
  );
} 