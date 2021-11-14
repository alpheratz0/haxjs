import puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';

export class BigBrowser {
    private static browser: Browser;
    private static pageCount: number = 0;

    public static async getNewPage(): Promise<Page> {
        this.pageCount++;

        /* just start the browser once */
        if (this.browser == null) {
            this.browser = await puppeteer.launch({
                headless: true
            });
        }

        return this.pageCount == 1
            ? (await this.browser.pages())[0]
            : await this.browser.newPage();
    }
}
