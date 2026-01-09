import blessed from 'blessed';
import contrib from 'blessed-contrib';
import chalk from 'chalk';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import { getActiveSession, getSessions } from '../db.js';

dayjs.extend(duration);

export const dashCommand = () => {
    const screen = blessed.screen({
        smartCSR: true,
        title: 'Tickr Dashboard'
    });

    const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });


    const activeBox = grid.set(0, 0, 4, 6, blessed.box, {
        label: 'Active Session',
        content: 'Loading...',
        style: { border: { fg: 'cyan' }, header: { fg: 'white', bold: true } },
        tags: true
    });


    const bar = grid.set(0, 6, 6, 6, contrib.bar, {
        label: 'Time per Project (This Month)',
        barWidth: 8,
        barSpacing: 2,
        xOffset: 0,
        maxHeight: 9
    });


    const table = grid.set(4, 0, 8, 6, contrib.table, {
        keys: true,
        fg: 'white',
        selectedFg: 'white',
        selectedBg: 'blue',
        interactive: true,
        label: 'Recent Sessions',
        width: '30%',
        height: '30%',
        border: { type: "line", fg: "cyan" },
        columnSpacing: 10,
        columnWidth: [20, 10, 10]
    });


    const logBox = grid.set(6, 6, 6, 6, blessed.log, {
        fg: "green",
        selectedFg: "green",
        label: 'Log / Tips'
    });

    logBox.log(chalk.yellow('Welcome to Tickr Dashboard!'));
    logBox.log('Press q or C-c to exit.');


    const refreshData = () => {

        const session = getActiveSession();
        if (session) {
            const start = dayjs(session.start_time);
            const now = dayjs();
            const diff = dayjs.duration(now.diff(start));
            const timeStr = `${Math.floor(diff.asHours())}h ${diff.minutes()}m ${diff.seconds()}s`;

            activeBox.setContent(`{center}
{bold}${session.project}{/bold}

{green-fg}${timeStr}{/green-fg}
{/center}`);
        } else {
            activeBox.setContent(`{center}
No active session.
Run {bold}tickr start <project>{/bold}
{/center}`);
        }


        const sessions = getSessions(dayjs().subtract(7, 'day').toISOString(), dayjs().add(10, 'day').toISOString());

        const recent = sessions.slice(-15).reverse().map(s => {
            const start = dayjs(s.start_time);
            const end = s.end_time ? dayjs(s.end_time) : dayjs();
            const dur = dayjs.duration(end.diff(start));
            const durStr = `${Math.floor(dur.asHours())}h ${dur.minutes()}m`;
            return [s.project, start.format('MM-DD HH:mm'), durStr];
        });
        table.setData({ headers: ['Project', 'Start', 'Duration'], data: recent });


        const monthStart = dayjs().startOf('month').toISOString();
        const monthSessions = getSessions(monthStart, dayjs().endOf('day').toISOString());
        const totals = {};
        monthSessions.forEach(s => {
            const start = dayjs(s.start_time);
            const end = s.end_time ? dayjs(s.end_time) : dayjs();
            const dur = end.diff(start);
            totals[s.project] = (totals[s.project] || 0) + dur;
        });

        const titles = Object.keys(totals);
        const data = Object.values(totals).map(ms => Math.round(ms / (1000 * 60 * 60))); // hours

        if (titles.length > 0) {
            bar.setData({ titles: titles, data: data });
        }

        screen.render();
    };


    refreshData();
    const interval = setInterval(refreshData, 1000);


    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        clearInterval(interval);
        return process.exit(0);
    });


    screen.on('resize', function () {
        bar.emit('attach');
        table.emit('attach');
        activeBox.emit('attach');
        logBox.emit('attach');
    });

    screen.render();
};
