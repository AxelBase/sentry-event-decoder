<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | Sentry Event Decoder</title>
  <meta name="description" content="Sentry Event Decoder is 100% client-side. No data collection, no tracking, no servers — your event JSON never leaves your browser." />
  <meta property="og:title" content="Privacy Policy | Sentry Event Decoder" />
  <meta property="og:description" content="We collect zero personal data. Everything runs in your browser. Your traces stay private — always." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 17, 2025 • Oslo, Norway</p>

    <h2>1. Our Core Principle: Zero Data Collection</h2>
    <p><strong>Sentry Event Decoder</strong> is a fully client-side, open-source Progressive Web App developed by <strong>AxelBase</strong>. We believe privacy is non-negotiable. That’s why <strong>we collect absolutely no personal data, usage analytics, or event content</strong> — ever.</p>

    <h2>2. What We Do Not Collect</h2>
    <p>Your Sentry event JSON, trace data, or any input is processed <strong>exclusively in your browser</strong>. We do not collect:</p>
    <ul>
      <li><strong>Personal information</strong>: No names, emails, or identifiers.</li>
      <li><strong>Usage data</strong>: No IP addresses, browser fingerprints, or session tracking.</li>
      <li><strong>Event or trace content</strong>: Your JSON never leaves your device.</li>
      <li><strong>Analytics or cookies</strong>: No Google Analytics, Plausible, or any tracking scripts.</li>
    </ul>

    <h2>3. How the Tool Works</h2>
    <p>All parsing, visualization (vis-network), and export features (html2canvas, FileSaver.js) run locally. Even when you paste a public Sentry event URL, the fetch happens from <em>your browser only</em> — we never see it. The service worker caches assets for offline use, but never user data.</p>

    <h2>4. Third-Party Services</h2>
    <p>We do not use any third-party analytics, advertising, or telemetry services. All dependencies are bundled locally or loaded from trusted CDNs without tracking.</p>

    <h2>5. Data Security & Your Responsibility</h2>
    <p>Since no data is transmitted, we cannot be breached. However, if your event JSON contains sensitive information (e.g., tokens, PII), it remains only in your browser’s memory and local cache. We recommend clearing your browser cache after use if handling confidential traces.</p>

    <h2>6. Children's Privacy</h2>
    <p>This tool is not directed at children under 13. We do not knowingly collect data from children.</p>

    <h2>7. Compliance</h2>
    <p>By design, we comply with <strong>GDPR</strong>, <strong>CCPA</strong>, <strong>PIPEDA</strong>, and all major privacy laws — because we collect nothing.</p>

    <h2>8. Changes to This Policy</h2>
    <p>We may update this policy. Changes will be posted here with the new effective date.</p>

    <h2>9. Contact</h2>
    <p>Questions? Open an issue on our GitHub: <a href="https://github.com/AxelBase/sentry-event-decoder" target="_blank" rel="noopener">github.com/AxelBase/sentry-event-decoder</a></p>

    <p class="italic-note">Your traces are yours. We see nothing. We store nothing. <strong>Privacy by design</strong> — from Oslo, Norway, with integrity.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding: 2rem 0 4rem; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-secondary); }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .prose .post-meta { color: var(--text-secondary); font-size: .9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
  .prose ul { list-style-type: '→ '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .prose .italic-note { font-style: italic; color: var(--text-secondary); text-align: center; margin-top: 3rem; }
</style>