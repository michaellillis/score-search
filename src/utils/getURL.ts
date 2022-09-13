import { Browser } from 'puppeteer';
export async function urlToString(browser: Browser): Promise<string> {
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
