import chalk from 'chalk';
import { upsertProject, getProject } from '../db.js';

export const projectCommand = (name, options) => {
    try {
        if (!name) {
            console.error(chalk.red('Project name is required.'));
            process.exit(1);
        }

        const existing = getProject(name);

        // If updating
        if (options.userEmail || options.clientEmail) {
            const userEmail = options.userEmail || (existing ? existing.user_email : null);
            const clientEmail = options.clientEmail || (existing ? existing.client_email : null);

            upsertProject(name, userEmail, clientEmail);
            console.log(chalk.green(`Project '${name}' configuration updated.`));
        } else {
            // Display info
            if (existing) {
                console.log(chalk.cyan(`Project: ${chalk.bold(name)}`));
                console.log(`User Email: ${existing.user_email || '(not set)'}`);
                console.log(`Client Email: ${existing.client_email || '(not set)'}`);
            } else {
                console.log(chalk.yellow(`No configuration found for project '${name}'.`));
                console.log('Use --user-email and --client-email to configure.');
            }
        }

    } catch (error) {
        console.error(chalk.red('Failed to manage project:'), error.message);
        process.exit(1);
    }
};
