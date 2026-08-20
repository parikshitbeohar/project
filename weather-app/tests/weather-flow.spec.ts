import { test, expect } from '@playwright/test';

test.describe('Sky Check weather app', () => {
  test('loads the default London weather on page load', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('status')).toBeHidden({ timeout: 15000 });

    await expect(page.getByText('London, United Kingdom')).toBeVisible();
    await expect(page.getByText(/^-?\d+°$/)).toBeVisible();
  });

  test('searches for a city and shows its weather', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('status')).toBeHidden({ timeout: 15000 });

    const search = page.getByRole('combobox', { name: 'Search for a city or postcode' });
    await search.fill('Paris');

    const option = page.getByRole('option', { name: /^Paris,.*France$/ });
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();

    await expect(page.getByRole('status')).toBeHidden({ timeout: 15000 });
    await expect(page.getByText(/^Paris,.*France$/)).toBeVisible();
  });

  test('searches by UK postcode and shows the matched district\'s weather', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('status')).toBeHidden({ timeout: 15000 });

    const search = page.getByRole('combobox', { name: 'Search for a city or postcode' });
    await search.fill('SW1A 1AA');

    const option = page.getByRole('option', { name: 'Westminster, SW1A 1AA' });
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();

    await expect(page.getByRole('status')).toBeHidden({ timeout: 15000 });
    await expect(page.getByText('Westminster, SW1A 1AA')).toBeVisible();
  });
});
