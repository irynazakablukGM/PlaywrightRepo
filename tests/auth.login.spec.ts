import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page'

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toContainText('My account');
  await page.context().storageState({ path: authFile });
}
);