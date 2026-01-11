
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// --- New Components ---

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ComparisonSection = () => (
  <section className="section bg-forest">
    <div className="container">
      <FadeInSection>
        <h2 className="section-title light">Why Tickr?</h2>
        <div className="comparison-table">
          <div className="comp-row header">
            <div className="comp-col feature">Feature</div>
            <div className="comp-col tickr">Tickr</div>
            <div className="comp-col others">GUI Apps</div>
          </div>
          <div className="comp-row">
            <div className="comp-col feature">Speed</div>
            <div className="comp-col tickr">⚡ Instant</div>
            <div className="comp-col others">🐢 Slow load times</div>
          </div>
          <div className="comp-col-divider"></div>
          <div className="comp-row">
            <div className="comp-col feature">Storage</div>
            <div className="comp-col tickr">📂 Local SQLite</div>
            <div className="comp-col others">☁️ Cloud Only</div>
          </div>
          <div className="comp-col-divider"></div>
          <div className="comp-row">
            <div className="comp-col feature">Memory</div>
            <div className="comp-col tickr">🪶 ~10MB</div>
            <div className="comp-col others">🐘 ~300MB+</div>
          </div>
          <div className="comp-col-divider"></div>
          <div className="comp-row">
            <div className="comp-col feature">Workflow</div>
            <div className="comp-col tickr">⌨️ Keyboard-first</div>
            <div className="comp-col others">🖱️ Mouse-heavy</div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="section bg-cream">
    <div className="container">
      <FadeInSection>
        <h2 className="section-title">Common Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h4>Where is my data stored?</h4>
            <p>Locally on your machine in <code>~/.tickr/tickr.db</code>. You have full ownership of your data.</p>
          </div>

          <div className="faq-item">
            <h4>Can I sync across devices?</h4>
            <p>Yes. Point <code>TICKR_DB_PATH</code> to a shared folder (Dropbox, iCloud, Drive) to access your sessions anywhere.</p>
          </div>

          <div className="faq-item">
            <h4>Can I export my data?</h4>
            <p>Yes. You can generate PDF invoices or use standard SQLite tools to export to CSV, JSON, or SQL.</p>
          </div>

          <div className="faq-item">
            <h4>Does it work on Windows?</h4>
            <p>Absolutely. Tickr is cross-platform and runs natively on Windows, macOS, and Linux.</p>
          </div>

          <div className="faq-item">
            <h4>Is it free?</h4>
            <p>Tickr is 100% open-source and free to use. Contributions are welcome on GitHub.</p>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const CTASection = ({ copyToClipboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section bg-forest text-center">
      <div className="container">
        <FadeInSection>
          <h2 className="section-title light" style={{ marginBottom: '1.5rem' }}>Ready to reclaim your focus?</h2>
          <p className="cta-subtitle">Join developers who are tracking time without leaving their terminal.</p>

          <motion.div
            className="install-block large"
            onClick={handleCopy}
          >
            <span className="cmd1">$ npm install -g tickr-cli</span>
            <AnimatePresence mode='wait'>
              {copied ? (
                <motion.svg
                  key="check"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  style={{ color: '#00be1dff' }}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </motion.svg>
              ) : (
                <motion.svg
                  key="copy"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.div>
        </FadeInSection>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, desc, symbol, color }) => (
  <motion.div
    className="feature-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <div className="card-header">
      <span className={`feature-symbol ${color}`}>{symbol}</span>
      <h3 className="feature-title">{title}</h3>
    </div>
    <p className="feature-desc">{desc}</p>
  </motion.div>
);

const AlignmentVisual = () => {
  const [isAligned, setIsAligned] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAligned((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { id: 1, width: '60%', color: '#ff5f56', x: -40, y: -60, r: -15 }, // Red
    { id: 2, width: '80%', color: '#ffbd2e', x: 50, y: -20, r: 10 },  // Yellow
    { id: 3, width: '50%', color: '#27c93f', x: -30, y: 40, r: -5 },  // Green
    { id: 4, width: '70%', color: '#00dbff', x: 40, y: 80, r: 20 },   // Blue
  ];

  const chips = [
    { text: 'JSON', x: -160, y: -120, delay: 0 },
    { text: 'PDF', x: 180, y: -90, delay: 1 },
    { text: 'SQL', x: -170, y: 110, delay: 2 },
    { text: '02:45', x: 160, y: 90, delay: 1.5 },
    { text: 'v1.0.1', x: 0, y: -180, delay: 0.5 },
  ];

  return (
    <div className="visual-stage-clean">
      {/* Ambient Grid */}
      <div className="visual-grid"></div>

      {/* Floating Chips */}
      {chips.map((chip, i) => (
        <motion.div
          key={i}
          className="floating-chip"
          initial={{ x: chip.x, y: chip.y, opacity: 0 }}
          animate={{
            opacity: 0.4,
            y: [chip.y - 10, chip.y + 10, chip.y - 10],
          }}
          transition={{
            opacity: { duration: 0.5, delay: chip.delay },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: chip.delay }
          }}
        >
          {chip.text}
        </motion.div>
      ))}

      {/* Main Blocks */}
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="time-block"
          initial={false}
          animate={{
            x: isAligned ? 0 : item.x,
            y: isAligned ? index * 50 : item.y, // 50px vertical spacing when aligned
            rotate: isAligned ? 0 : item.r,
            opacity: isAligned ? 1 : 0.6,
            backgroundColor: isAligned ? item.color : '#4a5a57', // Muted to Bright
            width: isAligned ? '120px' : item.width, // Fixed width when aligned for neat stack
            zIndex: 10
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
            mass: 1.2
          }}
          style={{
            height: '36px',
            borderRadius: '8px',
            position: 'absolute',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        />
      ))}
      <motion.div
        className="alignment-label"
        animate={{ opacity: isAligned ? 1 : 0, y: isAligned ? 230 : 240 }}
        transition={{ duration: 0.5 }}
      >
        <span>Report Generated</span>
      </motion.div>
    </div>
  );
};

const MissionSection = () => (
  <section className="section bg-forest text-cream">
    <div className="container">
      <FadeInSection>
        <div className="mission-grid">
          <div className="mission-content">
            <h2 className="section-title light text-left">The Freelancer's Dilemma</h2>
            <p className="mission-text">
              As freelancers, sometimes understanding what you’re working on, or understanding how much time you’ve spent on a particular project once it’s time to get paid, can be a challenge.
            </p>
            <div className="mission-highlight">
              <span className="quote-mark">“</span>
              <p>Tickr solves that pain.</p>
              <span className="quote-mark">”</span>
            </div>
            <p className="mission-text">
              With this command line interface tool, you simply specify that you’re starting to work on a project, and once you’re done, you say that you’ve stopped.
            </p>
            <p className="mission-text">
              On top of that, an <strong>interactive reporting mode</strong> tells you exactly the amount of time spent so far on a particular project (filtered by date and time), so you can know <span className="underline-highlight">exactly how much to charge each client.</span>
            </p>
          </div>
          <div className="mission-visual">
            <AlignmentVisual />
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="section bg-cream tight-top">
    <div className="container">
      <FadeInSection>
        <h2 className="section-title">Features</h2>
        <div className="features">
          <FeatureCard
            symbol=">_"
            color="green"
            title="CLI-First Workflow"
            desc="Stay in your flow state. Track time, switch contexts, and check status without ever leaving your terminal."
          />
          <FeatureCard
            symbol="$"
            color="yellow"
            title="Instant Invoicing"
            desc="Generate professional PDF invoices with a single command. Support for USD ($) and INR (Rs.) currencies out of the box."
          />
          <FeatureCard
            symbol="[]"
            color="blue"
            title="Project Summaries"
            desc="Visualize your productivity with detailed project summaries and monthly breakdowns."
          />
          <FeatureCard
            symbol="@"
            color="red"
            title={<>Email Reports <span className="new-badge">New</span></>}
            desc="Automatically send professional time reports, summaries, and invoices to your clients via email."
          />
        </div>
      </FadeInSection>
    </div>
  </section>
);

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <pre><code>{code}</code></pre>
      <button className="code-copy-btn" onClick={handleCopy} title="Copy code">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#27c93f' }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

const Docs = () => {
  const [activeId, setActiveId] = useState('install');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('.docs-main section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="docs-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container docs-container">
        <h2>Documentation</h2>

        <div className="docs-grid">
          <nav className="docs-nav">
            <ul>
              <li className={activeId === 'install' ? 'active' : ''}><a href="#install">Installation</a></li>
              <li className={activeId === 'quickstart' ? 'active' : ''}><a href="#quickstart">Quick Start</a></li>
              <li className={activeId === 'commands' ? 'active' : ''}><a href="#commands">Command Reference</a></li>
              <li className={activeId === 'pomo' ? 'active' : ''}><a href="#pomo">Pomodoro Mode</a></li>
              <li className={activeId === 'data' ? 'active' : ''}><a href="#data">Data & Storage</a></li>
              <li className={activeId === 'invoice' ? 'active' : ''}><a href="#invoice">Invoicing</a></li>
              <li className={activeId === 'email' ? 'active' : ''}>
                <a href="#email">
                  Email Integration <span className="new-badge" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>NEW</span>
                </a>
              </li>
              <li className={activeId === 'config' ? 'active' : ''}><a href="#config">Configuration</a></li>
            </ul>
          </nav>

          <div className="docs-main">
            <section id="install">
              <h3>Installation</h3>
              <p>Tickr is a Node.js CLI tool. You can install it globally from npm.</p>
              <CodeBlock code="npm install -g tickr-cli" />
              <p><strong>Prerequisites:</strong> Node.js v14 or higher.</p>
            </section>

            <section id="quickstart">
              <h3>Quick Start</h3>
              <p>Get up and running in seconds. Tickr maintains a persistent database of your sessions.</p>
              <ol className="step-list">
                <li>Start tracking a project: <br /><code>tickr start MyProject</code></li>
                <li>Stop tracking when done: <br /><code>tickr stop</code></li>
                <li>Check your dashboard: <br /><code>tickr dash</code></li>
              </ol>
            </section>

            <section id="commands">
              <h3>Command Reference</h3>
              <table className="docs-table">
                <thead>
                  <tr><th>Command</th><th>Description</th></tr>
                </thead>
                <tbody>
                  <tr><td><code>tickr start &lt;project&gt;</code></td><td>Start a new session. Auto-stops previous.</td></tr>
                  <tr><td><code>tickr stop</code></td><td>Stop the active session (if any).</td></tr>
                  <tr><td><code>tickr status</code></td><td>Show current active project and duration.</td></tr>
                  <tr><td><code>tickr dash</code></td><td>Open the TUI (Terminal User Interface).</td></tr>
                  <tr><td><code>tickr report [project]</code></td><td>Generate a text-based time report.</td></tr>
                  <tr><td><code>tickr pomo &lt;project&gt;</code></td><td>Start a 25-minute Pomodoro timer.</td></tr>
                </tbody>
              </table>
            </section>

            <section id="pomo">
              <h3>Pomodoro Mode</h3>
              <p>Tickr includes a built-in focus timer to help you stay productive.</p>
              <CodeBlock code="tickr pomo MyProject" />
              <ul className="step-list">
                <li>Starts a 25-minute timer for the project.</li>
                <li>Automatically logs time to the project in the database.</li>
                <li>Sends a system notification when the session is complete.</li>
              </ul>
            </section>

            <section id="data">
              <h3>Data Management & Architecture</h3>
              <p>
                Tickr uses <strong>SQLite</strong> for robust, local-first data storage. Your data is yours.
              </p>
              <ul>
                <li><strong>DB Location:</strong> <code>~/.tickr/tickr.db</code> (hidden in User Home)</li>
                <li><strong>Engine:</strong> Uses <code>better-sqlite3</code> for high-performance WAL mode transactions.</li>
              </ul>
              <p><em>To reset your data, simply delete the <code>~/.tickr</code> folder.</em></p>
            </section>

            <section id="invoice">
              <h3>Invoicing & Summaries</h3>
              <p>Generate billable artifacts directly from your terminal using <code>PDFKit</code>.</p>

              <h4>Invoice Generation</h4>
              <p>Supports interactive currency selection (USD/INR) for international freelancers.</p>
              <CodeBlock code="tickr invoice MyProject --rate 50 --since 2024-01-01" />

              <table className="docs-table">
                <thead><tr><th>Flag</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td><code>--rate &lt;n&gt;</code></td><td>Hourly rate (e.g., 50). Required.</td></tr>
                  <tr><td><code>--currency &lt;code&gt;</code></td><td>Currency symbol (USD, INR, EUR, GBP).</td></tr>
                  <tr><td><code>--since &lt;date&gt;</code></td><td>Start date (YYYY-MM-DD). Default: Start of month.</td></tr>
                </tbody>
              </table>
            </section>

            <section id="email">
              <h3>Email Integration <span className="new-badge">New</span></h3>
              <p>Tickr can automatically email reports and invoices to you and your clients.</p>

              <h4>1. Configure SMTP</h4>
              <p>First, set up your email provider (e.g., Gmail App Password).</p>
              <CodeBlock code="tickr config --host smtp.gmail.com --user you@gmail.com --pass your-app-password" />

              <h4>2. Set Project Emails</h4>
              <p>Link client email addresses to a specific project.</p>
              <CodeBlock code="tickr project MyProject --user you@email.com --client client@company.com" />

              <h4>3. Send Reports</h4>
              <p>When generating reports or invoices, Tickr will ask to send them via email.</p>
              <CodeBlock code="tickr report MyProject" />
            </section>

            <section id="config">
              <h3>Configuration</h3>
              <p>Customize Tickr's behavior using environment variables.</p>
              <CodeBlock code='export TICKR_DB_PATH="/path/to/custom/db.sqlite"' />
              <p>Set this variable in your <code>.bashrc</code> or <code>.zshrc</code> to change the default database location. Useful for syncing data via Dropbox or iCloud.</p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Home = ({ copyToClipboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* SECTION 1: HERO & TERMINAL (Cream Background) */}
      <section className="section bg-cream ">
        <div className="container">
          <header className="hero">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Time Tracking,<br />Refined for the Terminal.
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              An elegant, CLI-first time tracker for developers who value focus.
              Generate invoices, track projects, and stay in flow.
            </motion.p>

            <motion.div
              className="install-block"
              onClick={handleCopy}
              title="Click to copy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="cmd">$ npm install -g tickr-cli</span>
              <AnimatePresence mode='wait'>
                {copied ? (
                  <motion.svg
                    key="check"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    style={{ color: '#27c93f' }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="copy"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="version-tag"
            >
              v1.0.1
            </motion.div>
          </header>

          <motion.div
            className="terminal-visual"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="terminal-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="terminal-body tui-mode">
              <div className="tui-grid">
                {/* Panel 1: Active Session */}
                <div className="tui-panel">
                  <div className="tui-title">Active Session</div>
                  <div className="tui-content centered">
                    <div style={{ opacity: 0.7 }}>No active session.</div>
                    <div>Run <span className="cmd">tickr start &lt;project&gt;</span></div>
                  </div>
                </div>

                {/* Panel 2: Time per Project */}
                <div className="tui-panel">
                  <div className="tui-title">Time per Project (This Month)</div>
                  <div className="tui-content">
                    <div className="bar-row">
                      <span className="bar-label">healthscript-pro</span>
                      <div className="bar-visual" style={{ width: '20%' }}></div>
                      <span className="bar-val">12%</span>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Recent Sessions */}
                <div className="tui-panel">
                  <div className="tui-title">Recent Sessions</div>
                  <div className="tui-content table-view">
                    <div className="table-header">
                      <span>Project</span>
                      <span>Start</span>
                      <span>Duration</span>
                    </div>
                    <div className="table-row active">
                      <span>healthscript-pro</span>
                      <span>01-09 22:50</span>
                      <span>25m 10s</span>
                    </div>
                  </div>
                </div>

                {/* Panel 4: Log / Tips */}
                <div className="tui-panel">
                  <div className="tui-title">Log / Tips</div>
                  <div className="tui-content">
                    <div className="yellow">Welcome to Tickr Dashboard!</div>
                    <div className="green">Press q or C-c to exit.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: MISSION (Dark Forest Background) */}
      <MissionSection />

      {/* SECTION 3: FEATURES (Cream Background) */}
      <FeaturesSection />

      {/* SECTION 4: COMPARISON (Forest Background) */}
      <ComparisonSection />

      {/* SECTION 5: FAQ (Cream Background) */}
      <FAQSection />

      {/* SECTION 6: CTA (Forest Background) */}
      <CTASection copyToClipboard={copyToClipboard} />
    </motion.div>
  );
};

// --- Main App ---

const AnnouncementBanner = () => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    className="announcement-banner"
  >
    <div className="container">
      <span className="new-pill">NEW</span>
      <span className="announcement-text">
        <strong>v1.0.1 Released:</strong> Now with Email Reports & Invoices! 🚀
      </span>
    </div>
  </motion.div>
);

function App() {
  const [view, setView] = useState('home'); // 'home' or 'docs'

  const copyToClipboard = () => {
    navigator.clipboard.writeText('npm install -g tickr-cli');
  };

  return (
    <div className="app-root">
      <AnnouncementBanner />
      {/* Navbar - Fixed/Absolute Positioning relative to first section */}
      <div className="bg-cream">
        <div className="container">
          <nav className="navbar">
            <div className="logo" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>Tickr.</div>
            <div className="nav-links">
              <button
                className={`nav-link-btn ${view === 'docs' ? 'active' : ''}`}
                onClick={() => setView('docs')}
              >
                Documentation
              </button>
              <motion.a
                href="https://github.com/akhilthirunalveli/Tickr"
                target="_blank"
                rel="noopener noreferrer"
                className="github-badge"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.29 9.5 21.05C9.5 20.83 9.49 20.13 9.49 19.41C6.77 20 6.2 18.06 6.2 18.06C5.75 16.92 5.11 16.55 5.11 16.55C4.22 15.95 5.18 15.96 5.18 15.96C6.16 16.03 6.68 17.03 6.68 17.03C7.57 18.55 9 18.11 9.56 17.85C9.65 17.21 9.9 16.77 10.18 16.52C8 16.27 5.72 15.43 5.72 11.66C5.72 10.59 6.09 9.71 6.71 9.03C6.61 8.78 6.27 7.76 6.81 6.41C6.81 6.41 7.63 6.15 9.49 7.41C10.27 7.19 11.11 7.08 11.95 7.08C12.79 7.08 13.63 7.19 14.41 7.41C16.27 6.15 17.09 6.41 17.09 6.41C17.63 7.76 17.29 8.78 17.19 9.03C17.81 9.71 18.18 10.59 18.18 11.66C18.18 15.44 15.89 16.27 13.7 16.51C14.05 16.82 14.36 17.42 14.36 18.35C14.36 19.67 14.35 20.73 14.35 21.05C14.35 21.29 14.51 21.59 15.02 21.5C18.99 20.17 21.86 16.42 21.86 12C21.86 6.477 17.38 2 12 2Z" />
                </svg>
                <span>Star on GitHub</span>
              </motion.a>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <Home key="home" copyToClipboard={copyToClipboard} />
        ) : (
          <Docs key="docs" />
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
