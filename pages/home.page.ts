import { Page, Locator } from "@playwright/test";
import { HeaderFragment } from "./headerFragment.page";

export class HomePage{
  page: Page; 
  header: HeaderFragment;
  productName: Locator;
  productPrice: Locator;
  addToCart: Locator;
  addToFavorites: Locator;
  alertMessage: Locator;
  sortOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
    this.addToFavorites = page.getByTestId('add-to-favorites');
    this.alertMessage = page.getByRole('alert');
    this.sortOptions = page.getByTestId('sort');
  }

  getProductItem(name: string): Locator {
    return this.page.getByText(name);
  }

  getFirstProduct() {
    return this.page.getByTestId('product-name').first();
  }

  async getAllProductItems() {
    return await this.page.getByTestId('product-name').allTextContents();
  }

  async getAllProductPrices() {
     const prices = await this.page.getByTestId('product-price').allTextContents();

    return prices.map(p =>
      parseFloat(p.replace(/[^0-9.]/g, ''))
    );
  }

 async chooseFilter(category: string) {
  await this.page.getByLabel(category).check();
}
} 