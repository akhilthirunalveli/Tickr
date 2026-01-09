# Tickr

**Time that adds up.**

Tickr is a CLI-first time-tracking tool designed for freelancers, consultants, and engineers who need accurate, auditable work logs without relying on bloated GUIs.

## Features

- ⏱️ **Precise Time Tracking**: Start and stop work sessions per project.
- 🧱 **Immutable Data**: Work sessions are stored securely in a local SQLite database (`~/.tickr/tickr.db`).
- 📊 **Interactive Reporting**: Generate reports filtered by date and project.
- 🧠 **Smart Logic**: Automatically handles overlapping sessions and ensures data integrity.

## Installation

### Prerequisites
- Node.js (v14 or higher)

### From Source
1. Clone the repository:
   ```bash
   git clone https://github.com/akhilthirunalveli/Tickr.git
   cd Tickr
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Link the CLI globally (optional):
   ```bash
   npm link
   ```
   Now you can use `tickr` anywhere in your terminal.

## Usage

### Start Tracking
Start a timer for a specific project. If another session is active, it will be stopped automatically.
```bash
tickr start <project_name>
# Example
tickr start client-website
```

### Stop Tracking
Stop the current active session.
```bash
tickr stop
```

### Reporting
Generate a summary of time spent.
```bash
# Total time for all projects this month
tickr report

# Specific project
tickr report client-website

# Custom date range
tickr report --since 2024-02-01 --until 2024-02-15
```

## Data Storage
Data is stored in `~/.tickr/tickr.db`.
You can back up this file to save your history.

## Development

Run tests:
```bash
node test/suite.js
```
