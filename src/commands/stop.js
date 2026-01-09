import chalk from 'chalk';
import { stopSession } from '../db.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';

dayjs.extend(duration);

export const stopCommand = () => {
    try {
        const session = stopSession();

        if (!session) {
            console.log(chalk.yellow('No active session found.'));
            return;
        }

        const start = dayjs(session.start_time);
        const end = dayjs(session.end_time);
        const diff = dayjs.duration(end.diff(start));

        console.log(chalk.green(`Stopped tracking for project: ${chalk.bold(session.project)}`));
        console.log(chalk.gray(`Duration: ${diff.format('HH:mm:ss')}`));
    } catch (error) {
        console.error(chalk.red('Failed to stop session:'), error.message);
        process.exit(1);
    }
};
