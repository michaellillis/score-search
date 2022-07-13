import * as puppeteer from 'puppeteer';
import { combine } from './utils';
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
const waitTillHTMLRendered = async (page: puppeteer.Page, timeout = 3000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await page.evaluate(
      () => document.body.innerHTML.length
    );

    console.log(
      'last: ',
      lastHTMLSize,
      ' <> curr: ',
      currentHTMLSize,
      ' body html size: ',
      bodyHTMLSize
    );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log('Page rendered fully..');
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};
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
        timeout: 10000,
      }
    );
  } catch {
    playing = false;
    url = 'not live';
  }
  if (playing === true) {
    const [button] = await page.$x(
      '/html/body/div[7]/div/div[10]/div[1]/div[2]/div[2]/div/div/div[1]/block-component/div/div[1]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div/span'
    );
    if (button) {
      await button.click();
      try {
        await waitTillHTMLRendered(page);
      } catch {
        console.log('Not live');
        live = false;
      }
      if (live === false) {
        await waitTillHTMLRendered(page);
      }
      url = await logs(browser);
      await page.screenshot({
        path: path,
      });
    } else {
      url = `The ${searchQuery}'s team isn't playing.`;
    }
  }
  browser?.close();
  return url;
}
