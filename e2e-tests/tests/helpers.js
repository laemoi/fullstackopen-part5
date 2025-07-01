const loginWith = async (page, username, password)  => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}


const createBlog = async (page, title, author, url) => {
  await page.locator('.title-input').fill(title)
  await page.locator('.author-input').fill(author)
  await page.locator('.url-input').fill(url)
  await page.locator('.create-button').click()
  await page.getByRole('button', { name: 'Show details' })
}

export { loginWith, createBlog }