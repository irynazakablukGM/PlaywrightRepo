import { test, expect } from '../fixures/app';

test('Verify list of mocked products', { tag: '@regression' }, async ({ page, app }) => {
  interface ProductsResponse {
    data: Array<Record<string, unknown>>;
    [key: string]: unknown;
  }

  await page.route('https://api.practicesoftwaretesting.com/products*', async route => {
    const response = await route.fetch();
    const json = await response.json() as ProductsResponse;

    const existingProducts = json.data;

    const extraProducts = [];

    for (let i = 0; i < 11; i++) {
      extraProducts.push({
        ...existingProducts[0],
        id: `mock-${i + 1}`,
        name: `Mock product ${i + 1}`,
      });
    }

    await route.fulfill({
      json: {
        ...json,
        data: [...existingProducts, ...extraProducts]
      },
    });
  });

  await page.goto('');

  await expect(app.homePage.productName).toHaveCount(20);
});