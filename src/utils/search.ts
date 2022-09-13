import { Page } from 'puppeteer';
export async function search(page: Page, searchQuery: string) {
  await page.goto('https://www.google.com/', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('input[aria-label="Search"]', { visible: true });
  await page.type('input[aria-label="Search"]', searchQuery);
  await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
}
