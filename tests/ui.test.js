const { test, expect } = require("@playwright/test")

test('Verifi "All Books" Link is Visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const iselementVisibe = await allBooksLink.isVisible();
    expect(iselementVisibe).toBe(true)
})

test('Verify "Register" Button Is Visible', async({page}) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('#guest > a:nth-child(2)');
    const RegisterButton = await page.$('//*[@id="guest"]/a[2]');
    const registerButtonText = await page.textContent('//*[@id="guest"]/a[2]');
    expect(registerButtonText).toBe('Register')
    const iselementVisibe = await RegisterButton.isVisible()
    expect(iselementVisibe).toBe(true)
})

test('Verify That the "All Books" Link Is Visible after user login', async( {page}) => {
    await page.goto("http://localhost:3000");

    // make user input for login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // check if All Book link is visible
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isallBookselementVisibe = await allBooksLink.isVisible();
    expect(isallBookselementVisibe).toBe(true)
   
    // check if My Book link is visible    
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isMyBookselementVisibe = await MyBooksLink.isVisible();
    expect(isMyBookselementVisibe).toBe(true)

    // check if Add Book link is visible
    const addBookLink = await page.$('a[href="/create"]')
    const isAddBookLinkVisible = await addBookLink.isVisible();
    expect(isAddBookLinkVisible).toBe(true)
})

test('Verify That the "My Books" Link Is Visible after user login', async( {page}) => {
    await page.goto("http://localhost:3000");

    // make user input for login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
   
    // check if My Book link is visible    
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isMyBookselementVisibe = await MyBooksLink.isVisible();
    expect(isMyBookselementVisibe).toBe(true)
})

test('Verify That the "Add Books" Link Is Visible after user login', async( {page}) => {
    await page.goto("http://localhost:3000");

    // make user input for login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // check if Add Book link is visible
    const addBookLink = await page.$('a[href="/create"]')
    const isAddBookLinkVisible = await addBookLink.isVisible();
    expect(isAddBookLinkVisible).toBe(true)
})

test("Verify That the User's Email Address Is Visible", async( {page}) => {
    await page.goto("http://localhost:3000");

    // make user input for login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // check if Add Book link is visible
    const userEmailText = await page.textContent('//*[@id="user"]/span')
    expect(userEmailText).toBe('Welcome, peter@abv.bg');
})
