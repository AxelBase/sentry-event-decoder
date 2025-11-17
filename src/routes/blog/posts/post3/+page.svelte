<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>From Event ID to Full Trace in 3 Seconds (Even Offline) | Blog</title>
  <meta name="description" content="How the Sentry Event Decoder works completely offline using Service Workers and local JSON pasting — perfect for on-call, travel, or restricted networks." />
  <meta property="og:title" content="From Event ID to Full Trace in 3 Seconds (Even Offline)" />
  <meta property="og:description" content="A Progressive Web App that turns Sentry traces into interactive visualizations — instantly, anywhere, with no internet required after first visit." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Works Offline in 3 Seconds</p>
  </div>

  <article class="prose">
    <h1>From Event ID to Full Trace in 3 Seconds (Even Offline)</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>You’re on a plane. Or in a data center with no Wi-Fi. Or on-call at 2 AM and Sentry is slow. An alert just fired. You need the trace <em>now</em>.</p>

    <p>That’s why Sentry Event Decoder was built as a full Progressive Web App (PWA).</p>

    <h2>Install Once, Use Forever — Offline</h2>
    <p>After your first visit, the entire tool is cached locally using a Service Worker. All libraries (vis-network, html2canvas, FileSaver) are bundled and cached. You can close the tab, turn off Wi-Fi, and reopen — it just works.</p>

    <h2>Manual JSON Paste = Zero Dependencies</h2>
    <p>Since public event JSON fetching isn’t possible (Sentry requires auth), we made the best possible UX: just copy the JSON from Sentry and paste it. No upload. No server. Instant render.</p>

    <h2>Real Offline Incident Story</h2>
    <p>Last month, I was on a flight when a critical alert came in. I opened the installed PWA, pasted the JSON I’d saved earlier, and within 10 seconds knew a third-party API was timing out. Fixed on the ground. No internet needed.</p>

    <h2>Performance Matters</h2>
    <p>The app loads in less than 800ms on repeat visits. The trace renders in less than 200ms. Total time from paste to insight: less than 3 seconds.</p>

    <h2>FAQ</h2>
    <details>
      <summary>How do I install it?</summary>
      <p>Chrome/Firefox will show an install button. Or click “Add to Home Screen” on mobile.</p>
    </details>
    <details>
      <summary>Does it work on mobile?</summary>
      <p>Yes — fully responsive. Paste JSON on your phone, pinch to zoom the trace.</p>
    </details>
    <details>
      <summary>What if I clear my cache?</summary>
      <p>Just reload once with internet — it re-caches everything automatically.</p>
    </details>

    <p class="italic-note">In debugging, speed isn’t a feature — it’s oxygen. This tool gives you air when you’re drowning in alerts.</p>
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
