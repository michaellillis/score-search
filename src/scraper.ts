import * as puppeteer from 'puppeteer';

async function scrape(input: string): Promise<void> {
    let browser: puppeteer.Browser;
    (async () => {
      const searchQuery = input;
    
      browser = await puppeteer.launch();
      const [page] = await browser.pages();
      await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
      await page.waitForSelector('input[aria-label="Search"]', {visible: true});
      await page.type('input[aria-label="Search"]', searchQuery);
      await Promise.all([
        page.waitForNavigation(),
        page.keyboard.press("Enter"),
      ]);
      const [button] = await page.$x("/html/body/div[7]/div/div[10]/div[1]/div[2]/div[2]/div/div/div[1]/block-component/div/div[1]/div/div/div/div[1]/div/div/div/div/div/div/div[3]");
      if (button) {
          await button.click();
          window.setTimeout(() => 5000);
          await page.screenshot({ 
            path: "./screenshot.png",
            fullPage: true         
          });
      }
    })()
      .catch(err => console.error(err))
      .finally(() => browser?.close())
    ;
}