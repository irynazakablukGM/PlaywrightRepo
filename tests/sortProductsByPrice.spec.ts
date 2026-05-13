import { test, expect } from '../fixures/app';

[
  { label: 'Price ASC', option: 'Price (Low - High)', direction: 'asc'},
  { label: 'Price DESC', option: 'Price (High - Low)', direction: 'desc' },
].forEach(({ label, option, direction }) => {
  test(`Sort product by ${label}`, async ({ page, app }) => {
    await page.goto('');
    await app.homePage.sortOptions.selectOption(option);

    const productPrices = await app.homePage.getAllProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) =>
      direction === 'asc' ? a - b : b - a
    );
    expect(productPrices).toEqual(sortedPrices);
  });
});
