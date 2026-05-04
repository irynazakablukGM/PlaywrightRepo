import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

[
  { label: 'Price ASC', option: 'Price (Low - High)', direction: 'asc'},
  { label: 'Price DESC', option: 'Price (High - Low)', direction: 'desc' },
].forEach(({ label, option, direction }) => {
  test(`Sort product by ${label}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('');
    await homePage.sortOptions.selectOption(option);

    const productPrices = await homePage.getAllProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) =>
      direction === 'asc' ? a - b : b - a
    );
    expect(productPrices).toEqual(sortedPrices);
  });
});
