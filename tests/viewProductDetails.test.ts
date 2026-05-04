import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('');
  await homePage.getProductItem('Combination Pliers').click();
  expect(page.url()).toContain('/product');
  await expect(homePage.productName).toContainText('Combination Pliers');
  await expect(homePage.productPrice).toContainText('14.15');
  await expect(homePage.addToCart).toBeVisible();
  await expect(homePage.addToFavorites).toBeVisible();
}
);