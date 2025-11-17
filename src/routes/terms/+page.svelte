<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | Sentry Event Decoder</title>
  <meta name="description" content="Terms of use for Sentry Event Decoder — free, open-source, no warranty, MIT licensed." />
  <meta property="og:title" content="Terms & Conditions | Sentry Event Decoder" />
  <meta property="og:description" content="Free to use, modify, and deploy. Provided as-is with no warranty." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Effective Date: November 17, 2025 • Oslo, Norway</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By using <strong>Sentry Event Decoder</strong> ("the Tool"), developed by <strong>AxelBase</strong>, you agree to these Terms & Conditions. If you do not agree, please do not use the Tool.</p>

    <h2>2. Nature of the Tool</h2>
    <p>Sentry Event Decoder is a <strong>free, open-source</strong>, client-side web application released under the <strong>MIT License</strong>. You may use, modify, and deploy it freely. Source code: <a href="https://github.com/AxelBase/sentry-event-decoder" target="_blank" rel="noopener">github.com/AxelBase/sentry-event-decoder</a></p>

    <h2>3. Permitted Use</h2>
    <p>You may:</p>
    <ul>
      <li>Use the Tool to analyze Sentry event JSON and traces</li>
      <li>Install it as a PWA for offline use</li>
      <li>Fork and deploy your own version</li>
      <li>Share exported PNGs or JSON with your team</li>
    </ul>

    <h2>4. Prohibited Use</h2>
    <p>You may not:</p>
    <ul>
      <li>Use the Tool for illegal purposes</li>
      <li>Attempt to extract or misuse data from public Sentry instances without authorization</li>
      <li>Remove or alter the AxelBase attribution without permission</li>
    </ul>

    <h2>5. No Warranty</h2>
    <p>The Tool is provided <strong>"as is"</strong> and <strong>"as available"</strong> without any warranties, express or implied. We do not guarantee accuracy, completeness, or fitness for a particular purpose. Use at your own risk.</p>

    <h2>6. Limitation of Liability</h2>
    <p>AxelBase shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of the Tool — including but not limited to performance issues, data loss, or business interruption.</p>

    <h2>7. Intellectual Property</h2>
    <p>The Tool’s code is licensed under MIT. The name “Sentry Event Decoder” and associated branding are property of AxelBase. You may use the Tool but not imply official affiliation with Sentry (by Sentry.io).</p>

    <h2>8. Changes to Terms</h2>
    <p>We may modify these terms at any time. Continued use after changes constitutes acceptance.</p>

    <h2>9. Governing Law</h2>
    <p>These terms are governed by the laws of Norway.</p>

    <p class="italic-note"><strong>Built with care in Oslo, Norway</strong> — free for the community, forever.</p>
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