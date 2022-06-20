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

import chalk from 'chalk';

export class Logger {
	private static lastMessage: string;

	static begin(message: string): void {
		this.lastMessage = message;
		process.stderr.write(chalk.yellow('\u001B[?25lIN PROGRESS ') + message);
	}

	static end(failed: boolean = false): void {
		process.stderr.cursorTo(0);
		process.stderr.write(
			(failed ? chalk.red('FAILED ') : chalk.green('DONE ')) +
				this.lastMessage +
				'          \n\u001B[?25h'
		);
	}
}
