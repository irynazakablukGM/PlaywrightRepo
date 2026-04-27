import { Page, Locator } from "@playwright/test";
import { HeaderFragment } from "./headerFragment.page";

export class HomePage{
  page: Page; 
  header: HeaderFragment;
  productItem: Locator;
  productName: Locator;
  productPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productItem = page.getByText('Combination Pliers');
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
    this.addToFavorites = page.getByTestId('add-to-favorites');
  }

} 