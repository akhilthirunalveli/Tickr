import chalk from 'chalk';
import Table from 'cli-table3';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getSessions } from '../db.js';

dayjs.extend(duration);

export const reportCommand = (project, options) => {
    try {
        const since = options.since ? dayjs(options.since).startOf('day') : dayjs().startOf('month');
        const until = options.until ? dayjs(options.until).endOf('day') : dayjs().endOf('day');

        if (!since.isValid() || !until.isValid()) {
            console.error(chalk.red('Invalid date format. Use ISO format (YYYY-MM-DD).'));
            process.exit(1);
        }

        console.log(chalk.blue(`Generating report from ${chalk.bold(since.format('YYYY-MM-DD'))} to ${chalk.bold(until.format('YYYY-MM-DD'))}`));

        const sessions = getSessions(since.toISOString(), until.toISOString(), project);

        if (sessions.length === 0) {
            console.log(chalk.yellow('No sessions found for this period.'));
            return;
        }

        const reportData = {};
        let totalDurationMs = 0;

        sessions.forEach(session => {


            const sessionStart = dayjs(session.start_time);
            const sessionEnd = session.end_time ? dayjs(session.end_time) : dayjs();

            const effectiveStart = sessionStart.isBefore(since) ? since : sessionStart;
            const effectiveEnd = sessionEnd.isAfter(until) ? until : sessionEnd;

            if (effectiveEnd.isBefore(effectiveStart)) return;

            const durationMs = effectiveEnd.diff(effectiveStart);
            totalDurationMs += durationMs;

            if (!reportData[session.project]) {
                reportData[session.project] = 0;
            }
            reportData[session.project] += durationMs;
        });

        const table = new Table({
            head: [chalk.cyan('Project'), chalk.cyan('Time Spent')],
            colWidths: [30, 20]
        });

        Object.entries(reportData).forEach(([proj, ms]) => {
            const dur = dayjs.duration(ms);

            const hours = Math.floor(dur.asHours());
            const minutes = dur.minutes();
            const seconds = dur.seconds();
            const timeStr = `${hours}h ${minutes}m ${seconds}s`;

            table.push([proj, timeStr]);
        });


        const totalDur = dayjs.duration(totalDurationMs);
        const totalHours = Math.floor(totalDur.asHours());
        const totalMinutes = totalDur.minutes();
        const totalSeconds = totalDur.seconds();
        table.push([chalk.bold('TOTAL'), chalk.bold(`${totalHours}h ${totalMinutes}m ${totalSeconds}s`)]);

        console.log(table.toString());

    } catch (error) {
        console.error(chalk.red('Failed to generate report:'), error.message);
        process.exit(1);
    }
};
