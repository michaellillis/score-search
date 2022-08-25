import * as puppeteer from 'puppeteer';
import { scrapeEspn } from './scrapeEspn';
import { combine, urlToString, search } from './utils';
export async function scrapeGoogle(input: string, triedESPN = false) {
  let browser: puppeteer.Browser;
  let url: string = '';
  const join = combine(input);
  const path = `./${join}.png`;
  const searchQuery = input;
  browser = await puppeteer.launch({ headless: false });
  const [page] = await browser.pages();
  await page.setViewport({
    width: 700,
    height: 1080,
    deviceScaleFactor: 2,
  });
  await search(page, searchQuery);
  // Try to find sports game(s) relating to the search.
  try {
    await page.waitForSelector('#sports-app', {
      visible: true,
      timeout: 3000,
    });
    // When the user doesn't include "vs", return the latest game
    if (!input.toLowerCase().includes(' vs ')) {
      await Promise.all([
        page.click('#sports-app table table'),
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 3000 }),
      ]);
      await page.screenshot({
        path: path,
      });
      // When the user searches with "vs", return an entire container of that mathchup
    } else {
      const element = await page.$('#sports-app');

      if (element !== null) {
        await element.screenshot({ path: path });
      }
    }
    url = await urlToString(browser);
    browser?.close();
    return url;

    //If game fails, run ESPN method if that hasn't been done yet
  } catch {
    url = 'ERROR: Failed to scrape from Google.';
    console.log(url);
    browser?.close();

    if (!triedESPN) {
      url = await scrapeEspn(input);
    }
    return url;
  }
}
