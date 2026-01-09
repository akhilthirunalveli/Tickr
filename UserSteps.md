# How to Use Tickr

Tickr is a CLI-first time tracking tool designed for developers who want to track their work without leaving the terminal.

## Installation

```bash
npm install -g .
# OR
npm link
```

## Core Commands

### 1. Start Tracking
Start a new session for a project. If a session is already running, it will be stopped automatically.

```bash
tickr start <project_name>
# Example
tickr start MyAwesomeApp
```

### 2. Stop Tracking
Stop the current active session.

```bash
tickr stop
```

### 3. Check Status
See what project you are currently tracking and how long the session has been running.

```bash
tickr status
```

### 4. Dashboard (Interactive)
Launch a terminal-based dashboard with real-time stats, graphs, and session history.

```bash
tickr dash
```
*Press `q` or `Ctrl+C` to exit the dashboard.*

## Reporting & Invoicing

### Text Report
Generate a simple text report of your time usage.

```bash
tickr report [project_name]
# Options:
# --since <date>   Start date (YYYY-MM-DD)
# --until <date>   End date (YYYY-MM-DD)
```

### Project Summary (PDF)
Generate a PDF summary of work done, suitable for internal reviews or standups.

```bash
tickr summary MyAwesomeApp <project_name>
```

### Generate Invoice (PDF)
Create a billable PDF invoice for a client.

```bash
tickr invoice <project_name> --rate <hourly_rate>
# Example ($100/hr)
tickr invoice MyAwesomeApp --rate 100
```

## Productivity Tools

### Pomodoro Timer
Start a simplified 25-minute focus session for a project.

```bash
tickr pomo <project_name>
```

## Data Location
Your data is stored locally in a SQLite database located at `~/.tickr/tickr.db`.
