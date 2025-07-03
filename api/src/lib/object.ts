import { randomUUID } from "node:crypto";

type TransactionType = 'income' | 'expense';

export class Entity {
  id: string;

  constructor() {
    this.id = randomUUID();
  }
}

export class Category extends Entity {
  name: string;
  icon: string;

  constructor(props: { name: string; icon: string }, id?: string) {
    super();
    this.name = props.name;
    this.icon = props.icon;
    if (id) {
      this.id = id;
    }
  }
}

export class Bank extends Entity {
  name: string;

  constructor(props: { name: string }, id?: string) {
    super();
    this.name = props.name;
    if (id) {
      this.id = id;
    }
  }
}

export class Transaction extends Entity {
  description: string;
  amount: number;
  date: Date;
  type: TransactionType;
  bankId: string;
  categoryId: string;

  constructor(
    props: {
      description: string;
      amount: number;
      date: Date;
      type: TransactionType;
      bankId: string;
      categoryId: string;
    },
    id?: string,
  ) {
    super();
    this.description = props.description;
    this.amount = props.amount;
    this.date = props.date;
    this.type = props.type;
    this.bankId = props.bankId;
    this.categoryId = props.categoryId;
    if (id) {
      this.id = id;
    }
  }
}