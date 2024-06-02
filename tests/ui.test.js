const { test, expect } = require("@playwright/test")

const server = "http://localhost:3000";

test('Verifi "All Books" Link is Visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const iselementVisibe = await allBooksLink.isVisible();
    expect(iselementVisibe).toBe(true)
});

test('Verify "Register" Button Is Visible', async({page}) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('#guest > a:nth-child(2)');
    const RegisterButton = await page.$('//*[@id="guest"]/a[2]');
    const registerButtonText = await page.textContent('//*[@id="guest"]/a[2]');
    expect(registerButtonText).toBe('Register');
    const iselementVisibe = await RegisterButton.isVisible();
    expect(iselementVisibe).toBe(true);
});

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
    expect(isallBookselementVisibe).toBe(true);
   
    // check if My Book link is visible    
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isMyBookselementVisibe = await MyBooksLink.isVisible();
    expect(isMyBookselementVisibe).toBe(true);

    // check if Add Book link is visible
    const addBookLink = await page.$('a[href="/create"]');
    const isAddBookLinkVisible = await addBookLink.isVisible();
    expect(isAddBookLinkVisible).toBe(true)
});

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
});

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
});

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
});

test("Submit the Form with Valid Credentials", async( {page}) => {
    await page.goto("http://localhost:3000");

    // Make valid user input for login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // check if we are on the correct end point
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog')
});

test('Submit Login Form with empty input', async( {page} ) => {
    await page.goto(server);
    await page.goto('http://localhost:3000/login');   
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.click('input[type="submit"]');    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
});

test('Submit Login Form with empty password input', async( {page} ) => {
    await page.goto(server);
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg'); 
    await page.fill('input[name="password"]', '');  
    // Set up the dialog event listener and click the submit button
    page.once('dialog', async dialog => {
        // Verify the dialog type and message
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('All fields are required!');
        // Accept the dialog
        await dialog.accept();
     });
    await page.click('input[type="submit"]');
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
});

test('Submit the Register Form with Valid Values', async({page}) => {
    await page.goto(server);
    await page.goto('http://localhost:3000/register');
    const password = '123456';
    const confirmed_password = '123456';
    await page.fill('input[name="email"]', 'dam@abv.bg');
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-pass"]', confirmed_password);
    await page.click('//*[@id="register-form"]/fieldset/input');
    await page.waitForLoadState('load');
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isMyBookselementVisibe = await MyBooksLink.isVisible();
    expect(isMyBookselementVisibe).toBe(true)
    const userEmailText = await page.textContent('//*[@id="user"]/span');
    expect(userEmailText).toBe('Welcome, dam@abv.bg');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Submit the Form with Empty Values', async({page}) => {
    await page.goto(server);
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'dam@abv.bg');
    await page.fill('input[name="password"]', '');
    await page.fill('input[name="confirm-pass"]', '');
    // Set up the dialog event listener and click the submit button
    page.once('dialog', async dialog => {
        // Verify the dialog type and message
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain('All fields are required!');
        // Accept the dialog
        await dialog.accept();
    });
    await page.click('//*[@id="register-form"]/fieldset/input');
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
});

