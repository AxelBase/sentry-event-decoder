<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Debugging a Real Production Outage with Sentry Event Decoder | Blog</title>
  <meta name="description" content="Step-by-step war story: How I used Sentry Event Decoder to find and fix an N+1 database query that was killing checkout performance for 40% of users." />
  <meta property="og:title" content="Debugging a Real Production Outage with Sentry Event Decoder" />
  <meta property="og:description" content="From alert → pasted JSON → red dashed line → N+1 query found → fixed in 11 minutes. This tool saved the day." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Real Production Outage Fixed</p>
  </div>

  <article class="prose">
    <h1>Debugging a Real Production Outage with Sentry Event Decoder</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>Friday, 14:32. PagerDuty screams. “P95 checkout latency greater than 15s”. 40% of users affected. Stakes: very real money.</p>

    <p>I opened Sentry Event Decoder (already installed as PWA), pasted the worst offender’s JSON, and hit Parse.</p>

    <p>3 seconds later: a bright red dashed line pointed straight to a db.query that took 12.4 seconds. The description? <code>SELECT * FROM order_items WHERE order_id = $1</code> — repeated 87 times.</p>

    <h2>The N+1 That Almost Cost Us Black Friday</h2>
    <p>A new feature had eager-loaded order items in a loop. Classic N+1. In dev: 3 items. In prod: 200+ items for some users. Boom.</p>

    <h2>How the Tool Made It Obvious</h2>
    <ul>
      <li>87 identical red db.query spans</li>
      <li>Dashed red line showing they all came from the same http.server parent</li>
      <li>Total trace time: 18.2 seconds</li>
    </ul>

    <p>11 minutes after the alert, the fix was deployed: one JOIN query instead of 87 individual ones. P95 back to 1.2s.</p>

    <h2>Why This Tool Saved the Day</h2>
    <p>Sentry’s UI was slow under load. This tool loaded instantly, showed the problem visually, and let me share a PNG proving the fix worked.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Would I have found it without the tool?</summary>
      <p>Eventually. But not in 11 minutes.</p>
    </details>

    <p class="italic-note">When real users are losing money, every second counts. This tool turns minutes into seconds.</p>
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
