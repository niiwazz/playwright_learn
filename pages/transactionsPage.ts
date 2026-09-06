import { Page, Locator, expect } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;

  // Trigger Button
  readonly addTransactionBtn: Locator;

  // Table Controls
  readonly searchInput: Locator;
  readonly transactionsTable: Locator;

  // Dialog Container
  readonly formDialog: Locator;

  // Form Controls (Scoped to Dialog)
  readonly typeDropdown: Locator;
  readonly datePickerTrigger: Locator; // 👈 Updated locator type name
  readonly amountInput: Locator;
  readonly categoryDropdown: Locator;
  readonly accountDropdown: Locator;
  readonly subCategoryInput: Locator;
  readonly notesInput: Locator;

  // Action Buttons
  readonly cancelButton: Locator;
  readonly saveTransactionBtn: Locator;
  readonly saveChangesBtn: Locator;
  readonly submitButton: Locator;
  readonly confirmDeleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Trigger Button
    this.addTransactionBtn = page.getByRole('button', { name: 'Add Transaction' });

    // Table Controls
    this.searchInput = page.getByPlaceholder('Search category, account, notes');
    this.transactionsTable = page.getByRole('table');

    // Dialog Scoping
    this.formDialog = page.getByRole('dialog');

    // Form Controls
    this.typeDropdown = this.formDialog.getByRole('combobox', { name: 'Type' });
    
    // 👈 Targets the date trigger button inside the dialog
    this.datePickerTrigger = this.formDialog.locator('button').filter({
      hasText: /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}/i,
    });

    this.amountInput = this.formDialog.getByRole('spinbutton', { name: 'Amount' });
    this.categoryDropdown = this.formDialog.getByRole('combobox', { name: 'Category' });
    this.accountDropdown = this.formDialog.getByRole('combobox', { name: 'From Account' });
    this.subCategoryInput = this.formDialog.getByRole('textbox', { name: 'Sub Category' });
    this.notesInput = this.formDialog.getByRole('textbox', { name: 'Notes' });

    // Action Buttons
    this.cancelButton = this.formDialog.getByRole('button', { name: 'Cancel' });
    this.saveTransactionBtn = this.formDialog.getByRole('button', { name: 'Save Transaction' });
    this.saveChangesBtn = this.formDialog.getByRole('button', { name: 'Save Changes' });

    this.submitButton = this.saveChangesBtn.or(this.saveTransactionBtn);

    this.confirmDeleteBtn = this.formDialog.getByRole('button', {
      name: /^(Delete|Confirm|Yes)\b/i,
    });
  }

  // --- Dynamic Locators ---

  getTableRowByText(uniqueIdentifier: string): Locator {
    return this.page.getByRole('row').filter({ hasText: uniqueIdentifier }).first();
  }

  getEditButtonForRow(targetRow: Locator): Locator {
    return targetRow.getByRole('button', { name: 'Edit transaction' });
  }

  getDeleteButtonForRow(targetRow: Locator): Locator {
    return targetRow.getByRole('button', { name: 'Delete transaction' });
  }

  // --- Actions ---

  async createTransaction(data: {
    type?: string;
    date?: string;
    amount: string;
    category?: string;
    fromAccount?: string;
    subCategory?: string;
    notes?: string;
  }) {
    await this.addTransactionBtn.click();
    await expect(this.formDialog).toBeVisible();

    await this.fillFormFields(data);

    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async editTransaction(
    targetIdentifier: string,
    updatedData: {
      type?: string;
      date?: string;
      amount?: string;
      category?: string;
      fromAccount?: string;
      subCategory?: string;
      notes?: string;
    }
  ) {
    const targetRow = this.getTableRowByText(targetIdentifier);
    await this.getEditButtonForRow(targetRow).click();
    await expect(this.formDialog).toBeVisible();

    await this.fillFormFields(updatedData);

    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async deleteTransaction(targetIdentifier: string) {
    const targetRow = this.getTableRowByText(targetIdentifier);
    await this.getDeleteButtonForRow(targetRow).click();

    const needsConfirmation = await this.confirmDeleteBtn
      .waitFor({ state: 'visible', timeout: 2000 })
      .then(() => true)
      .catch(() => false);

    if (needsConfirmation) {
      await this.confirmDeleteBtn.click();
      await expect(this.formDialog).toBeHidden();
    }
  }

  // Private helper to populate fields safely
  private async fillFormFields(data: {
    type?: string;
    date?: string;
    amount?: string;
    category?: string;
    fromAccount?: string;
    subCategory?: string;
    notes?: string;
  }) {
    if (data.type) {
      await this.typeDropdown.click();
      await this.page.getByRole('option', { name: data.type }).click();
    }

    // 👈 Handles Date Selection via Calendar Popover
    if (data.date) {
      await this.datePickerTrigger.click();
      
      // Extract day number (e.g., extracts "5" from "2026-09-05" or "5")
      const day = parseInt(data.date.split('-').pop() || data.date, 10).toString();
      
      // Select day button in calendar grid
      await this.page.getByRole('button', { name: day, exact: true }).first().click();
    }

    if (data.amount) {
      await this.amountInput.fill(data.amount);
    }
    if (data.category) {
      await this.categoryDropdown.click();
      await this.page.getByRole('option', { name: data.category, exact: true }).click();
    }
    if (data.fromAccount) {
      await this.accountDropdown.click();
      await this.page.getByRole('option', { name: data.fromAccount, exact: true }).click();
    }
    if (data.subCategory) {
      await this.subCategoryInput.fill(data.subCategory);
    }
    if (data.notes) {
      await this.notesInput.fill(data.notes);
    }
  }
}