import PDFDocument from 'pdfkit';
import fs from 'fs';
import chalk from 'chalk';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getSessions, getProject } from '../db.js';
import { sendEmail } from '../utils/email.js';
import { askConfirmation } from '../utils/ui.js';
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
        const writeStream = fs.createWriteStream(filename);
        doc.pipe(writeStream);


        doc.fontSize(25).text('INVOICE', 50, doc.y);
        doc.moveDown();

        doc.fontSize(12).text(`Project: ${project}`);
        doc.text(`Date: ${dayjs().format('YYYY-MM-DD')}`);
        doc.text(`Period: ${since.format('YYYY-MM-DD')} to ${until.format('YYYY-MM-DD')}`);
        doc.moveDown();


        const headerY = doc.y;
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Description', 50, headerY, { width: 260 });
        doc.text('Hours', 320, headerY);
        doc.text('Rate', 390, headerY);
        doc.text('Amount', 460, headerY);

        doc.moveDown(0.5);
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#cccccc');
        doc.moveDown(0.5);

        doc.font('Helvetica').fontSize(10);

        // Generate itemized line items from sessions with notes
        let itemCount = 0;
        sessions.forEach(s => {
            const start = dayjs(s.start_time);
            const end = s.end_time ? dayjs(s.end_time) : dayjs();

            const effStart = start.isBefore(since) ? since : start;
            const effEnd = end.isAfter(until) ? until : end;
            if (!effStart.isBefore(effEnd)) return;

            const sessionMs = effEnd.diff(effStart);
            const sessionHours = sessionMs / (1000 * 60 * 60);
            const sessionAmount = sessionHours * rate;

            // Build description from notes/tags
            let description = s.notes ? s.notes.split('\n')[0] : `Work session — ${start.format('MMM DD')}`;
            if (description.length > 45) description = description.substring(0, 42) + '...';
            if (s.tags) description += ` [${s.tags}]`;

            const rowY = doc.y;
            doc.text(description, 50, rowY, { width: 260 });
            doc.text(sessionHours.toFixed(2), 320, rowY);
            doc.text(`${currency.symbol}${rate}`, 390, rowY);
            doc.text(`${currency.symbol}${sessionAmount.toFixed(2)}`, 460, rowY);
            doc.moveDown(0.8);
            itemCount++;
        });

        if (itemCount === 0) {
            const rowY = doc.y;
            doc.text(`Development Services - ${project}`, 50, rowY, { width: 260 });
            doc.text(totalHours.toFixed(2), 320, rowY);
            doc.text(`${currency.symbol}${rate}`, 390, rowY);
            doc.text(`${currency.symbol}${amount.toFixed(2)}`, 460, rowY);
            doc.moveDown();
        }

        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#cccccc');
        doc.moveDown();

        doc.fontSize(14).font('Helvetica-Bold').text(`Total Due: ${currency.symbol}${amount.toFixed(2)}`, 50, doc.y, { align: 'left' });

        doc.end();

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        console.log(chalk.green(`Invoice saved to ${chalk.bold(filename)}`));

        // Send Email
        const projDetails = getProject(project);
        if (projDetails && (projDetails.user_email || projDetails.client_email)) {
            const recipients = [projDetails.user_email, projDetails.client_email].filter(Boolean);

            if (recipients.length > 0) {
                const shouldSend = await askConfirmation(`Send email to ${recipients.join(', ')}?`);
                if (shouldSend) {
                    await sendEmail(
                        recipients.join(','),
                        `Invoice: ${project}`,
                        `Please find attached the invoice for project ${project}.\n\nPeriod: ${since.format('YYYY-MM-DD')} to ${until.format('YYYY-MM-DD')}\nAmount Due: ${currency.symbol}${amount.toFixed(2)}`,
                        [{ filename, path: filename }]
                    );
                } else {
                    console.log(chalk.gray('Email sending skipped.'));
                }
            }
        }

    } catch (error) {
        console.error(chalk.red('Failed to generate invoice:'), error.message);
        process.exit(1);
    }
};
