#!/usr/bin/env node

import { Command } from 'commander';
import { startCommand } from '../src/commands/start.js';
import { stopCommand } from '../src/commands/stop.js';
import { reportCommand } from '../src/commands/report.js';
import { statusCommand } from '../src/commands/status.js';
import { pomoCommand } from '../src/commands/pomo.js';
import { summaryCommand } from '../src/commands/summary.js';
import { invoiceCommand } from '../src/commands/invoice.js';
import { dashCommand } from '../src/commands/dash.js';
import { configCommand } from '../src/commands/config.js';
import { projectCommand } from '../src/commands/project.js';

const program = new Command();

program
    .name('tickr')
    .description('A CLI-first time-tracking tool')
    .version('1.0.0');

program.command('start')
    .description('Start tracking time for a project')
    .argument('[project]', 'Project name')
    .action((project) => {
        startCommand(project);
    });

program.command('stop')
    .description('Stop tracking time')
    .action(() => {
        stopCommand();
    });

program.command('report')
    .description('Generate time report')
    .argument('[project]', 'Filter by project name')
    .option('--since <date>', 'Start date (YYYY-MM-DD)')
    .option('--until <date>', 'End date (YYYY-MM-DD)')
    .action((project, options) => {
        reportCommand(project, options);
    });

program.command('status')
    .description('Show current status')
    .option('--format <format>', 'Output format (json)')
    .action((options) => {
        statusCommand(options);
    });

program.command('pomo')
    .description('Start a Pomodoro session (25m)')
    .argument('<project>', 'Project name')
    .action((project) => {
        pomoCommand(project);
    });

program.command('summary')
    .description('Generate Project Summary PDF')
    .argument('<project>', 'Project name')
    .option('--since <date>', 'Start date')
    .option('--until <date>', 'End date')
    .action((project, options) => {
        summaryCommand(project, options);
    });

program.command('invoice')
    .description('Generate Invoice PDF')
    .argument('<project>', 'Project name')
    .option('--rate <number>', 'Hourly rate')
    .option('--since <date>', 'Start date')
    .option('--until <date>', 'End date')
    .action(async (project, options) => {
        await invoiceCommand(project, options);
    });

program.command('dash')
    .description('Open interactive dashboard')
    .action(() => {
        dashCommand();
    });

program.command('config')
    .description('Configure global settings (SMTP)')
    .option('--host <host>', 'SMTP Host')
    .option('--port <port>', 'SMTP Port')
    .option('--user <user>', 'SMTP User')
    .option('--pass <pass>', 'SMTP Password')
    .action((options) => {
        configCommand(options);
    });

program.command('project')
    .description('Manage project settings')
    .argument('<name>', 'Project name')
    .option('--user-email <email>', 'User Email')
    .option('--client-email <email>', 'Client Email')
    .action((name, options) => {
        projectCommand(name, options);
    });

program.parse();
