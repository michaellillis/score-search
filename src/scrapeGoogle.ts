import * as puppeteer from 'puppeteer';
import { scrapeEspn } from './scrapeEspn';
import { combine, urlToString, search } from './utils';
import { generateBrowserSettings } from './utils/generateBrowserSettings';
export async function scrapeGoogle(
  input: string,
  triedESPN = false
): Promise<[string, boolean]> {
  let browser: puppeteer.Browser;
  let url: string = '';
  let isValidGame = true;
  const join = combine(input);
  const path = `./${join}.png`;
  const searchQuery = input;
  let browserSettings: string[] = generateBrowserSettings();
  browser = await puppeteer.launch({
    headless: false,
    args: browserSettings,
  });
  const [page] = await browser.pages();
  await page.setViewport({
    width: 700,
    height: 1080,
    deviceScaleFactor: 2,
  });
  await search(browser, page, searchQuery);
  // Try to find sports game(s) relating to the search.
  try {
    await page.waitForSelector('#sports-app', {
      visible: true,
      timeout: 3000,
    });
    // When the user doesn't include "vs", return the latest game
    if (!input.toLowerCase().includes(' vs ')) {
      await Promise.all([
        page.click('#sports-app .imso-hov'),
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
    return [url, isValidGame];

    //If game can't be found, run ESPN method if that hasn't been done yet
  } catch {
    url = 'ERROR: Game could not be found on Google.';
    isValidGame = false;
    console.log(url, isValidGame);
    browser?.close();

    if (!triedESPN) {
      [url, isValidGame] = await scrapeEspn(input, true);
    }
    return [url, isValidGame];
  }
}
