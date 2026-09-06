import { Page, Locator, expect } from '@playwright/test';

export class InvestmentsPage {
  readonly page: Page;

  readonly addInvestmentBtn: Locator;
  readonly formDialog: Locator;

  readonly datePickerTrigger: Locator; // 👈 Updated locator name
  readonly symbolInput: Locator;
  readonly exchangeInput: Locator;
  readonly actionDropdown: Locator;
  readonly quantityInput: Locator;
  readonly priceInput: Locator;
  readonly feesInput: Locator;
  readonly linkedAccountDropdown: Locator;
  readonly assetTypeDropdown: Locator;
  readonly notesInput: Locator;

  readonly saveInvestmentBtn: Locator;
  readonly saveChangesBtn: Locator;
  readonly submitButton: Locator;
  readonly confirmDeleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.addInvestmentBtn = page.getByRole('button', { name: 'Add Investment' });
    this.formDialog = page.getByRole('dialog');

    // 👈 Targets the date button component inside the dialog
    this.datePickerTrigger = this.formDialog.locator('button').filter({
      hasText: /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}/i,
    });

    this.symbolInput = this.formDialog.getByPlaceholder('e.g., RELIANCE, HDFCBANK');
    this.exchangeInput = this.formDialog.getByPlaceholder('e.g., NSE, BSE');
    this.actionDropdown = this.formDialog.getByRole('combobox', { name: 'Action' });
    this.quantityInput = this.formDialog.getByRole('spinbutton', { name: 'Quantity' });
    this.priceInput = this.formDialog.getByRole('spinbutton', { name: 'Price' });
    this.feesInput = this.formDialog.getByRole('spinbutton', { name: 'Fees' });
    this.linkedAccountDropdown = this.formDialog.getByRole('combobox', { name: 'Linked Account' });
    this.assetTypeDropdown = this.formDialog.getByRole('combobox', { name: 'Asset Type' });
    this.notesInput = this.formDialog.getByPlaceholder('Optional notes');

    this.saveInvestmentBtn = this.formDialog.getByRole('button', { name: 'Save Investment' });
    this.saveChangesBtn = this.formDialog.getByRole('button', { name: 'Save Changes' });
    this.submitButton = this.saveChangesBtn.or(this.saveInvestmentBtn);

    this.confirmDeleteBtn = this.formDialog.getByRole('button', {
      name: /^(Delete|Confirm|Yes)\b/i,
    });
  }

  // Dynamic Locators
  getTableRowByText(uniqueIdentifier: string): Locator {
    return this.page.getByRole('row').filter({ hasText: uniqueIdentifier }).first();
  }

  getEditButtonForRow(targetRow: Locator): Locator {
    return targetRow
      .getByRole('button', { name: /edit/i })
      .or(targetRow.locator('button:has(svg.lucide-pencil), button:has(svg)').first());
  }

  getDeleteButtonForRow(targetRow: Locator): Locator {
    return targetRow
      .getByRole('button', { name: /delete/i })
      .or(targetRow.locator('button:has(svg.lucide-trash-2), button:has(svg)').nth(1));
  }

  async createInvestment(data: any) {
    await this.addInvestmentBtn.click();
    await expect(this.formDialog).toBeVisible();
    await this.fillFormFields(data);
    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async editInvestment(targetIdentifier: string, updatedData: any) {
    const targetRow = this.getTableRowByText(targetIdentifier);
    await this.getEditButtonForRow(targetRow).click();
    await expect(this.formDialog).toBeVisible();
    await this.fillFormFields(updatedData);
    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async deleteInvestment(targetIdentifier: string) {
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

  private async fillFormFields(data: any) {
    // 👈 Handles Date Selection via Calendar Popover
    if (data.date) {
      await this.datePickerTrigger.click();
      
      // Extracts day number (e.g., gets "5" from "2026-09-05" or "5")
      const day = parseInt(data.date.split('-').pop() || data.date, 10).toString();
      
      // Selects day button in calendar grid
      await this.page.getByRole('button', { name: day, exact: true }).first().click();
    }

    if (data.symbol) await this.symbolInput.fill(data.symbol);
    if (data.exchange) await this.exchangeInput.fill(data.exchange);
    if (data.action) {
      await this.actionDropdown.click();
      await this.page.getByRole('option', { name: data.action, exact: true }).click();
    }
    if (data.quantity) await this.quantityInput.fill(data.quantity);
    if (data.price) await this.priceInput.fill(data.price);
    if (data.fees) await this.feesInput.fill(data.fees);
    if (data.linkedAccount) {
      await this.linkedAccountDropdown.click();
      await this.page.getByRole('option', { name: data.linkedAccount, exact: true }).click();
    }
    if (data.assetType) {
      await this.assetTypeDropdown.click();
      await this.page.getByRole('option', { name: data.assetType, exact: true }).click();
    }
    if (data.notes) await this.notesInput.fill(data.notes);
  }
}
