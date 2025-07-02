const loginWith = async (page, username, password)  => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForResponse(resp => resp.url().includes('/api/login'))
}

const createBlog = async (page, title, author, url) => {
  await page.locator('.title-input').fill(title)
  await page.locator('.author-input').fill(author)
  await page.locator('.url-input').fill(url)
  await page.locator('.create-button').click()
  await page.waitForResponse(resp => resp.url().includes('/api/blogs'))
}

const deleteCreatedBlog = async (page) => {
  page.on('dialog', dialog => dialog.accept())
  await page.getByRole('button', { name: 'Show details' }).click()
  await page.getByRole('button', { name: 'Remove' }).click()
  await page.waitForResponse(resp => resp.url().includes('/api/blogs'))
}

export { loginWith, createBlog, deleteCreatedBlog }