import * as puppeteer from 'puppeteer';
import { combine, urlToString, waitTillHTMLRendered, search } from './utils';
export async function scrapeUsingGoogle(input: string) {
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
    width: 700,
    height: 1080,
    deviceScaleFactor: 2,
  });
  await search(page, searchQuery);
  try {
    await page.waitForSelector(
      '#sports-app > div > div.abhAW.imso-hov.imso-mh.PZPZlf > div > div > div > div > div.imso_mh__tm-scr.imso_mh__mh-bd.imso-hov',
      {
        visible: true,
        timeout: 3000,
      }
    );
  } catch {
    playing = false;
    url = 'not live';
    console.log('not live');
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
      url = await urlToString(browser);
      await page.screenshot({
        path: path,
      });
    }
  } else {
    const getFirst = await page.waitForSelector(
      '#sports-app > div > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td.liveresults-sports-immersive__match-tile.imso-hov.liveresults-sports-immersive__match-grid-bottom-border.liveresults-sports-immersive__match-grid-right-border',
      {
        visible: true,
        timeout: 3000,
      }
    );
    await getFirst?.click();
    url = await urlToString(browser);
    await waitTillHTMLRendered(page);
    await page.screenshot({
      path: path,
    });
    const getSecond = await page.waitForSelector(
      '#liveresults-sports-immersive__match-fullpage > div > div:nth-child(2) > div.nGzje > div:nth-child(3) > div > div.tb_h.ie7Asb.Hr51pb.imso-medium-font.TbbqEc.imso-ani.YPgUJe.B27Eaf > div > ol > li:nth-child(2)'
    );
    await getSecond?.click();
  }
  browser?.close();
  return url;
}
