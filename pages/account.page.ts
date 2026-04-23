import { Page, Locator } from "@playwright/test";

export class AccountPage{
  page: Page; 
  pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
  }

} 