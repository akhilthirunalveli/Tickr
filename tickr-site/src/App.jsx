import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

/* ===== UTILITIES ===== */
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const useCopy = (text) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = async () => { 
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };
  return [copied, copy];
};

const CopyIcon = ({ copied }) => (
  <AnimatePresence mode='wait'>
    {copied ? (
      <motion.svg key="c" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ color: '#a6e3a1' }}>
        <polyline points="20 6 9 17 4 12" />
      </motion.svg>
    ) : (
      <motion.svg key="p" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </motion.svg>
    )}
  </AnimatePresence>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.21.66-.47 0-.23-.01-.93-.01-1.65-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.523-4.477-10-10-10z" /></svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7.8H7.8" /></svg>
);

const CodeBlock = ({ code }) => {
  const [copied, copy] = useCopy(code);
  return (
    <div className="code-block-wrapper">
      <pre><code>{code}</code></pre>
      <button className="code-copy-btn" onClick={copy} aria-label={copied ? "Copied" : "Copy code"} title="Copy">
        {copied
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        }
      </button>
    </div>
  );
};

/* ===== TERMINAL VISUAL (Hero) ===== */
const TerminalVisual = () => (
  <div className="terminal-visual">
    <div className="terminal-header">
      <div className="dot red" /><div className="dot yellow" /><div className="dot green" />
      <span className="terminal-header-title">tickr dash</span>
    </div>
    <div className="terminal-body tui-mode">
      <div className="tui-grid">
        <div className="tui-panel">
          <div className="tui-title">Active Session</div>
          <div className="tui-content centered">
            <div style={{ fontWeight: 'bold', color: 'white' }}>client-website</div>
            <div style={{ color: '#a6e3a1', marginTop: '0.5rem' }}>2h 34m 12s</div>
            <div style={{ color: '#8a8a96', marginTop: '0.5rem', fontSize: '0.85em' }}>Fixed responsive layout...</div>
            <div style={{ color: '#f9e2af', fontSize: '0.85em' }}>[bugfix]</div>
          </div>
        </div>
        <div className="tui-panel">
          <div className="tui-title">Time per Project (This Month)</div>
          <div className="tui-content">
            <div className="bar-row"><span>healthscript-pro</span><div className="bar-visual" style={{ width: '20%' }} /><span className="bar-val">12%</span></div>
          </div>
        </div>
        <div className="tui-panel">
          <div className="tui-title">Recent Sessions</div>
          <div className="tui-content table-view">
            <div className="table-header"><span>Project</span><span>Start</span><span>Duration</span></div>
            <div className="table-row active"><span>healthscript-pro</span><span>01-09 22:50</span><span>25m 10s</span></div>
          </div>
        </div>
        <div className="tui-panel">
          <div className="tui-title">Log / Tips</div>
          <div className="tui-content">
            <div className="yellow">Welcome to Tickr Dashboard!</div>
            <div className="green">Press q or C-c to exit.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ===== SECTION: HOW IT WORKS ===== */
const HowItWorks = () => (
  <section className="section bg-white">
    <div className="container">
      <FadeIn>
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Three commands. That's it.</h2>
        <p className="section-desc">No setup wizards, no dashboards to configure. Install Tickr, and start tracking time in under 10 seconds.</p>
      </FadeIn>
      <div className="steps-grid">
        {[
          { n: '1', color: 'coral', title: 'Start a session', cmd: 'tickr start MyProject', desc: 'Tell Tickr what you\'re working on. It begins tracking immediately.' },
          { n: '2', color: 'amber', title: 'Do your work', cmd: 'tickr status', desc: 'Stay in your flow. Check elapsed time anytime without switching windows.' },
          { n: '3', color: 'teal', title: 'Get paid', cmd: 'tickr invoice MyProject', desc: 'Generate a PDF invoice or time report. Know exactly how much to bill.' },
        ].map((step, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="step-card">
              <div className={`step-number ${step.color}`}>{step.n}</div>
              <h3>{step.title}</h3>
              <div className="step-cmd">{step.cmd}</div>
              <p>{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ===== SECTION: LIVE DEMO ===== */
const DemoTerminal = () => {
  const lines = [
    { prompt: '~', command: 'tickr start client-website' },
    { output: '', success: '✓ Timer started for "client-website"' },
    { output: '', info: '  Tracking since 09:15 AM' },
    { output: '' },
    { prompt: '~', command: 'tickr log "Fixed checkout layout" --tag bugfix' },
    { output: '', success: '✓ Note added to client-website' },
    { output: '' },
    { prompt: '~', command: 'tickr status' },
    { output: '', info: '  ● client-website' },
    { output: '', time: '  ⏱  2h 34m 12s' },
    { output: '' },
    { prompt: '~', command: 'tickr stop' },
    { output: '', success: '✓ Session saved. Duration: 2h 34m 12s' },
  ];

  return (
    <section className="section demo-section">
      <div className="container">
        <FadeIn>
          <div className="section-label">See It In Action</div>
          <h2 className="section-title">A real workflow, start to finish</h2>
          <p className="section-desc">From starting a timer to generating an invoice — everything happens in your terminal.</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="demo-terminal">
            <div className="terminal-header">
              <div className="dot red" /><div className="dot yellow" /><div className="dot green" />
              <span className="terminal-header-title">~/projects</span>
            </div>
            <div className="terminal-body">
              {lines.map((line, i) => (
                <div className="demo-line" key={i}>
                  {line.prompt && <><span className="prompt">{line.prompt} $ </span><span className="command">{line.command}</span></>}
                  {line.success && <span className="success">{line.success}</span>}
                  {line.info && <span className="info">{line.info}</span>}
                  {line.time && <span className="time">{line.time}</span>}
                  {line.flag && <span className="flag">{line.flag}</span>}
                  {!line.prompt && !line.success && !line.info && !line.time && !line.flag && <span>&nbsp;</span>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

/* ===== SECTION: STATS ===== */
const StatsSection = () => (
  <section className="section">
    <div className="container">
      <FadeIn>
        <div className="section-label">Built Different</div>
        <h2 className="section-title">Lightweight by design</h2>
        <p className="section-desc">No Electron wrapper. No cloud dependency. Just a fast Node.js binary that respects your machine.</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="stats-row">
          {[
            { value: '~10MB', label: 'Memory usage', color: 'coral' },
            { value: '<1ms', label: 'Command response', color: 'teal' },
            { value: '0', label: 'Cloud dependencies', color: 'amber' },
            { value: '∞', label: 'Data ownership', color: 'indigo' },
          ].map((s, i) => (
            <motion.div className="stat-card" key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className={`stat-value ${s.color}`}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ===== SECTION: FEATURES BENTO ===== */
const FeaturesSection = () => (
  <section className="section bg-white">
    <div className="container">
      <FadeIn>
        <div className="section-label">Everything You Need</div>
        <h2 className="section-title">One tool, zero distractions</h2>
        <p className="section-desc">Tickr packs everything a freelancer needs to track, report, and bill — all from the command line.</p>
      </FadeIn>
      <div className="bento-grid">
        {[
          { icon: '>_', color: 'coral', title: 'CLI-First Workflow', desc: 'Track time, switch projects, and check status without ever leaving your terminal. Keyboard-first by design.', wide: true },
          { icon: '$', color: 'amber', title: 'Instant Invoicing', desc: 'Generate PDF invoices with one command. Supports USD, INR, EUR, and GBP.' },
          { icon: '[]', color: 'indigo', title: 'Project Summaries', desc: 'Detailed breakdowns by project. See monthly totals, session history, and time distribution.' },
          { icon: '🍅', color: 'rose', title: 'Pomodoro Mode', desc: 'Built-in 25-minute focus timer with auto-logging and system notifications when done.' },
          { icon: '✎', color: 'blue', title: <>Session Logs <span className="new-badge">New</span></>, desc: 'Add notes and tags to active sessions. Invoices will automatically itemize your work.' },
          { icon: '@', color: 'teal', title: 'Email Reports', desc: 'Send time reports and invoices directly to clients via email. SMTP integration built in.' },
        ].map((f, i) => (
          <FadeIn key={i} delay={i * 0.06}>
            <div className={`bento-card${f.wide ? ' wide' : ''}`}>
              <div className={`bento-icon ${f.color}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

/* ===== SECTION: CTA ===== */
const CTASection = () => {
  const [copied, copy] = useCopy('npm install -g tickr-cli');
  return (
    <section className="cta-section">
      <div className="container">
        <FadeIn>
          <div className="section-label">Get Started</div>
          <h2 className="section-title">Install in one line. Track forever.</h2>
          <p className="section-desc">Free, open-source, and runs everywhere Node.js does. Your data stays on your machine.</p>
          <motion.button type="button" className="cta-install-block" onClick={copy}>
            <span>$ npm install -g tickr-cli</span>
            <CopyIcon copied={copied} />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
};

/* ===== DOCS PAGE ===== */
const Docs = () => {
  const [activeId, setActiveId] = useState('install');
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); }, { rootMargin: '-20% 0px -50% 0px' });
    document.querySelectorAll('.docs-main section').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const nav = [['install','Installation'],['quickstart','Quick Start'],['commands','Command Reference'],['pomo','Pomodoro Mode'],['data','Data & Storage'],['invoice','Invoicing'],['email','Email Integration',true],['config','Configuration']];

  return (
    <motion.div className="docs-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container docs-container">
        <h2>Documentation</h2>
        <div className="docs-grid">
          <nav className="docs-nav"><ul>
            {nav.map(([id, label, isNew]) => (
              <li key={id} className={activeId === id ? 'active' : ''}><a href={`#${id}`}>{label}{isNew && <span className="new-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem' }}>NEW</span>}</a></li>
            ))}
          </ul></nav>
          <div className="docs-main">
            <section id="install"><h3>Installation</h3><p>Tickr is a Node.js CLI tool. Install globally from npm.</p><CodeBlock code="npm install -g tickr-cli" /><p><strong>Prerequisites:</strong> Node.js v14 or higher.</p></section>
            <section id="quickstart"><h3>Quick Start</h3><p>Get up and running in seconds.</p><ol className="step-list"><li>Start tracking: <br /><code>tickr start MyProject</code></li><li>Stop when done: <br /><code>tickr stop</code></li><li>Check dashboard: <br /><code>tickr dash</code></li></ol></section>
            <section id="commands"><h3>Command Reference</h3><table className="docs-table"><thead><tr><th>Command</th><th>Description</th></tr></thead><tbody>
              <tr><td><code>tickr start &lt;project&gt;</code></td><td>Start a new session. Auto-stops previous.</td></tr>
              <tr><td><code>tickr stop</code></td><td>Stop the active session.</td></tr>
              <tr><td><code>tickr status</code></td><td>Show current project and duration.</td></tr>
              <tr><td><code>tickr log [note]</code></td><td>Add notes/tags to active session.</td></tr>
              <tr><td><code>tickr dash</code></td><td>Open the TUI dashboard.</td></tr>
              <tr><td><code>tickr report [project]</code></td><td>Generate a time report.</td></tr>
              <tr><td><code>tickr pomo &lt;project&gt;</code></td><td>Start a 25-min Pomodoro timer.</td></tr>
            </tbody></table></section>
            <section id="pomo"><h3>Pomodoro Mode</h3><p>Built-in focus timer for productivity.</p><CodeBlock code="tickr pomo MyProject" /><ul className="step-list"><li>Starts a 25-minute timer.</li><li>Auto-logs time to the database.</li><li>System notification on completion.</li></ul></section>
            <section id="data"><h3>Data & Storage</h3><p>Tickr uses <strong>SQLite</strong> for local-first storage. Your data is yours.</p><ul><li><strong>Location:</strong> <code>~/.tickr/tickr.db</code></li><li><strong>Engine:</strong> <code>better-sqlite3</code> with WAL mode.</li></ul><p><em>Delete <code>~/.tickr</code> to reset.</em></p></section>
            <section id="invoice"><h3>Invoicing</h3><p>Generate PDFs with <code>PDFKit</code>. Supports USD/INR/EUR/GBP.</p><CodeBlock code="tickr invoice MyProject --rate 50 --since 2024-01-01" /><table className="docs-table"><thead><tr><th>Flag</th><th>Purpose</th></tr></thead><tbody>
              <tr><td><code>--rate &lt;n&gt;</code></td><td>Hourly rate. Required.</td></tr>
              <tr><td><code>--currency &lt;code&gt;</code></td><td>Currency (USD, INR, EUR, GBP).</td></tr>
              <tr><td><code>--since &lt;date&gt;</code></td><td>Start date (YYYY-MM-DD).</td></tr>
            </tbody></table></section>
            <section id="email"><h3>Email Integration <span className="new-badge">New</span></h3><p>Email reports and invoices to clients.</p><h4>1. Configure SMTP</h4><CodeBlock code="tickr config --host smtp.gmail.com --user you@gmail.com --pass your-app-password" /><h4>2. Set Project Emails</h4><CodeBlock code="tickr project MyProject --user you@email.com --client client@company.com" /><h4>3. Send Reports</h4><p>Tickr will ask to email when generating reports.</p><CodeBlock code="tickr report MyProject" /></section>
            <section id="config"><h3>Configuration</h3><p>Use env variables to customize behavior.</p><CodeBlock code='export TICKR_DB_PATH="/path/to/custom/db.sqlite"' /><p>Set in <code>.bashrc</code> or <code>.zshrc</code>. Useful for syncing via Dropbox or iCloud.</p></section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ===== HOME ===== */
const Home = () => {
  const [copied, copy] = useCopy('npm install -g tickr-cli');
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="hero-section">
        <div className="container">
          <div className="hero-split">
            <div className="hero-content">
              <motion.div className="hero-tag" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="dot-live" /> Open Source · v1.1.0
              </motion.div>
              <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                Time tracking,<br />built for the <span className="accent-coral">terminal</span>.
              </motion.h1>
              <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                Track projects, generate invoices, and bill clients — all from your command line. No GUI, no cloud, no distractions.
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <button type="button" className="install-block" onClick={copy} title="Click to copy">
                  <span>$ npm install -g tickr-cli</span>
                  <CopyIcon copied={copied} />
                </button>
                <a href="https://github.com/akhilthirunalveli/Tickr" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  View on GitHub <ArrowIcon />
                </a>
              </motion.div>
              <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <span className="hero-meta-item">⚡ Instant startup</span>
                <span className="hero-meta-dot" />
                <span className="hero-meta-item">🔒 100% local data</span>
                <span className="hero-meta-dot" />
                <span className="hero-meta-item">v1.1.0</span>
              </motion.div>
            </div>
            <motion.div className="hero-terminal-wrapper"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
              <div className="hero-badges">
                <motion.div className="hero-badge sqlite"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{ opacity: { delay: 0.8 }, scale: { delay: 0.8 }, y: { delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" } }}>
                  SQLite
                </motion.div>
                <motion.div className="hero-badge cross-platform"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, 5, 0] }}
                  transition={{ opacity: { delay: 1 }, scale: { delay: 1 }, y: { delay: 1.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}>
                  Cross-Platform
                </motion.div>
                <motion.div className="hero-badge nodejs"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                  transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9 }, y: { delay: 1.3, duration: 4, repeat: Infinity, ease: "easeInOut" } }}>
                  Node.js
                </motion.div>
              </div>
              <TerminalVisual />
            </motion.div>
          </div>
        </div>
      </section>
      <HowItWorks />
      <DemoTerminal />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </motion.div>
  );
};

/* ===== APP ===== */
const AnnouncementBanner = () => (
  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="announcement-banner">
    <div className="container">
      <span className="new-pill">NEW</span>
      <span className="announcement-text"><strong>v1.1.0:</strong> Session Notes & Tags are here! Use <code>tickr log</code> 🚀</span>
    </div>
  </motion.div>
);

function App() {
  const [view, setView] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app-root">
      <AnnouncementBanner />
      <div className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <nav className="navbar">
            <div className="logo" onClick={() => setView('home')}>tickr_</div>
            <div className="nav-links">
              <button className={`nav-link-btn ${view === 'docs' ? 'active' : ''}`} onClick={() => setView('docs')}>Docs</button>
              <a href="https://github.com/akhilthirunalveli/Tickr" target="_blank" rel="noopener noreferrer" className="github-badge">
                <GitHubIcon /><span>Star on GitHub</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {view === 'home' ? <Home key="home" /> : <Docs key="docs" />}
      </AnimatePresence>
      <footer className="footer">
        <div className="container">
          <p>Built by <a href="https://github.com/akhilthirunalveli" target="_blank" rel="noopener noreferrer">Akhil Thirunalveli</a> · Open Source on <a href="https://github.com/akhilthirunalveli/Tickr" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
