const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser =
  {
    name: 'E2E Tester',
    username: 'e2e-test-user',
    password: 'e2e_secret_password'
  }

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    request.post('http://localhost:5173/api/testing/reset')
    request.post('http://localhost:5173/api/users', { data: testUser })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const userNameInput = page.getByText('Username')
    const passwordInput = page.getByText('Password')

    await expect(userNameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  describe('Login...', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      const userNameInput = page.locator('input[name="Username"]')
      const passwordInput = page.locator('input[name="Password"]')
      const loginButton = page.getByRole('button', { name: 'Login' })

      await userNameInput.fill(testUser.username)
      await passwordInput.fill(testUser.password)
      await loginButton.click()
      
      await expect(page.getByText(`${testUser.name} is logged in.`)).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      const userNameInput = page.locator('input[name="Username"]')
      const passwordInput = page.locator('input[name="Password"]')
      const loginButton = page.getByRole('button', { name: 'Login' })

      await userNameInput.fill('wrong-username')
      await passwordInput.fill('wrong-password')
      await loginButton.click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
    })
  })
})
