import { Page, Locator, expect} from "@playwright/test";

export class CartPage{
  page: Page; 
  cartProductTitle: Locator;
  cartProductPrice: Locator;
  proceedButton: Locator;
  proceedToBillingAddressButton: Locator;
  proceedToPaymentButton: Locator;
  billingPostalCode: Locator;
  billingHouseNumber: Locator;
  billingCountry: Locator;
  paymentMethod: Locator;
  creditCardNumberField: Locator;
  creditCardExpiryDateField: Locator;
  creditCardCVVCodeField: Locator;
  creditCardHolderNameField: Locator;
  confirmPaymentButton: Locator;
  paymentSuccessMessage: Locator;
  currentState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProductTitle = page.getByTestId('product-title');
    this.cartProductPrice = page.getByTestId('product-price');
    this.proceedButton = page.getByTestId('proceed-1');
    this.proceedToBillingAddressButton = page.getByTestId('proceed-2');
    this.proceedToPaymentButton = page.getByTestId('proceed-3')
    this.billingPostalCode = page.getByTestId('postal_code');
    this.billingHouseNumber = page.getByTestId('house_number');
    this.billingCountry = page.getByTestId('country');
    this.paymentMethod = page.getByTestId('payment-method');
    this.creditCardNumberField = page.getByTestId('credit_card_number');
    this.creditCardExpiryDateField = page.getByTestId('expiration_date');
    this.creditCardCVVCodeField = page.getByTestId('cvv');
    this.creditCardHolderNameField = page.getByTestId('card_holder_name');
    this.confirmPaymentButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    this.currentState = page.locator(
      'aw-wizard-navigation-bar ul li.current .label',
    );
  }

async fillBillingAddress(country: string, postalCode: string, houseNumber: string) {
  await expect(this.currentState).toHaveText('Billing Address');
  
  await this.billingCountry.selectOption(country);

  await expect(async () => {
    await this.billingPostalCode.fill(postalCode);
    await this.billingHouseNumber.fill(houseNumber);
    
    await this.billingPostalCode.dispatchEvent('input');
    await this.billingHouseNumber.dispatchEvent('input');
    await this.billingHouseNumber.blur();

    await expect(this.proceedToPaymentButton).toBeEnabled();
  }).toPass({ timeout: 15000 });
}

async selectPaymentMethod(method: string): Promise<void> {
  await this.paymentMethod.selectOption(method);
}

async fillCardDetails(cardNumber: string, cardExpiryDate: string, cardCVV: string, cardHolder: string): Promise<void> {
  await this.creditCardNumberField.fill(cardNumber);
  await this.creditCardExpiryDateField.fill(cardExpiryDate);
  await this.creditCardCVVCodeField.fill(cardCVV);
  await this.creditCardHolderNameField.fill(cardHolder);
}

} 