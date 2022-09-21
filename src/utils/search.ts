import { Page } from 'puppeteer';
import { Browser } from 'puppeteer';
export async function search(
  browser: Browser,
  page: Page,
  searchQuery: string
) {
  await page.goto('https://www.google.com/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('input[aria-label="Search"]', { visible: true });
  await page.type('input[aria-label="Search"]', searchQuery);
  await page.setGeolocation({ latitude: 89.3985, longitude: 40.6331 });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://www.google.com/', ['geolocation']);
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
}
