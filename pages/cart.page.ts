import { Page, Locator} from "@playwright/test";

export class CartPage{
  page: Page; 
  cartProductTitle: Locator;
  cartProductPrice: Locator;
  proceedButton: Locator;
  proceedToBillingAddressButton: Locator;
  proceedToPaymentButton: Locator;
  billingPostalCode: Locator;
  billingHouseNumber: Locator;
  billingState: Locator;
  paymentMethod: Locator;
  creditCardNumberField: Locator;
  creditCardExpiryDateField: Locator;
  creditCardCVVCodeField: Locator;
  creditCardHolderNameField: Locator;
  confirmPaymentButton: Locator;
  paymentSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProductTitle = page.getByTestId('product-title');
    this.cartProductPrice = page.getByTestId('product-price');
    this.proceedButton = page.getByTestId('proceed-1');
    this.proceedToBillingAddressButton = page.getByTestId('proceed-2');
    this.proceedToPaymentButton = page.getByTestId('proceed-3')
    this.billingPostalCode = page.getByTestId('postal_code');
    this.billingHouseNumber = page.getByTestId('house_number');
    this.billingState = page.getByTestId('state');
    this.paymentMethod = page.getByTestId('payment-method');
    this.creditCardNumberField = page.getByTestId('credit_card_number');
    this.creditCardExpiryDateField = page.getByTestId('expiration_date');
    this.creditCardCVVCodeField = page.getByTestId('cvv');
    this.creditCardHolderNameField = page.getByTestId('card_holder_name');
    this.confirmPaymentButton = page.getByTestId('finish');
    this.paymentSuccessMessage = page.getByTestId('payment-success-message');
  }

async fillBillingAddress(postalCode: string, houseNumber:string, state:string): Promise<void> {
  await this.billingPostalCode.click();
  await this.billingPostalCode.pressSequentially(postalCode);

  await this.billingHouseNumber.click();
  await this.billingHouseNumber.pressSequentially(houseNumber);

  await this.billingState.click();
  await this.billingState.pressSequentially(state);
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