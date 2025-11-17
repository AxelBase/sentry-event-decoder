<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Understanding the Red/Yellow/Green Performance Indicators | Sentry Event Decoder</title>
  <meta name="description" content="Learn exactly how the Sentry Event Decoder colors spans red (>1s), yellow (500ms–1s), or green (<500ms) — and why these thresholds catch real problems." />
  <meta property="og:title" content="Understanding the Red/Yellow/Green Performance Indicators" />
  <meta property="og:description" content="Real-world examples showing why >1s = red, 500ms–1s = yellow, and <500ms = green is the perfect balance for spotting slow requests fast." />
  <meta property="og:url" content="{base}/blog/posts/post4" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="Axelbase" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Red/Yellow/Green Indicators</p>
  </div>

  <article class="prose">
    <h1>Understanding the Red/Yellow/Green Performance Indicators</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>One glance at a Sentry Event Decoder trace tells you exactly what’s wrong — because every span is colored red, yellow, or green. These aren’t random colors. They follow strict, battle-tested rules.</p>

    <h2>The Rules (Hard-Coded for Speed)</h2>
    <ul>
      <li><strong>Greater than 1000ms → Red</strong>: Anything over one second is a user-perceived delay. Red means “fix this now”.</li>
      <li><strong>501–1000ms → Yellow</strong>: Noticeable but not catastrophic. Worth investigating.</li>
      <li><strong>≤ 500ms → Green</strong>: Fast. Humans don’t notice delays under half a second.</li>
      <li><strong>Any error status → Red + red border</strong>: Overrides duration. A 50ms span that fails is still a critical problem.</li>
    </ul>

    <h2>Why These Thresholds Work</h2>
    <p>I didn’t pick them randomly. Google’s RAIL model and real user studies show:</p>
    <ul>
      <li>0–100ms: Instant</li>
      <li>100–500ms: Slight perceptible delay</li>
      <li>Greater than 1000ms: Users lose focus and feel the app is broken</li>
    </ul>

    <h2>Real Example: Checkout Flow</h2>
    <p>Last week a client saw 40% of checkouts taking over 8 seconds. The trace showed:</p>
    <ul>
      <li>One red db.query (2.8s)</li>
      <li>Three yellow http.client calls (700–900ms each)</li>
      <li>Everything else green</li>
    </ul>
    <p>Fix: Added an index. P95 dropped from 8.2s to 890ms in one deploy.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I change the thresholds?</summary>
      <p>Yes — fork the repo and edit two lines in traceTree.ts. Takes 30 seconds.</p>
    </details>
    <details>
      <summary>Why not use percentiles?</summary>
      <p>Percentiles are great for dashboards. When debugging a single bad request, absolute time matters more.</p>
    </details>

    <p class="italic-note">Red means pain. Yellow means caution. Green means go. That’s all you need to know in an incident.</p>
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
