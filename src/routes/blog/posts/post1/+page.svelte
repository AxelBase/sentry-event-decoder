<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Introducing Sentry Event Decoder – Analyze Traces Instantly | Blog</title>
  <meta name="description" content="A free, open-source, offline-first tool that turns any Sentry event ID or JSON into a beautiful interactive trace tree in seconds — no login required." />
  <meta property="og:title" content="Introducing Sentry Event Decoder – Analyze Traces Instantly" />
  <meta property="og:description" content="The fastest way to understand performance issues and errors from Sentry — works offline, exports to PNG, and shows error propagation instantly." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="AxelBase" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Introducing Sentry Event Decoder</p>
  </div>

  <article class="prose">
    <h1>Introducing Sentry Event Decoder – Analyze Traces Instantly</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>Every developer has been there: a production alert fires, you click into Sentry, wait for the page to load, navigate to the trace… and then wait again. What if you could skip all that and see the full performance trace in under 3 seconds — even offline?</p>

    <p>That’s exactly what <strong>Sentry Event Decoder</strong> does.</p>

    <p>Built as a 100% client-side, open-source web app, this tool lets you paste any Sentry event JSON (or even just the event ID) and instantly get a full interactive trace visualization with:</p>

    <ul>
      <li>Red/Yellow/Green duration indicators (greater than 1s red, 500ms–1s yellow, less than 500ms green)</li>
      <li>Dashed red lines showing error propagation from root to failing span</li>
      <li>Zoom, pan, and collapse nodes powered by vis-network</li>
      <li>One-click export to PNG or JSON</li>
      <li>Works completely offline after first visit (PWA)</li>
    </ul>

    <h2>Why I Built This</h2>
    <p>I was tired of waiting for Sentry’s UI during on-call incidents. When checkout slowed down for 40% of users, I needed to see the trace <em>now</em> — not after three loading screens. So I built a tool that works instantly, anywhere.</p>

    <h2>No Login. No Rate Limits. No Data Sent.</h2>
    <p>Everything runs in your browser. Paste the JSON from Sentry, and the trace renders immediately. No backend. No tracking. No data leaves your machine.</p>

    <h2>Real-World Use Cases</h2>
    <p>Whether you're triaging a P95 regression, hunting down an N+1 query, or sharing a trace in Slack — this tool gets you answers fast.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I use this with private Sentry events?</summary>
      <p>Yes! Just copy the full event JSON from Sentry and paste it — the tool works 100% offline.</p>
    </details>
    <details>
      <summary>Is it really free forever?</summary>
      <p>Yes. Open source, no limits, no account needed. MIT licensed.</p>
    </details>
    <details>
      <summary>Can I deploy my own version?</summary>
      <p>Absolutely. One-click deploy to GitHub Pages. Your own private analyzer in 60 seconds.</p>
    </details>

    <p class="italic-note">Try it now at the top of the page — paste any Sentry event JSON and watch the magic happen.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2{
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }
  
  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose details {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s ease;
  }
  
  .prose details[open] {
    background-color: var(--card-bg);
  }

  .prose summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--accent-secondary);
    list-style: none;
  }
  
  .prose summary::-webkit-details-marker {
    display: none;
  }
  
  .prose summary::before {
    content: '+';
    margin-right: 0.75rem;
    color: var(--accent-primary);
    font-weight: bold;
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .prose details[open] summary::before {
    transform: rotate(45deg);
  }
  
  .prose details p {
    margin-top: 1rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--accent-primary);
    color: var(--text-secondary);
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>
