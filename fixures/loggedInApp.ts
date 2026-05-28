import { test as base, expect } from '../fixures/app';
import { App } from '../pages/app';

type loggedInAppFixture = {
  loggedInApp: App;
};

interface LoginResponse {
  access_token: string;
}

const test = base.extend<loggedInAppFixture>({
  loggedInApp: async ({ app, request, page }, use) => {
    const resp = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            'email': 'customer2@practicesoftwaretesting.com',
            'password': 'welcome01'
        }
    })
    const jsonData = await resp.json() as LoginResponse;
    const token = jsonData.access_token;

    await page.goto('/');

    await page.evaluate((authToken) => {
        localStorage.setItem('auth-token', authToken);
    }, token);

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jack Howe', { timeout: 15000 });
    await use(app);
  },
});
export { test, expect };