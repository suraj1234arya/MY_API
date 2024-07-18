const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com');
  await page.type('#twotabsearchtextbox', 'laptop');
  await page.click('#nav-search-submit-button');
  await page.waitForSelector('.s-main-slot .s-result-item');
  const firstProductSelector = '#s-image';
  await page.click(firstProductSelector);
  await page.waitForSelector('#add-to-cart-button');
  await page.click('#add-to-cart-button');
})();
