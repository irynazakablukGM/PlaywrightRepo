import { Page } from "@playwright/test";
import { AccountPage } from "./account.page";
import { CartPage } from "./cart.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";

export class App {
    loginPage: LoginPage;
    homePage: HomePage;
    accountPage: AccountPage;
    cartPage: CartPage;
    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.homePage = new HomePage(page);
        this.cartPage = new CartPage(page);
    }
}