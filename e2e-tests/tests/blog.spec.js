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

const mostLikesBlog = {
  title: 'Best blog',
  author: 'Famous author',
  url: 'best.com'
}

const averageLikesBlog = {
  title: 'Ok blog',
  author: 'Normal author',
  url: 'alright.com'
}

const leastLikesBlog = {
  title: 'Boring blog',
  author: 'Unknown author',
  url: 'lame.com'
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

    test('Blogs are sorted by likes, in descending order', async ({ page, request }) => {
      await createBlog(page, leastLikesBlog.title, leastLikesBlog.author, leastLikesBlog.url)
      await page.getByText('Show blog creation form').click()
      await createBlog(page, mostLikesBlog.title, mostLikesBlog.author, mostLikesBlog.url)
      await page.getByText('Show blog creation form').click()
      await createBlog(page, averageLikesBlog.title, averageLikesBlog.author, averageLikesBlog.url)
      await page.waitForResponse((response) => response.url().includes('/api/blogs'))
      
      const blogOverviewDivs = page.locator('.blog-overview')
      await expect(blogOverviewDivs).toHaveCount(3)

      for (let i = 0; i < 3; i++) {
        /*
          Since blogDivs changes dynamically when 'Show details' is clicked, we can always access
          the first element of the the locator array. Since this locator array changes when
          'Show details' is clicked, we _must not_ use index-based access here, e.g. with .nth(i).
        */
        const currentBlogDiv = blogOverviewDivs.first()
        await expect(currentBlogDiv).toBeVisible()
        await currentBlogDiv.getByRole('button', { name: 'Show details' }).click()
      }

      const blogDetailDivs = page.locator('.blog-details')

      const mostLikesDiv = blogDetailDivs.getByText(mostLikesBlog.title)
      for (let i = 0; i < 5; i++) {
        await mostLikesDiv.getByRole('button', { name: 'Like' }).click()
      }
      
      const averageLikesDiv = blogDetailDivs.getByText(averageLikesBlog.title)
      for (let i = 0; i < 3; i++) {
        await averageLikesDiv.getByRole('button', { name: 'Like' }).click()
      }
      
      const leastLikesDiv = blogDetailDivs.getByText(leastLikesBlog.title)
      for (let i = 0; i < 1; i++) {
        await leastLikesDiv.getByRole('button', { name: 'Like' }).click()
      }

      await expect(blogDetailDivs.nth(0)).toContainText('5')
      await expect(blogDetailDivs.nth(1)).toContainText('3')
      await expect(blogDetailDivs.nth(2)).toContainText('1')
    })
  })

})
