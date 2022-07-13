import * as puppeteer from 'puppeteer';
import { timeout, combine } from './utils';
async function logs(browser: puppeteer.Browser): Promise<string> {
  const pages = await browser.pages();
  let page;
  for (let i = 0; i < pages.length && !page; i++) {
    const isHidden = await pages[i].evaluate(() => document.hidden);
    if (!isHidden) {
      page = pages[i];
    }
  }
  if (page !== undefined) {
    return page.url();
  } else {
    return 'Undefined';
  }
}
export async function scrape(input: string) {
  let live = true;
  let playing = true;
  let browser: puppeteer.Browser;
  let url: string = '';
  const join = combine(input);
  const path = `./${join}.png`;

  const searchQuery = input;
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1920 / 2,
    height: 1080 / 2,
    deviceScaleFactor: 2,
  });
  await page.goto('https://www.google.com/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('input[aria-label="Search"]', { visible: true });
  await page.type('input[aria-label="Search"]', searchQuery);
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
  try {
    await page.waitForSelector(
      '#sports-app > div > div.abhAW.imso-hov.imso-mh.PZPZlf > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov',
      {
        visible: true,
      }
    );
  } catch {
    playing = false;
    url = 'not live';
  }
  if (playing === true) {
  }
  const [button] = await page.$x(
    '/html/body/div[7]/div/div[10]/div[1]/div[2]/div[2]/div/div/div[1]/block-component/div/div[1]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div/span'
  );
  if (button) {
    await button.click();
    try {
      await page.waitForSelector(
        '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(2) > div.nGzje > div.imso-hide-loading.imso-mh.PZPZlf',
        {
          visible: true,
        }
      );
      await page.waitForSelector(
        '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(2) > div.nGzje > div.imso-hide-loading.imso-mh.PZPZlf > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd > div.imso_mh__score-sum.imso-ani > div > div',
        {
          visible: true,
        }
      );
    } catch {
      console.log('Not live');
      live = false;
    }
    if (live === false) {
      await page.waitForSelector(
        '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(3) > div.nGzje > div.imso-hide-loading.imso-mh.PZPZlf > div:nth-child(2) > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd > div > div.imso_mh__tm-a-sts > div.imso-ani.imso_mh__tas'
      );
    }
    url = await logs(browser);
    await page.screenshot({
      path: path,
    });
  } else {
    url = `The ${searchQuery}'s team isn't playing.`;
  }
  browser?.close();
  return url;
}
