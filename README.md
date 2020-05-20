# scraping 101

## Project Overview
This is my first contact with scrapping, I did scraping of a website called [Affluent](https://www.affluent.io/) and I learned a few things that we should considerate before use puppeteer or any automate browser.
 1. Always check if there's an API we can use
 2. Check if we can use reverse engineer to get use the api.
 3. If there's no api we can try using request only, the reasons for this is because the request uses less resources than puppeteer or something like selenium, so on.
 4. If we cannot find a api to use, we cannot do reverse engineer and use request because the site uses javascript to render, the last option is to use an automated browser.

## Technologies Used

- [NodeJS](https://nodejs.org/en/download/)
- [ExpressJS](https://expressjs.com/)
- [Cheerio](https://cheerio.js.org/)
- [Puppeteer](https://pptr.dev/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [knex](http://knexjs.org/)

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)

### Installing/Run locally

- Make sure you have `nodejs` installed.
- Clone 

  ```bash
    - git clone https://github.com/GOlmedoFormosa/scraping-101.git
    - cd scraping-101
    - npm install
  ```

- Create/configure `.env` environment with your credentials. A sample `.env.example` file has been provided to get you started. Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.

- Run `npm run watch` to start the server and watch for changes
- Open your browser and go to `localhost:8080`

## Run process to create a request, get users data and store the values in the db

- Run `npm run processUsers` here we are using request-promise to fetch users data and store it in the mysql database.

## Run the automate browser, do the scraping and store the values in the db

- Run `npm run processScraping` this will run puppeteer, get the data and store it in the mysql database.
