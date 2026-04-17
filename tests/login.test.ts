import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByLabel('Email address').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText('My account');
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
}
);