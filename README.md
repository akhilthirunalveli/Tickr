<p align="center">
  <img src="public/ad.png" alt="Tickr App"/>
</p>

# Tickr

**Time that adds up.**

Tickr is a CLI-first time-tracking tool designed for freelancers, consultants, and engineers who need accurate, auditable work logs without relying on bloated GUIs. It bridges the gap between your effort and client trust with verifiable time reports.

## Features

- ⏱️ **Precise Time Tracking**: Start and stop work sessions per project.
- 🤝 **Build Trust**: Produce detailed, transparent logs that give clients confidence in your billed hours.
- 🧱 **Immutable Data**: Work sessions are stored securely in a local SQLite database (`~/.tickr/tickr.db`).
- 📊 **Interactive Reporting**: Generate reports filtered by date and project.
- 🖥️ **Terminal Dashboard**: Visual dashboard with real-time stats (`tickr dash`).
- 🍅 **Pomodoro Timer**: Built-in 25-minute focus timer (`tickr pomo`).
- 🧾 **PDF Invoicing**: Generate professional PDF invoices and summaries.
- 🧠 **Smart Logic**: Automatically handles overlapping sessions and ensures data integrity.

<p align="left">
  <img src="public/idea.png" alt="Tickr Idea"/>
</p>

## Installation
```bash
npm install -g tickr-cli
```

### Core Commands

#### Start & Stop
Start tracking time for a project. If another session is active, it stops automatically.
```bash
tickr start <project>   # Start tracking
tickr stop              # Stop tracking
tickr status            # Check current session
```

#### Dashboard
Launch the interactive terminal dashboard to view history and stats.
```bash
tickr dash
```

### Productivity

#### Pomodoro Timer
Start a 25-minute focus session.
```bash
tickr pomo <project>
```

### Reporting & Invoices

#### CLI Report
Generate a text-based summary of time spent.
```bash
tickr report [project]                   # specific project
tickr report --since 2024-01-01          # custom date range
```

#### PDF Summary
Generate a detailed PDF project summary.
```bash
tickr summary <project>
```

#### PDF Invoice
Generate a billable PDF invoice.
```bash
tickr invoice <project> --rate 100       # $100/hr rate
```

## Data Storage
Data is stored in `~/.tickr/tickr.db`.
You can back up this file to save your history.

## Development

Run tests:
```bash
node test/suite.js
```
