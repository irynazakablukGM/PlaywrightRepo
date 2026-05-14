import { test, expect } from '../fixures/app';

[
  { label: 'Name ASC (A - Z)', option: 'Name (A - Z)', direction: 'asc'},
  { label: 'Name DESC (Z - A)', option: 'Name (Z - A)', direction: 'desc' },
].forEach(({ label, option, direction }) => {
  test(`Sort product by ${label}`, async ({ page, app }) => {
    await page.goto('');
    await app.homePage.sortOptions.selectOption(option);

    const productItems = await app.homePage.getAllProductItems();
    const sortedProducts = [...productItems].sort((a, b) => 
         direction === 'asc'
        ? a.localeCompare(b)
        : b.localeCompare(a)
    );
    expect(productItems).toEqual(sortedProducts);
  });
});
