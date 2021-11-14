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
