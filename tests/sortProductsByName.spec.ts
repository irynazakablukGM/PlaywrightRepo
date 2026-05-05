import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

[
  { label: 'Name ASC (A - Z)', option: 'Name (A - Z)', direction: 'asc'},
  { label: 'Name DESC (Z - A)', option: 'Name (Z - A)', direction: 'desc' },
].forEach(({ label, option, direction }) => {
  test(`Sort product by ${label}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('');
    await homePage.sortOptions.selectOption(option);

    const productItems = await homePage.getAllProductItems();
    const sortedProducts = [...productItems].sort((a, b) => 
         direction === 'asc'
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );
    expect(productItems).toEqual(sortedProducts);
  });
});
