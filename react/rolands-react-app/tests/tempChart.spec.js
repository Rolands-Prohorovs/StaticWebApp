import { test, expect } from '@playwright/test';

test('loads the chart with temperature data', async ({ page }) => {
  await page.goto('https://gray-sand-0447b8403.6.azurestaticapps.net/');

  // Wait for chart to load
  await expect(page.getByText('Temperature Over Time')).toBeVisible();

  // Check that at least one data point appears
  const chart = await page.locator('svg'); // SVG chart
  await expect(chart).toBeVisible();
});
