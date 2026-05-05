import { Page, Locator } from "@playwright/test";

export class HeaderFragment{
  page: Page; 
  navMenu: Locator;
  cartIcon: Locator;
  cartItemsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByTestId('nav-menu');
    this.cartIcon = page.getByTestId('nav-cart');
    this.cartItemsCount = page.getByTestId('cart-quantity');
  }

  async getCartItemsCount() {
    const text = await this.cartItemsCount.textContent();
    return Number(text);
  }
} 