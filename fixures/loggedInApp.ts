import { test as base, expect } from '../fixures/app';
import { App } from '../pages/app';
import { USER_EMAIL, USER_PASSWORD, USER_NAME } from '../config/baseConfig';

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
            'email': USER_EMAIL,
            'password': USER_PASSWORD,
        },
    });
    const jsonData = await resp.json() as LoginResponse;
    const token = jsonData.access_token;

    await page.goto('/');

    await page.evaluate((authToken) => {
        localStorage.setItem('auth-token', authToken);
    }, token);

    await page.goto('/');
    const navMenu = page.locator('[data-test="nav-menu"]');
    await navMenu.waitFor({ state: 'visible', timeout: 15000 });
    await expect(navMenu).toContainText(USER_NAME);
    await use(app);
  },
});
export { test, expect };