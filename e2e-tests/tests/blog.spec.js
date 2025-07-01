const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helpers')

const testUser =
  {
    name: 'E2E Tester',
    username: 'e2e-test-user',
    password: 'e2e_secret_password'
  }

const testBlog = {
  title: 'Playwright E2E test blog',
  autor: 'Playwrigth engine',
  url: 'playwright.dev'
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
      await loginWith(page, testUser.username, testUser.password)
      
      await expect(page.getByText(`${testUser.name} is logged in.`)).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrong-username', 'wrong-password')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
    })
  })

  describe('When logged in...', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, testUser.username, testUser.password)
      await page.getByText('Show blog creation form').click()
    })

    test('A new blog can be created', async ({ page }) => {
      await createBlog(page, testBlog.title, testBlog.autor, testBlog.url)

      await expect(page.locator('.blog-overview')).toBeVisible({ timeout: 10000 })
      await expect(page.getByRole('button', { name: 'Show details' })).toBeVisible({ timeout: 10000 })
    })
  })

})
