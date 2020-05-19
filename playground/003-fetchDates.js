const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// data
const loginURL = 'https://develop.pub.afflu.net/login';
const username = 'developertest@affluent.io';
const password = 'SOpcR^37';

// I could use list?type=dates&startDate=2019-04-30&endDate=2020-04-01
const navigateToDataListURL = 'https://develop.pub.afflu.net/list?type=dates';
const startRangeValue = "04/30/2019";
const endRangeValue = "04/01/2020"

const clear = async function ( selector) {
  await this.evaluate(selector => {
    document.querySelector(selector).value = "";
  }, selector);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const process = async () => {
  try {
    // set defaultViewport to null otherwise I click in the floating button instead.
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    page.clear = clear;

    await page.goto(loginURL);
    await page.type('input[name="username"]', username, { delay: 200 });
    await page.type('input[name="password"]', password, { delay: 200 });
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.goto(navigateToDataListURL);

    await page.waitForSelector('#dashboard-report-range');
    await page.waitForSelector('input[name="daterangepicker_start"');
    await page.waitForSelector('input[name="daterangepicker_end"');

    await page.click('#dashboard-report-range');

    await page.clear('input[name="daterangepicker_start"')
    await page.clear('input[name="daterangepicker_end"')

    await page.type('input[name="daterangepicker_start"', startRangeValue, { delay: 200 });
    await page.type('input[name="daterangepicker_end"', endRangeValue, { delay: 200 });
    await page.click('.range_inputs > .btn-success', { delay: 200 });
    await page.waitFor(6000);
    await page.click('#DataTables_Table_0_length button');
    await page.waitForSelector('#DataTables_Table_0_length li a');
    await page.click('#DataTables_Table_0_length li:last-child a');
    await page.waitFor(6000);
    const html = await page.content();
    const $ = cheerio.load(html);
    const tableHeaders = [];
    const scrapedRows = [];
    $('#DataTables_Table_0 thead tr:first-child th').each((index, header) => {
      const textArr = $(header).text().toLowerCase().split(' - ');
      if(textArr.length === 2) textArr[1] = capitalizeFirstLetter(textArr[1])
      tableHeaders.push(textArr.join(''));
    });
    console.log('trs', $('#DataTables_Table_0 tbody tr').length);
    $('#DataTables_Table_0 tbody tr').each((index, element) => {
      const tds = $(element).find('td');
      const scrapedRow = {};
      $(tds).each((index, element) => {
        scrapedRow[tableHeaders[index]] = $(element).text();
      });
      scrapedRows.push(scrapedRow);
    });
    console.log('quantity', scrapedRows.length);
    console.log('rows', scrapedRows);
    return scrapedRows;
  } catch (error) {
    console.log('error', error);
  }
}

process();