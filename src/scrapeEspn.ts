import * as puppeteer from 'puppeteer';
import { scrapeGoogle } from './scrapeGoogle';
import { combine, urlToString, search } from './utils';
import { generateBrowserSettings } from './utils/generateBrowserSettings';

export async function scrapeEspn(
  input: string,
  triedGoogle = false
): Promise<[string, boolean]> {
  let browser: puppeteer.Browser;
  // Create browser settings to enhance performance 
  let browserSettings: string[] = generateBrowserSettings();
  browser = await puppeteer.launch({
    headless: false,
    args: browserSettings,
  });

  let url: string = '';
  let isValidGame = true;
  const join = combine(input);
  const path = `./${join}.png`;
  const defaultStyles = 'src/styles/espn/default-layout.css';
  const alternateStyles = 'src/styles/espn/alternate-layout.css';

  // Appending date to google query for more specific results
  let date = new Date();
  // Remove 10 hours to benefit plausible cases (i.e. early morning search for a game last night)
  date.setHours(date.getHours() - 10);
  const espn = `${input} espn ${date.toLocaleDateString()}`;

  try {
    const [page] = await browser.pages();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await search(browser, page, espn);

    // Navigate to Box Score tab
    const [boxScoreLink]: any = await page.$x('//a[contains(., "Box Score")]');
    await Promise.all([page.waitForNavigation(), boxScoreLink.click()]);
    url = await urlToString(browser);
    console.log(url);
    // ESPN has seperate layout for NBA and NHL so it must use alternate CSS/selector verification
    if (url.includes('nba') || url.includes('nhl')) {
      console.log('used sheet 1');
      await page.addStyleTag({ path: alternateStyles });
    } else {
      console.log('used sheet 2');
      await page.addStyleTag({ path: defaultStyles });
    }

    await page.screenshot({ path: path, captureBeyondViewport: false });
    browser?.close();
    return [url, isValidGame];

    //If game fails, run ESPN method if that hasn't been done yet
  } catch {
    url = 'ERROR: Game could not be found on ESPN.';
    isValidGame = false;
    console.log(url, isValidGame);
    browser?.close();
    
    // We want to avoid a loop, so check if we already tried Google before
    if (!triedGoogle) {
      [url, isValidGame] = await scrapeGoogle(input, true);
    }
    return [url, isValidGame];
  }
}
