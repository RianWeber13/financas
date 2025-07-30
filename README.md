# Sistema de Controle Financeiro

Uma aplicação completa para controle de finanças pessoais com interface moderna e funcionalidades avançadas.

## 🚀 Funcionalidades

### ✅ Implementadas

- **Dashboard Financeiro**: Visualização de entradas, saídas e balanço
- **Gerenciamento de Transações**: Adicionar, visualizar e gerenciar transações
- **Gerenciamento de Bancos**: Criar e gerenciar contas bancárias
- **Gerenciamento de Categorias**: Criar categorias personalizadas com ícones
- **Análise por Categorias**: Visualização de gastos por categoria
- **Gráficos Analíticos**: Análise visual dos dados financeiros
- **Tema Claro/Escuro**: Alternância entre modos de visualização
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

### 🎨 Interface

- **Design Moderno**: Interface limpa e intuitiva
- **Tema Dinâmico**: Suporte a tema claro e escuro
- **Componentes Reutilizáveis**: Arquitetura modular
- **UX Otimizada**: Experiência do usuário aprimorada

### 🔧 Tecnologias

**Frontend:**
- Next.js 14
- TypeScript
- Lucide React (ícones)
- CSS Variables (tema)

**Backend:**
- Node.js
- Fastify
- Prisma ORM
- SQLite

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd financas
```

2. **Instale as dependências do frontend**
```bash
npm install
```

3. **Instale as dependências da API**
```bash
cd api
npm install
```

4. **Configure o banco de dados**
```bash
cd api
npx prisma migrate dev
```

### Executando a aplicação

1. **Inicie a API (em um terminal)**
```bash
cd api
npm run dev
```

2. **Inicie o frontend (em outro terminal)**
```bash
npm run dev
```

3. **Acesse a aplicação**
```
http://localhost:3000
```

## 📱 Como Usar

### 1. Gerenciamento de Bancos
- Clique no menu (ícone de hambúrguer) no canto superior direito
- Selecione "Novo Banco"
- Digite o nome do banco e clique em "Criar Banco"

### 2. Gerenciamento de Categorias
- No menu, selecione "Nova Categoria"
- Digite o nome da categoria
- Escolha um ícone representativo
- Clique em "Criar Categoria"

### 3. Adicionar Transações
- No menu, selecione "Nova Transação"
- Preencha os campos:
  - Tipo (Entrada/Saída)
  - Valor
  - Descrição
  - Banco (selecione um banco criado)
  - Categoria (selecione uma categoria criada)
  - Data
- Clique em "Criar Transação"

### 4. Alternar Tema
- Clique no ícone de sol/lua no canto superior direito
- O tema será alternado entre claro e escuro

## 🎯 Funcionalidades Principais

### Dashboard
- **Cards de Resumo**: Entradas, saídas e balanço total
- **Gráficos**: Análise visual dos dados
- **Categorias**: Resumo por categoria de gastos

### Transações
- **Lista Completa**: Todas as transações em tabela
- **Filtros**: Por tipo, data, categoria
- **Detalhes**: Informações completas de cada transação

### Configurações
- **Tema**: Alternância entre claro/escuro
- **Persistência**: Preferências salvas no localStorage

## 🔄 API Endpoints

### Transações
- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Deletar transação

### Bancos
- `GET /api/banks` - Listar bancos
- `POST /api/banks` - Criar banco
- `PUT /api/banks/:id` - Atualizar banco
- `DELETE /api/banks/:id` - Deletar banco

### Categorias
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

## 🎨 Design System

### Cores
- **Primária**: Verde (#22c55e)
- **Texto**: Preto/Branco (dependendo do tema)
- **Fundo**: Branco/Escuro (dependendo do tema)
- **Bordas**: Cinza claro/escuro

### Componentes
- **Cards**: Resumo financeiro
- **Modais**: Formulários de criação
- **Tabelas**: Listagem de dados
- **Gráficos**: Visualização de dados

## 🚀 Próximas Funcionalidades

- [ ] Exportação de relatórios
- [ ] Metas financeiras
- [ ] Lembretes de pagamentos
- [ ] Sincronização com bancos
- [ ] Múltiplas moedas
- [ ] Backup automático

## 📝 Licença

Este projeto está sob a licença MIT.
