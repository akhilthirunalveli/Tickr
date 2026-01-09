import PDFDocument from 'pdfkit';
import fs from 'fs';
import chalk from 'chalk';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getSessions } from '../db.js';
import readline from 'readline';

dayjs.extend(duration);

const selectCurrency = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(chalk.yellow('\nSelect Currency:'));
        console.log('1. USD ($)');
        console.log('2. INR (Rs.)');

        rl.question(chalk.green('Enter choice (1/2): '), (answer) => {
            rl.close();
            if (answer.trim() === '2') {
                resolve({ symbol: 'Rs.', code: 'INR' });
            } else {
                resolve({ symbol: '$', code: 'USD' });
            }
        });
    });
};

export const invoiceCommand = async (project, options) => {
    try {
        if (!project) {
            console.error(chalk.red('Error: Project is required for invoicing.'));
            process.exit(1);
        }

        const rate = options.rate ? parseFloat(options.rate) : 0;
        const since = options.since ? dayjs(options.since).startOf('day') : dayjs().startOf('month');
        const until = options.until ? dayjs(options.until).endOf('day') : dayjs().endOf('day');

        console.log(chalk.blue(`Generating invoice for ${chalk.bold(project)}...`));

        const currency = await selectCurrency();
        console.log(chalk.gray(`Selected currency: ${currency.code} (${currency.symbol})`));


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
        const amount = totalHours * rate;


        const doc = new PDFDocument();
        const filename = `Invoice_${project}_${dayjs().format('YYYYMMDD')}.pdf`;
        doc.pipe(fs.createWriteStream(filename));


        doc.fontSize(25).text('INVOICE', 50, doc.y);
        doc.moveDown();

        doc.fontSize(12).text(`Project: ${project}`);
        doc.text(`Date: ${dayjs().format('YYYY-MM-DD')}`);
        doc.text(`Period: ${since.format('YYYY-MM-DD')} to ${until.format('YYYY-MM-DD')}`);
        doc.moveDown();


        const headerY = doc.y;
        doc.fontSize(14).text('Description', 50, headerY, { width: 300 });
        doc.text('Hours', 350, headerY);
        doc.text('Rate', 420, headerY);
        doc.text('Total', 490, headerY);

        doc.moveDown();
        doc.underline(50, doc.y, 500, 2);
        doc.moveDown();

        const rowY = doc.y;
        doc.fontSize(12).text(`Development Services - ${project}`, 50, rowY, { width: 300 });
        doc.text(totalHours.toFixed(4), 350, rowY);
        doc.text(totalHours.toFixed(4), 350, rowY);
        doc.text(`${currency.symbol}${rate}`, 420, rowY);
        doc.text(`${currency.symbol}${amount.toFixed(2)}`, 490, rowY);

        doc.moveDown();
        doc.moveDown();

        doc.fontSize(16).text(`Total Due: ${currency.symbol}${amount.toFixed(2)}`, 50, doc.y, { align: 'left' });

        doc.end();

        console.log(chalk.green(`Invoice saved to ${chalk.bold(filename)}`));

    } catch (error) {
        console.error(chalk.red('Failed to generate invoice:'), error.message);
        process.exit(1);
    }
};
