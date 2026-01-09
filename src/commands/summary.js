import PDFDocument from 'pdfkit';
import fs from 'fs';
import chalk from 'chalk';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getSessions } from '../db.js';

dayjs.extend(duration);

export const summaryCommand = (project, options) => {
    try {
        if (!project) {
            console.error(chalk.red('Error: Project is required.'));
            process.exit(1);
        }

        const since = options.since ? dayjs(options.since).startOf('day') : dayjs().startOf('month');
        const until = options.until ? dayjs(options.until).endOf('day') : dayjs().endOf('day');

        console.log(chalk.blue(`Generating summary for ${chalk.bold(project)}...`));


        const sessions = getSessions(since.toISOString(), until.toISOString(), project);
        let totalMs = 0;
        sessions.forEach(s => {
            const start = dayjs(s.start_time);
            const end = s.end_time ? dayjs(s.end_time) : dayjs();
            const effStart = start.isBefore(since) ? since : start;
            const effEnd = end.isAfter(until) ? until : end;
            if (effStart.isBefore(effEnd)) {
                totalMs += effEnd.diff(effStart);
            }
        });

        const totalHours = totalMs / (1000 * 60 * 60);


        const doc = new PDFDocument();
        const filename = `Summary_${project}_${dayjs().format('YYYYMMDD')}.pdf`;
        doc.pipe(fs.createWriteStream(filename));


        doc.fontSize(25).text('PROJECT SUMMARY', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Project: ${project}`);
        doc.text(`Generated: ${dayjs().format('YYYY-MM-DD HH:mm')}`);
        doc.text(`Period: ${since.format('YYYY-MM-DD')} to ${until.format('YYYY-MM-DD')}`);
        doc.moveDown();


        doc.fontSize(14).text('Overview', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Total Sessions: ${sessions.length}`);
        doc.text(`Total Hours: ${totalHours.toFixed(2)} hrs`);

        doc.moveDown();


        doc.addPage();
        doc.fontSize(14).text('Session Log', { underline: true });
        doc.moveDown(0.5);

        doc.fontSize(10);

        const startX = 50;
        let currentY = doc.y;

        doc.text('Date', startX, currentY);
        doc.text('Start Time', startX + 100, currentY);
        doc.text('Duration', startX + 200, currentY);
        doc.moveDown();

        sessions.forEach(s => {
            if (doc.y > 700) doc.addPage();

            const start = dayjs(s.start_time);
            const end = s.end_time ? dayjs(s.end_time) : dayjs();
            const dur = dayjs.duration(end.diff(start));

            currentY = doc.y;
            doc.text(start.format('YYYY-MM-DD'), startX, currentY);
            doc.text(start.format('HH:mm:ss'), startX + 100, currentY);
            doc.text(`${Math.floor(dur.asHours())}h ${dur.minutes()}m`, startX + 200, currentY);
            doc.moveDown();
        });

        doc.end();

        console.log(chalk.green(`Summary report saved to ${chalk.bold(filename)}`));

    } catch (error) {
        console.error(chalk.red('Failed to generate summary:'), error.message);
        process.exit(1);
    }
};
