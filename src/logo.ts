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

import path from 'path';
import fs from 'fs/promises';

export class Logo {
	private static shown: boolean;
	static async show(): Promise<void> {
		if (!this.shown) {
			this.shown = true;
			const logo: string = await fs.readFile(
				path.join(__dirname, '..', 'LOGO'),
				'utf8'
			);
			console.error(logo);
		}
	}
}
