const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const logger = require('../lib/logger');
const { clear, capitalizeFirstLetter } = require('../utils/utils');
const db = require('../db/db.js');

// data
const loginURL = 'https://develop.pub.afflu.net/login';
const username = 'developertest@affluent.io';
const password = 'SOpcR^37';

// I could use list?type=dates&startDate=2019-04-30&endDate=2020-04-01
const navigateToDataListURL = 'https://develop.pub.afflu.net/list?type=dates';
const startRangeValue = "04/30/2019";
const endRangeValue = "04/01/2020"

const login = async(page) => {
  await page.goto(loginURL);
  await page.type('input[name="username"]', username, { delay: 200 });
  await page.type('input[name="password"]', password, { delay: 200 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto(navigateToDataListURL);
  return page;
}

const filterByDateRange = async(page) => {
  await page.waitForSelector('#dashboard-report-range');
  await page.waitForSelector('input[name="daterangepicker_start"');
  await page.waitForSelector('input[name="daterangepicker_end"');
  // show filter container
  await page.click('#dashboard-report-range');
  // clean inputs
  await page.clear('input[name="daterangepicker_start"')
  await page.clear('input[name="daterangepicker_end"')
  // update values
  await page.type('input[name="daterangepicker_start"', startRangeValue, { delay: 200 });
  await page.type('input[name="daterangepicker_end"', endRangeValue, { delay: 200 });
  // filter
  await page.click('.range_inputs > .btn-success', { delay: 200 });
  await page.waitFor(6000);
  return page;
}

const showAllRows = async(page) => {
  await page.click('#DataTables_Table_0_length button');
  await page.waitForSelector('#DataTables_Table_0_length li a');
  await page.click('#DataTables_Table_0_length li:last-child a');
  await page.waitFor(6000);
  return page;
}

const mapHtmlRowsToUserJSObjects = async(page) => {
  const html = await page.content();
  const $ = cheerio.load(html);
  const tableHeaders = [];
  const scrapedRows = [];
  $('#DataTables_Table_0 thead tr:first-child th').each((index, header) => {
    const textArr = $(header).text().toLowerCase().split(' - ');
    if(textArr.length === 2) textArr[1] = capitalizeFirstLetter(textArr[1])
    tableHeaders.push(textArr.join(''));
  });
  $('#DataTables_Table_0 tbody tr').each((index, element) => {
    const tds = $(element).find('td');
    const scrapedRow = {};
    $(tds).each((index, element) => {
      scrapedRow[tableHeaders[index]] = $(element).text();
    });
    scrapedRows.push(scrapedRow);
  });
  return scrapedRows;
}

const process = async () => {
  try {
    // set defaultViewport to null otherwise I click in the floating button instead.
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    let page = await browser.newPage();
    page.clear = clear;
    page = await login(page);
    page = await filterByDateRange(page);
    page = await showAllRows(page);
    const users = await mapHtmlRowsToUserJSObjects(page);
    return users;
  } catch (error) {
    logger.error(error);
  }
}

process().then(async (rows) => {
  console.log('scraping finished');
  const result = await db.insert('dates', rows);
  console.log('insert finished');
  console.log('result', result);
}).catch(error => console.log('error', error));


// [
//   {
//     date: 'Dec 24, 2019',
//     commissionsTotal: '$318.95',
//     salesNet: '78',
//     leadsNet: '0',
//     clicks: '1,333',
//     epc: '$0.24',
//     impressions: '0',
//     cr: '5.85%'
//   }
// ]