import * as puppeteer from 'puppeteer';
import { combine, urlToString, search } from './utils';

export async function scrapeEspn(input: string) {
  let browser: puppeteer.Browser;
  let url: string = '';
  const join = combine(input);
  const path = `./${join}.png`;
  const defaultStyles = 'src/styles/espn/default-layout.css';
  const alternateStyles = 'src/styles/espn/alternate-layout.css';
  const espn = `${input} espn`;
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await search(page, espn);
  await Promise.all([page.click('#search a'), page.waitForNavigation()]);
  url = await urlToString(browser);

  try {
    if (url.includes('team')) {
      console.log('has team');
      await Promise.all([page.click('.Schedule a'), page.waitForNavigation()]);
    }
    const [boxScore] = await page.$x('//span[contains(., "Box Score")]');
    await boxScore.click();
    url = await urlToString(browser);

    // ESPN has seperate layout for NBA and NHL so it must use alternate CSS/selector verification
    if (url.includes('nba') || url.includes('nhl')) {
      await page.addStyleTag({ path: alternateStyles });
      await page.waitForSelector('.Boxscore', { visible: true });
    } else {
      await page.addStyleTag({ path: defaultStyles });
      await page.waitForSelector('.main-content', { visible: true });
    }
    await page.screenshot({ path: path, captureBeyondViewport: false });
  } catch {
    url = 'google';
    console.log('ERROR: Could not locate game on ESPN.');
  }
  browser?.close();
  return url;
}
