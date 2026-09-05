import { VALID_EXPENSE_TRANSACTION } from './transactionData';

export const generateTransactionPayload = (override = {}) => ({
  ...VALID_EXPENSE_TRANSACTION,
  notes: `AutoTest-${Date.now()}`,
  ...override,
});