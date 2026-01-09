import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { startSession, getActiveSession } from '../db.js';

const findGitRoot = (dir) => {
    const gitPath = path.join(dir, '.git');
    if (fs.existsSync(gitPath)) return dir;

    const parent = path.dirname(dir);
    if (parent === dir) return null;
    return findGitRoot(parent);
};

export const startCommand = (project) => {
    try {
        if (!project) {
            const gitRoot = findGitRoot(process.cwd());
            if (gitRoot) {
                project = path.basename(gitRoot);
                console.log(chalk.gray(`Auto-detected project from Git: ${chalk.cyan(project)}`));
            } else {
                console.error(chalk.red('Error: Project name is required.'));
                process.exit(1);
            }
        }

        const previousSession = getActiveSession();
        if (previousSession) {
            console.log(chalk.yellow(`Stopping active session for '${previousSession.project}'...`));
        }

        const session = startSession(project);
        console.log(chalk.green(`Started tracking time for project: ${chalk.bold(project)}`));
        console.log(chalk.gray(`Start time: ${new Date(session.start_time).toLocaleString()}`));
    } catch (error) {
        console.error(chalk.red('Failed to start session:'), error.message);
        process.exit(1);
    }
};
