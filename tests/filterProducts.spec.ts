import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

enum Category {
  HAND_TOOLS = 'Hand Tools',
  POWER_TOOLS = 'Power Tools',
  OTHER = 'Other',
}

  test(`Filter product by ${Category.POWER_TOOLS}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('');
    await homePage.chooseFilter('Sander');
    // wait until at least one filtered item appears
    await expect(homePage.getFirstProduct()).toContainText('Sander');
    const filteredItems = await homePage.getAllProductItems();
     for (const item of filteredItems) {
    expect(item).toContain('Sander');
  }
  });

