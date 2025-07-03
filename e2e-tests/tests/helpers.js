const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const logoutAndLogInWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Logout' }).click()
  await loginWith(page, username, password)
}

const createBlog = async (page, title, author, url) => {
  await page.locator('input[name="title"]').fill(title)
  await page.locator('input[name="author"]').fill(author)
  await page.locator('input[name="url"]').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

const deleteCreatedBlog = async (page) => {
  page.on('dialog', dialog => dialog.accept())
  await page.getByRole('button', { name: 'Show details' }).click()
  await page.getByRole('button', { name: 'Remove' }).click()
}

export { loginWith, logoutAndLogInWith, createBlog, deleteCreatedBlog }