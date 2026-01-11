import nodemailer from 'nodemailer';
import { getConfig } from '../db.js';
import chalk from 'chalk';

export const sendEmail = async (to, subject, text, attachments = []) => {
    const host = getConfig('smtp_host');
    const port = getConfig('smtp_port');
    const user = getConfig('smtp_user');
    const pass = getConfig('smtp_pass');

    if (!host || !user || !pass) {
        console.log(chalk.yellow('SMTP not configured. Skipping email send.'));
        console.log(chalk.gray('Run "tickr config" to set up email sending.'));
        return false;
    }

    const transporter = nodemailer.createTransport({
        host,
        port: port ? parseInt(port) : 587,
        secure: parseInt(port) === 465,
        auth: {
            user,
            pass
        }
    });

    try {
        console.log(chalk.blue(`Sending email to ${to}...`));
        await transporter.sendMail({
            from: user,
            to,
            subject,
            text,
            attachments
        });
        console.log(chalk.green(`Email sent successfully.`));
        return true;
    } catch (error) {
        console.error(chalk.red('Failed to send email:'), error.message);
        return false;
    }
};
