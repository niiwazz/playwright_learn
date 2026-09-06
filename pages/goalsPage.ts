import { Page, Locator, expect } from '@playwright/test';

export class GoalsPage {
  readonly page: Page;

  // Outer Page Controls
  readonly addGoalBtn: Locator;

  // Dialog Container
  readonly formDialog: Locator;

  // Form Controls (Scoped to Dialog)
  readonly goalNameInput: Locator;
  readonly categoryInput: Locator;
  readonly targetAmountInput: Locator;
  readonly todaysCostInput: Locator;
  readonly savedAmountInput: Locator;
  readonly targetDatePickerTrigger: Locator;
  readonly priorityDropdown: Locator;

  // Action Buttons
  readonly cancelButton: Locator;
  readonly saveGoalBtn: Locator;
  readonly saveChangesBtn: Locator;
  readonly submitButton: Locator;
  readonly confirmDeleteBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Trigger & Dialog Scoping
    this.addGoalBtn = page.getByRole('button', { name: 'Add Goal' });
    this.formDialog = page.getByRole('dialog');

    // Inputs inside Dialog
    this.goalNameInput = this.formDialog.getByPlaceholder('e.g., Emergency Fund, Vacation');
    this.categoryInput = this.formDialog.getByPlaceholder('e.g., Savings, Investment, Lifestyle');
    
    this.targetAmountInput = this.formDialog.getByRole('spinbutton', { name: 'Target Amount' });
    
    // Fixed: Matches the actual placeholder/accessible name in the snapshot
    this.todaysCostInput = this.formDialog.getByPlaceholder('What this costs today, before inflation');
    
    this.savedAmountInput = this.formDialog.getByRole('spinbutton', { name: 'Saved Amount' });

    // Target date button trigger
    this.targetDatePickerTrigger = this.formDialog.locator('button').filter({
      hasText: /pick a date|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}/i,
    });

    this.priorityDropdown = this.formDialog.getByRole('combobox', { name: 'Priority' });

    // Buttons
    this.cancelButton = this.formDialog.getByRole('button', { name: 'Cancel' });
    this.saveGoalBtn = this.formDialog.getByRole('button', { name: 'Save Goal' });
    this.saveChangesBtn = this.formDialog.getByRole('button', { name: 'Save Changes' });
    this.submitButton = this.saveChangesBtn.or(this.saveGoalBtn);

    this.confirmDeleteBtn = this.formDialog.getByRole('button', {
      name: /^(Delete|Confirm|Yes)\b/i,
    });
  }

  // --- Dynamic Locators ---

  getGoalItemByText(uniqueIdentifier: string): Locator {
    return this.page
      .locator('tr, [data-slot="card"], .border, [role="region"]')
      .filter({ hasText: uniqueIdentifier })
      .first();
  }

  getEditButtonForGoal(targetContainer: Locator): Locator {
    return targetContainer.getByRole('button', { name: /edit/i }).first();
  }

  getDeleteButtonForGoal(targetContainer: Locator): Locator {
    return targetContainer.getByRole('button', { name: /delete/i }).first();
  }

  // --- Actions ---

  async createGoal(data: {
    goalName: string;
    category?: string;
    targetAmount?: string;
    todaysCost?: string;
    savedAmount?: string;
    targetDate?: string;
    priority?: string;
  }) {
    await this.addGoalBtn.click();
    await expect(this.formDialog).toBeVisible();

    await this.fillFormFields(data);

    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async editGoal(
    targetIdentifier: string,
    updatedData: {
      goalName?: string;
      category?: string;
      targetAmount?: string;
      savedAmount?: string;
      priority?: string;
    }
  ) {
    const targetItem = this.getGoalItemByText(targetIdentifier);
    await this.getEditButtonForGoal(targetItem).click();
    await expect(this.formDialog).toBeVisible();

    await this.fillFormFields(updatedData);

    await this.submitButton.click();
    await expect(this.formDialog).toBeHidden();
  }

  async deleteGoal(targetIdentifier: string) {
    const targetItem = this.getGoalItemByText(targetIdentifier);
    await this.getDeleteButtonForGoal(targetItem).click();

    const needsConfirmation = await this.confirmDeleteBtn
      .waitFor({ state: 'visible', timeout: 2000 })
      .then(() => true)
      .catch(() => false);

    if (needsConfirmation) {
      await this.confirmDeleteBtn.click();
      await expect(this.formDialog).toBeHidden();
    }
  }

  private async fillFormFields(data: {
    goalName?: string;
    category?: string;
    targetAmount?: string;
    todaysCost?: string;
    savedAmount?: string;
    targetDate?: string;
    priority?: string;
  }) {
    if (data.goalName) await this.goalNameInput.fill(data.goalName);
    if (data.category) await this.categoryInput.fill(data.category);
    if (data.targetAmount) await this.targetAmountInput.fill(data.targetAmount);
    if (data.todaysCost) await this.todaysCostInput.fill(data.todaysCost);
    if (data.savedAmount) await this.savedAmountInput.fill(data.savedAmount);

    // Click trigger and select day from calendar popover
    if (data.targetDate) {
      await this.targetDatePickerTrigger.click();

      // Extracts day number (e.g., '31' from '2028-12-31')
      const day = parseInt(data.targetDate.split('-').pop() || data.targetDate, 10).toString();

      await this.page.getByRole('button', { name: day, exact: true }).first().click();
    }

    if (data.priority) {
      await this.priorityDropdown.click();
      await this.page.getByRole('option', { name: data.priority, exact: true }).click();
    }
  }
}