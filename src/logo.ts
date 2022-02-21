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
