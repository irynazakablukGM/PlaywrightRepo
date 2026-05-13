import { test, expect } from '../fixures/app';

enum Category {
  HAND_TOOLS = 'Hand Tools',
  POWER_TOOLS = 'Power Tools',
  OTHER = 'Other',
}

  test(`Filter product by ${Category.POWER_TOOLS}`, async ({ page, app }) => {
    await page.goto('');
    await app.homePage.chooseFilter('Sander');
    // wait until at least one filtered item appears
    await expect(app.homePage.getFirstProduct()).toContainText('Sander');
    const filteredItems = await app.homePage.getAllProductItems();
    for (const item of filteredItems) {
    expect(item).toContain('Sander');
  }
  });

