import { test, expect } from '../fixures/app';

test('Verify user can view product details', { tag: '@smoke' },  async ({ page, app }) => {
  await page.goto('');
  await app.homePage.getProductItem('Combination Pliers').click();
  expect(page.url()).toContain('/product');
  await expect(app.homePage.productName).toContainText('Combination Pliers');
  await expect(app.homePage.productPrice).toContainText('14.15');
  await expect(app.homePage.addToCart).toBeVisible();
  await expect(app.homePage.addToFavorites).toBeVisible();
}
);