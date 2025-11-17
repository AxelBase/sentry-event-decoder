<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Export Trace as PNG or JSON – Share with Your Team | Sentry Event Decoder</title>
  <meta name="description" content="One-click export of your exact trace view as PNG or JSON — perfect for Slack, Jira, Notion, or incident post-mortems." />
  <meta property="og:title" content="Export Trace as PNG or JSON – Share with Your Team" />
  <meta property="og:description" content="Stop saying 'just go look in Sentry'. Drop a perfect screenshot or JSON into any channel instantly." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Export Trace as PNG/JSON</p>
  </div>

  <article class="prose">
    <h1>Export Trace as PNG or JSON – Share with Your Team</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>You found the problem. Now you need to show it to your team. Two buttons in Sentry Event Decoder make that instant:</p>
    <ul>
      <li><strong>Export PNG</strong> → Perfect screenshot of exactly what you see (powered by html2canvas)</li>
      <li><strong>Export JSON</strong> → Full trace context for scripting or archiving</li>
    </ul>

    <h2>Use Cases That Save Hours</h2>
    <ul>
      <li>Drop a PNG in Slack: “Here’s why checkout is slow”</li>
      <li>Attach to a Jira ticket with zero explanation needed</li>
      <li>Paste into Notion runbooks</li>
      <li>Include in incident post-mortems</li>
    </ul>

    <h2>No More “Just Click This Link”</h2>
    <p>Links to Sentry traces break, require login, or load slowly. A PNG is universal, instant, and unambiguous.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Does the PNG include the zoomed view?</summary>
      <p>Yes — whatever you see on screen is exactly what gets exported.</p>
    </details>
    <details>
      <summary>Is the JSON export the same as Sentry’s?</summary>
      <p>It’s the cleaned trace context — perfect for diffs or automation.</p>
    </details>

    <p class="italic-note">Great debugging isn’t just finding the problem — it’s communicating it clearly. Export buttons make that effortless.</p>
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
