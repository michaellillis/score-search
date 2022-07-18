import * as puppeteer from 'puppeteer';
import { combine } from './utils';
// import * as styles from './style.css';
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

async function search(page: puppeteer.Page, searchQuery: string) {
  await page.goto('https://www.google.com/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('input[aria-label="Search"]', { visible: true });
  await page.type('input[aria-label="Search"]', searchQuery);
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
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
  const cbs = `${input} cbs sports`;
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.setViewport({
    width: 1000,
    height: 900,
    deviceScaleFactor: 4,
  });
  try {
    await search(page, cbs);
    const yourHref = await page.$eval(
      '#rso > div:nth-child(1) > div > div.NJo7tc.Z26q7c.uUuwM.jGGQ5e > div > a',
      (anchor) => anchor.getAttribute('href')
    );
    if (yourHref !== null) {
      await page.goto(yourHref);
    }
  } catch {
    playing = false;
    url = 'not live';
  }
  if (playing === true) {
    const [button] = await page.$x(
      '/html/body/div[4]/div/main/div[1]/section/div/div[3]/a'
    );
    if (button) {
      await button.click();
      try {
        await page.waitForSelector(
          '#page-content > div.test.gt-react-wrapper > div > div.gametracker-app__tab-links.gametracker-app__tab-links--desktop > div:nth-child(2)',
          {
            visible: true,
          }
        );
        url = await logs(browser);
        const newUrl = url.replace('recap', 'boxscore');
        await page.goto(newUrl);
        await page.addStyleTag({ path: 'style.css' });
        // await page.addStyleTag({
        //   content:
        //     '#hud-container{top: 0px !important;} #mantle_skin{margin-top: 5% !important;} body{font-size: 120% !important;} .atl-container{display: none; }',
        // });
        // let div_selector_to_remove = 'hud-container';
        // await page.evaluate((sel) => {
        //   var elements = document.querySelectorAll(sel);
        //   for (var i = 0; i < elements.length; i++) {
        //     elements[i].parentNode?.removeChild(elements[i]);
        //   }
        // }, div_selector_to_remove);
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
