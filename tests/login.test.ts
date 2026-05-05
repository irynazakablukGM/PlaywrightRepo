import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page'; 

test('Login with valid credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('');
  await expect(homePage.header.navMenu).toContainText('Jack Howe');
}
);