import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CartPage} from '../pages/cart.page';

test('Verify user can add product to the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await test.step('Open product page', async () => {
    await page.goto('');
    await homePage.getProductItem('Slip Joint Pliers').click();
    await expect(page).toHaveURL(/.*\/product/);
    await expect(homePage.productName).toContainText('Slip Joint Pliers');
    await expect(homePage.productPrice).toContainText('9.17');
  });

  await test.step('Add product to the cart', async () => {
    await homePage.addToCart.click();
    await expect(homePage.alertMessage).toBeVisible();
    await expect(homePage.alertMessage).toContainText('Product added to shopping cart');
    // verify that alert is hidden after 8 sec
    await expect(homePage.alertMessage).toBeHidden({ timeout: 8000 });
    const cartCount = await homePage.header.getCartItemsCount();
    expect(cartCount).toEqual(1);
  });

  await test.step('Open the cart', async () => {
    await homePage.header.cartIcon.click();
    await expect(page).toHaveURL(/.*\/checkout/);
    await expect(cartPage.cartProductTitle).toHaveCount(1);
    await expect(cartPage.cartProductTitle).toContainText('Slip Joint Pliers');
    await expect(cartPage.proceedButton).toBeVisible();
  })
});