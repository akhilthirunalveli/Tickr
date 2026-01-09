import chalk from 'chalk';
import { startCommand } from './start.js';

export const pomoCommand = async (project) => {

    console.log(chalk.bold('🍅 Starting Pomodoro Session (25 minutes)'));
    startCommand(project);


    const workDurationMinutes = 25;
    const workDurationMs = workDurationMinutes * 60 * 1000;
    const endTime = Date.now() + workDurationMs;

    const timer = setInterval(() => {
        const remaining = endTime - Date.now();

        if (remaining <= 0) {
            clearInterval(timer);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.log(chalk.green.bold('\n Pomodoro Complete! Take a 5 minute break.'));
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.yellow(`Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`));
    }, 1000);
};
