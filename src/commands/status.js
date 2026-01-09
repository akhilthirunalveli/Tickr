import chalk from 'chalk';
import { getActiveSession } from '../db.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);

export const statusCommand = (options) => {
    try {
        const session = getActiveSession();

        if (options.format === 'json') {
            console.log(JSON.stringify(session || null));
            return;
        }

        if (!session) {
            console.log(chalk.gray('No active session.'));
            return;
        }

        const start = dayjs(session.start_time);
        const now = dayjs();
        const diff = dayjs.duration(now.diff(start));

        const hours = Math.floor(diff.asHours());
        const minutes = diff.minutes();
        const seconds = diff.seconds();

        console.log(`Tracking ${chalk.cyan(chalk.bold(session.project))} for ${chalk.bold(`${hours}h ${minutes}m ${seconds}s`)}`);

    } catch (error) {
        console.error(chalk.red('Failed to get status:'), error.message);
        process.exit(1);
    }
};
