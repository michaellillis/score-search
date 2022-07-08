import * as puppeteer from 'puppeteer';
import { timeout } from './setupTimer';
export async function scrape(input: any) {
  let browser: puppeteer.Browser;
  (async () => {
    const searchQuery = input;
    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.google.com/', {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('input[aria-label="Search"]', { visible: true });
    await page.type('input[aria-label="Search"]', searchQuery);
    await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
    await timeout(4000);
    const elm = await page.waitForSelector(
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
      await timeout(6000);
      await page.waitForSelector(
        '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(2) > div.nGzje > div.imso-hide-loading.imso-mh.PZPZlf > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd > div:nth-child(1) > div.imso_mh__tm-a-sts > div.imso-ani.imso_mh__tas > div > div.imso_mh__scr-sep > div'
      );
      await page.screenshot({
        path: './screenshot.png',
        fullPage: true,
      });
    }
  })()
    .catch((err) => console.error(err))
    .finally(() => browser?.close());
}
