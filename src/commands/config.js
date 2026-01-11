import chalk from 'chalk';
import { setConfig, getConfig } from '../db.js';

export const configCommand = (options) => {
    try {
        if (options.host) setConfig('smtp_host', options.host);
        if (options.port) setConfig('smtp_port', options.port);
        if (options.user) setConfig('smtp_user', options.user);
        if (options.pass) setConfig('smtp_pass', options.pass);

        if (Object.keys(options).length > 0) {
            console.log(chalk.green('Configuration updated successfully.'));
        } else {
            const host = getConfig('smtp_host');
            const port = getConfig('smtp_port');
            const user = getConfig('smtp_user');

            console.log(chalk.cyan('Current Configuration:'));
            console.log(`SMTP Host: ${host || '(not set)'}`);
            console.log(`SMTP Port: ${port || '(not set)'}`);
            console.log(`SMTP User: ${user || '(not set)'}`);
            console.log(`SMTP Pass: ******`);
        }
    } catch (error) {
        console.error(chalk.red('Failed to update configuration:'), error.message);
        process.exit(1);
    }
};
