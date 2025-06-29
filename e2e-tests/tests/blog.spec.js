const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const userNameInput = page.getByText('Username:')
    const passwordInput = page.getByText('Password:')

    await expect(userNameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })
})