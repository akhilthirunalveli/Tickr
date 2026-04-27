import chalk from 'chalk';
import { addNoteToActive, getActiveSession } from '../db.js';

export const logCommand = (note, options) => {
    try {
        const session = getActiveSession();

        if (!session) {
            console.log(chalk.yellow('No active session. Start one with ') + chalk.cyan('tickr start <project>'));
            return;
        }

        if (!note) {
            // Display current notes for the active session
            console.log(chalk.cyan(`Active: ${chalk.bold(session.project)}`));

            if (session.notes) {
                console.log(chalk.gray('\nNotes:'));
                session.notes.split('\n').forEach((n, i) => {
                    console.log(chalk.white(`  ${i + 1}. ${n}`));
                });
            } else {
                console.log(chalk.gray('No notes yet. Add one with: tickr log "your note"'));
            }

            if (session.tags) {
                console.log(chalk.gray('\nTags: ') + session.tags.split(',').map(t => chalk.yellow(`[${t.trim()}]`)).join(' '));
            }

            return;
        }

        const tag = options.tag || null;
        const updated = addNoteToActive(note, tag);

        if (!updated) {
            console.log(chalk.yellow('No active session found.'));
            return;
        }

        console.log(chalk.green(`✓ Note added to ${chalk.bold(updated.project)}`));
        console.log(chalk.gray(`  "${note}"`));

        if (tag) {
            console.log(chalk.gray(`  Tag: `) + chalk.yellow(`[${tag}]`));
        }

    } catch (error) {
        console.error(chalk.red('Failed to add note:'), error.message);
        process.exit(1);
    }
};
