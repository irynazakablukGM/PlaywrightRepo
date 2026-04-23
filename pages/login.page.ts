import { Page, Locator } from "@playwright/test";

export class LoginPage{
  page: Page;
  emailField: Locator;
  passwordField: Locator;
  loginSubmitButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByTestId('email');
    this.passwordField = page.getByTestId('password');
    this.loginSubmitButton = page.getByTestId('login-submit');
  }

async performLogin(email: string, password: string): Promise<void> {
  await this.emailField.fill(email);
  await this.passwordField.fill(password);
  await this.loginSubmitButton.click();
}} 