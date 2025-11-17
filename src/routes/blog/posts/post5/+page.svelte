<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Finding the Real Root Cause with Error Propagation Paths | Sentry Event Decoder</title>
  <meta name="description" content="How dashed red lines instantly show you exactly where an error started and how it flowed through your trace — no more guessing." />
  <meta property="og:title" content="Finding the Real Root Cause with Error Propagation Paths" />
  <meta property="og:description" content="The dashed red line is the fastest way to go from 'something failed' to 'here’s the exact span that broke everything'." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Error Propagation Paths</p>
  </div>

  <article class="prose">
    <h1>Finding the Real Root Cause with Error Propagation Paths</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>In complex traces with 50+ spans, finding the actual failing operation is like finding a needle in a haystack. That’s why Sentry Event Decoder draws a bold dashed red line from the root span straight to every error.</p>

    <h2>How It Works</h2>
    <p>We traverse the tree recursively. Any span with <code>status !== "ok"</code> triggers a path collection. Every edge on that path becomes a thick, dashed red line — impossible to miss.</p>

    <h2>Real Incident Example</h2>
    <p>Last month a payment webhook was failing intermittently. Sentry showed 47 spans. The error was buried 6 levels deep in a background job triggered after checkout.</p>
    <p>With the dashed red line? I saw the problem in 2 seconds: a cache.get returning 500 that caused the entire chain to fail.</p>

    <h2>Why This Beats Sentry’s Default View</h2>
    <p>Sentry shows errors in a list. You still have to mentally trace parent_span_id chains. The red propagation line does that work for you — visually.</p>

    <h2>FAQ</h2>
    <details>
      <summary>What if multiple spans fail?</summary>
      <p>All failing paths get red dashed lines. You’ll see every error source instantly.</p>
    </details>
    <details>
      <summary>Can I click the line?</summary>
      <p>Not yet — but the failing spans have red borders, so they’re easy to spot and select.</p>
    </details>

    <p class="italic-note">In debugging, the fastest path from chaos to clarity wins. The red dashed line is that path.</p>
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
