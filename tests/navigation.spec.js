import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/')

  await page.locator('body').click()
  await page.getByRole('button', { name: '⭐', exact: true }).click()
  await page.getByRole('button', { name: '⚙' }).click()
  await page.getByText('Rama', { exact: true }).click()
  await page.getByText('Mélange Dark').click()
  await page.getByRole('button', { name: '🏠' }).click()
  await page.getByRole('button', { name: '[+] Rama :: Okapi (Android' }).click()
  await page.getByRole('button', { name: '[-] Rama :: Okapi (Android' }).click()
  await page.getByRole('button', { name: 'Website', exact: true }).click()
  await page.getByRole('button', { name: '[+] Rama :: Salishan (Website' }).click()
  await page.getByRole('button', { name: '[-] Rama :: Salishan (Website' }).click()
})
