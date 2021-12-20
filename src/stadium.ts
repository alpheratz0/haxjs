export class Stadium {
	static isValid(stadiumFileContents: string): boolean {
		try {
			const output = JSON.parse(stadiumFileContents);
			if (output && typeof output === 'object') {
				return true;
			}
		} catch (err) {
			return false;
		}

		return false;
	}
}
