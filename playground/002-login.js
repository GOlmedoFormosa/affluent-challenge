const puppeteer = require('puppeteer');
const loginURL = 'https://develop.pub.afflu.net/login';
const dataListURL = 'https://develop.pub.afflu.net/list?type=dates';
const username = 'developertest@affluent.io';
const password = 'SOpcR^37';
const process = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(loginURL);
    await page.type('input[name="username"]', username, { delay: 200 });
    await page.type('input[name="password"]', password, { delay: 200 });
    await page.click('button[type="submit"]', { delay: 200 });
    await page.waitForNavigation();
    await page.goto(dataListURL);
  } catch (error) {
    console.log('error', error);
  }
}

process();