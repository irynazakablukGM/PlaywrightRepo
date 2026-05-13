import { test as base, expect } from '@playwright/test';
import { App } from '../pages/app.js';

type MyFixtures = {
  app: App;
};

const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});
export { test, expect };