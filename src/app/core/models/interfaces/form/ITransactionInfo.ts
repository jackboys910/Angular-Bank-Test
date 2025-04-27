export interface ITransactionInfo {
  transactionType: 'transfer' | 'payment' | 'replenishment';
  amount: number;
  currency: 'RUB' | 'USD' | 'EUR';
  comment?: string;
}
