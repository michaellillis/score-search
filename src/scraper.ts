import * as puppeteer from 'puppeteer';
import { embed } from './embed';
import { timeout } from './setupTimer';
export function scrape(input: string): string {
  let browser: puppeteer.Browser;
  let url = '';
  (async () => {
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
    await timeout(4000);
    await page.waitForSelector(
      '#sports-app > div > div.abhAW.imso-hov.imso-mh.PZPZlf > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov',
      {
        visible: true,
      }
    );

    const [button] = await page.$x(
      '/html/body/div[7]/div/div[10]/div[1]/div[2]/div[2]/div/div/div[1]/block-component/div/div[1]/div/div/div/div[1]/div/div/div/div/div/div/div[3]/div/div/div/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/div[2]/div/span'
    );

    if (button) {
      await button.click();
      await timeout(2000);
      const score = await page.waitForSelector(
        '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(2) > div.nGzje > div.imso-hide-loading.imso-mh.PZPZlf',
        {
          visible: true,
        }
      );
      await page.screenshot({
        path: './screenshot.png',
      });
    }
    url = page.url();
  })()
    .catch((err) => console.error(err))
    .finally(() => browser?.close());

  return embed(url);
}
