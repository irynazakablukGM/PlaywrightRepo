import { Page, Locator } from "@playwright/test";

export class HeaderFragment{
  page: Page; 
  navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByTestId('nav-menu');
  }

} 