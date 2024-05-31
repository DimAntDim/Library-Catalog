const { test, expect } = require("@playwright/test")

test('Verifi All Books Are Visible', async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const iselementVisibe = await allBooksLink.isVisible();
    expect(iselementVisibe).toBe(true)
})
