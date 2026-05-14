import { test, expect } from '../fixures/app';

test('Verify user can add product to the cart', async ({ page, app }) => {
  await test.step('Open product page', async () => {
    await page.goto('');
    await app.homePage.getProductItem('Slip Joint Pliers').click();
    await expect(page).toHaveURL(/.*\/product/);
    await expect(app.homePage.productName).toContainText('Slip Joint Pliers');
    await expect(app.homePage.productPrice).toContainText('9.17');
  });

  await test.step('Add product to the cart', async () => {
    await app.homePage.addToCart.click();
    await expect(app.homePage.alertMessage).toBeVisible();
    await expect(app.homePage.alertMessage).toContainText('Product added to shopping cart');
    // verify that alert is hidden after 8 sec
    await expect(app.homePage.alertMessage).toBeHidden({ timeout: 8000 });
    const cartCount = await app.homePage.header.getCartItemsCount();
    expect(cartCount).toEqual(1);
  });

  await test.step('Open the cart', async () => {
    await app.homePage.header.cartIcon.click();
    await expect(page).toHaveURL(/.*\/checkout/);
    await expect(app.cartPage.cartProductTitle).toHaveCount(1);
    await expect(app.cartPage.cartProductTitle).toContainText('Slip Joint Pliers');
    await expect(app.cartPage.proceedButton).toBeVisible();
  })
});