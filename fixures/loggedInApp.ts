import { test as base, expect } from '../fixures/app';
import { App } from '../pages/app';

type loggedInAppFixture = {
  loggedInApp: App;
};

const test = base.extend<loggedInAppFixture>({
  loggedInApp: async ({ app, page }, use) => {
    await page.goto('/auth/login');
    await app.loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
    await expect(page).toHaveURL('/account');
    await expect(app.accountPage.pageTitle).toContainText('My account');

    await use(app);
  },
});
export { test, expect };