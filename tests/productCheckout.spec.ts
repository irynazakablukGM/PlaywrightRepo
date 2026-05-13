import { test, expect } from '../fixures/loggedInApp';

test('Verify logged-in user can complete checkout with credit card payment', async ({ page, loggedInApp }) => {
  await test.step('Add first product to the cart and check it in the cart', async () => {
    await page.goto('');
    const productName = await loggedInApp.homePage.getFirstProduct().innerText();
    const productPrice = await loggedInApp.homePage.getFirstProductPrice();
    await loggedInApp.homePage.getFirstProduct().click();
    await loggedInApp.homePage.addToCart.click();
    await expect(loggedInApp.homePage.alertMessage).toBeVisible();
    await expect(loggedInApp.homePage.alertMessage).toContainText('Product added to shopping cart');
    await loggedInApp.homePage.header.cartIcon.click();
    await expect(loggedInApp.cartPage.cartProductTitle).toHaveCount(1);
    await expect(loggedInApp.cartPage.cartProductTitle).toContainText(productName);
    await expect(loggedInApp.cartPage.cartProductPrice).toContainText(productPrice);
    await expect(loggedInApp.cartPage.proceedButton).toBeVisible();
  });

  await test.step('Verify logged-in user can proceed through checkout', async () => {
    await loggedInApp.cartPage.proceedButton.click();
    await expect(page.getByText('you are already logged in')).toBeVisible();
    await loggedInApp.cartPage.proceedToBillingAddressButton.click();
  });

   await test.step('Complete payment successfully', async () => {
    const cardDetails = {
        number: "1111-1111-1111-1111",
        expiryDate: "11/2027",
        cvv: "111",
        holderName: "Jack Howe"
    }
    await loggedInApp.cartPage.fillBillingAddress('3333', '12', 'testState');
    await loggedInApp.cartPage.proceedToPaymentButton.click();
    await loggedInApp.cartPage.selectPaymentMethod('Credit Card');
    await loggedInApp.cartPage.fillCardDetails(cardDetails.number, cardDetails.expiryDate, cardDetails.cvv, cardDetails.holderName);
    await loggedInApp.cartPage.confirmPaymentButton.click();
    await expect(loggedInApp.cartPage.paymentSuccessMessage).toBeVisible();
  })
});