const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logoutAndLogInWith, createBlog, deleteCreatedBlog } = require('./helpers')

const testUser1 =
  {
    name: 'E2E Tester',
    username: 'e2e-test-user',
    password: 'e2e_secret_password'
  }

const testUser2 =
  {
    name: 'Blog Visitor',
    username: 'guest-1',
    password: 'guestpw123'
  }

const testBlog = {
  title: 'Playwright E2E test blog',
  author: 'Playwrigth engine',
  url: 'playwright.dev'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', { data: testUser1 })
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
      await loginWith(page, testUser1.username, testUser1.password)
      
      await expect(page.getByText(`${testUser1.name} is logged in.`)).toBeVisible()
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrong-username', 'wrong-password')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
    })
  })

  describe('When logged in...', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, testUser1.username, testUser1.password)
      await page.getByText('Show blog creation form').click()
    })

    test('A new blog can be created', async ({ page }) => {
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)

      await expect(page.locator('.blog-overview')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Show details' })).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
      await page.getByRole('button', { name: 'Show details' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      await expect(page.locator('.blog-details')).toBeVisible()
      await expect(page.getByText('1')).toBeVisible()
    })

    test('A blog can be deleted', async ({ page }) => {
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
      await deleteCreatedBlog(page)

      await expect(page.locator('.blog-overview')).not.toBeVisible()
      await expect(page.locator('.blog-details')).not.toBeVisible()
    })

    test('Only the user who created a blog can see the \'Remove\'-button', async ({ page, request }) => {
      await request.post('http://localhost:5173/api/users', { data: testUser2 })
      await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
      await logoutAndLogInWith(page, testUser2.username, testUser2.password)
      await page.getByRole('button', { name: 'Show details' }).click()

      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
  })

})
