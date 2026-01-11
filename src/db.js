import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';

const DB_DIR = path.join(os.homedir(), '.tickr');
const DEFAULT_DB_PATH = path.join(DB_DIR, 'tickr.db');

const DB_PATH = process.env.TICKR_DB_PATH || DEFAULT_DB_PATH;

if (!process.env.TICKR_DB_PATH && !fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}


if (process.env.TICKR_DB_PATH) {
  const customDir = path.dirname(process.env.TICKR_DB_PATH);
  if (!fs.existsSync(customDir)) {
    fs.mkdirSync(customDir, { recursive: true });
  }
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');


db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT
  );
  
  CREATE INDEX IF NOT EXISTS idx_project ON sessions(project);
  CREATE INDEX IF NOT EXISTS idx_start_time ON sessions(start_time);
  
  CREATE TABLE IF NOT EXISTS projects (
    name TEXT PRIMARY KEY,
    user_email TEXT,
    client_email TEXT
  );

  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

/**
 * Start a new session for a project.
 * Stops any currently active session first.
 * @param {string} project 
 */
export const startSession = (project) => {
  const now = new Date().toISOString();


  const startTx = db.transaction(() => {

    db.prepare(`
      UPDATE sessions 
      SET end_time = ? 
      WHERE end_time IS NULL
    `).run(now);


    db.prepare(`
      INSERT INTO sessions (project, start_time)
      VALUES (?, ?)
    `).run(project, now);
  });

  startTx();
  return { project, start_time: now };
};

/**
 * Stop any active session.
 * @returns {object|null} The stopped session or null if none active.
 */
export const stopSession = () => {
  const now = new Date().toISOString();

  const result = db.prepare(`
    UPDATE sessions
    SET end_time = ?
    WHERE end_time IS NULL
    RETURNING *
  `).get(now);

  return result;
};


export const getActiveSession = () => {
  return db.prepare(`
    SELECT * FROM sessions WHERE end_time IS NULL
  `).get();
};

/**
 * Get sessions for report.
 * @param {string} dateFrom - ISO string
 * @param {string} dateTo - ISO string
 * @param {string} [project] - optional project filter
 */
export const getSessions = (dateFrom, dateTo, project) => {
  let query = `
    SELECT * FROM sessions 
    WHERE start_time >= ? AND (end_time <= ? OR end_time IS NULL)
  `;
  const params = [dateFrom, dateTo];

  if (project) {
    query += ` AND project = ?`;
    params.push(project);
  }

  query += ` ORDER BY start_time ASC`;

  return db.prepare(query).all(...params);
};

export const upsertProject = (name, userEmail, clientEmail) => {
  db.prepare(`
    INSERT INTO projects (name, user_email, client_email)
    VALUES (?, ?, ?)
    ON CONFLICT(name) DO UPDATE SET
      user_email = excluded.user_email,
      client_email = excluded.client_email
  `).run(name, userEmail, clientEmail);
};

export const getProject = (name) => {
  return db.prepare('SELECT * FROM projects WHERE name = ?').get(name);
};

export const setConfig = (key, value) => {
  db.prepare(`
    INSERT INTO config (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET
      value = excluded.value
  `).run(key, value);
};

export const getConfig = (key) => {
  const row = db.prepare('SELECT value FROM config WHERE key = ?').get(key);
  return row ? row.value : null;
};

export default db;
