/*
	Copyright (C) 2022 <alpheratz99@protonmail.com>

	This program is free software; you can redistribute it and/or modify it under
	the terms of the GNU General Public License version 2 as published by the
	Free Software Foundation.

	This program is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
	FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along with
	this program; if not, write to the Free Software Foundation, Inc., 59 Temple
	Place, Suite 330, Boston, MA 02111-1307 USA

*/

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
