import { VALID_EXPENSE_TRANSACTION } from './transactionData';
import { DEFAULT_INVESTMENT_DATA } from './investmentData';
import { DEFAULT_GOAL_DATA } from './goalsData';

export const generateTransactionPayload = (override = {}) => ({
  ...VALID_EXPENSE_TRANSACTION,
  notes: `AutoTest-${Date.now()}`,
  ...override,
});
export const generateInvestmentPayload = (override = {}) => ({
  ...DEFAULT_INVESTMENT_DATA,
  notes: `INV-TEST-${Date.now()}`,
  ...override,
});

export const generateGoalPayload = (override = {}) => ({
  ...DEFAULT_GOAL_DATA,
  notes: `GOAL-TEST-${Date.now()}`,
  ...override,
});

