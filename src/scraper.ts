import * as puppeteer from 'puppeteer';
import { combine, urlToString, search } from './utils';

export async function scrape(input: string) {
  let browser: puppeteer.Browser;
  let url: string = '';
  const join = combine(input);
  const path = `./${join}.png`;
  const stylesheet = 'src/style.css';
  const espn = `${input} espn`;
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 4,
  });
  await search(page, espn);
  await Promise.all([page.click('#search a'), page.waitForNavigation()]);
  url = await urlToString(browser);

  try {
    if (url.includes('team')) {
      await Promise.all([page.click('.Schedule a'), page.waitForNavigation()]);
    }
    const [boxScore] = await page.$x('//span[contains(., "Box Score")]');
    await boxScore.click();
    await page.addStyleTag({ path: stylesheet });
    url = await urlToString(browser);
    await page.screenshot({
      path: path,
    });
  } catch {
    url = 'google';
    console.log('ERROR: Could not locate game on ESPN.');
  }
  browser?.close();
  return url;
}
