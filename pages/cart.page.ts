import { Page, Locator } from "@playwright/test";

export class CartPage{
  page: Page; 
  cartProductTitle: Locator;
  proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProductTitle = page.getByTestId('product-title');
    this.proceedButton = page.getByTestId('proceed-1');
  }

} 