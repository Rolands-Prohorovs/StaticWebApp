import { test, expect } from '@playwright/test';

test('loads both temperature and humidity charts with data', async ({ page }) => {
  // Visit the deployed site
  await page.goto('https://gray-sand-0447b8403.6.azurestaticapps.net/');

  // ✅ Check temperature chart
  await expect(page.getByText('Temperature Over Entries')).toBeVisible();

  const svgs = page.locator('svg');
  const tempChart = svgs.nth(0); // First chart is temperature

  await expect(tempChart).toBeVisible();

  const tempPaths = tempChart.locator('path');
  expect(await tempPaths.count()).toBeGreaterThan(0);

  const tempPoints = tempChart.locator('circle, rect');
  expect(await tempPoints.count()).toBeGreaterThan(0);

  // ✅ Check humidity chart
  await expect(page.getByText('Humidity Over Entries')).toBeVisible();

  const humidityChart = svgs.nth(1); // Second chart is humidity

  await expect(humidityChart).toBeVisible();

  const humidityPaths = humidityChart.locator('path');
  expect(await humidityPaths.count()).toBeGreaterThan(0);

  const humidityPoints = humidityChart.locator('circle, rect');
  expect(await humidityPoints.count()).toBeGreaterThan(0);
});
