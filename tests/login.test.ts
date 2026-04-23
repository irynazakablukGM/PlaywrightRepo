import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page'
import { HomePage } from '../pages/home.page'; 

test('Login with valid credentials', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skip login test on CI env');
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  const homePage = new HomePage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toContainText('My account');
  await expect(homePage.header.navMenu).toContainText('Jack Howe');
}
);