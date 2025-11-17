<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How the Trace Visualizer Works Under the Hood | Sentry Event Decoder Blog</title>
  <meta name="description" content="Deep dive into span parsing, duration calculation, hierarchical tree building, and error propagation path rendering in the Sentry Event Decoder." />
  <meta property="og:title" content="How the Trace Visualizer Works Under the Hood" />
  <meta property="og:description" content="Understand how we turn raw Sentry JSON into an interactive performance waterfall with color coding and error tracing." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>How the Trace Visualizer Works</p>
  </div>

  <article class="prose">
    <h1>How the Trace Visualizer Works Under the Hood</h1>
    <p class="post-meta">Published: November 17, 2025</p>

    <p>The magic of Sentry Event Decoder isn’t just the speed — it’s how accurately and beautifully it reconstructs the exact execution flow from raw Sentry trace data.</p>

    <h2>From JSON to Tree: The Parsing Engine</h2>
    <p>We take the <code>contexts.trace</code> object and the <code>spans</code> array, then:</p>
    <ul>
      <li>Build a node map using span_id as key</li>
      <li>Create a root node from the trace context</li>
      <li>Link children via <code>parent_span_id</code></li>
      <li>Calculate precise duration in milliseconds using <code>timestamp - start_timestamp</code></li>
    </ul>

    <h2>Color Logic: Red, Yellow, Green</h2>
    <p>Every span is colored based on performance and status:</p>
    <ul>
      <li>Any span with <code>status !== "ok"</code> → Red background + red border</li>
      <li>Duration greater than 1000ms → Red</li>
      <li>Duration 501–1000ms → Yellow</li>
      <li>Duration less than or equal to 500ms → Green</li>
    </ul>

    <h2>Error Propagation Paths</h2>
    <p>We traverse the tree and collect every path from root to a failed span. These are rendered as bold dashed red lines — instantly showing you where the error originated and how it flowed.</p>

    <h2>Powered by vis-network</h2>
    <p>The interactive graph uses <strong>vis-network</strong> with a hierarchical top-down layout. You can zoom, drag, and collapse nodes — just like a real flame graph, but better.</p>

    <h2>Why This Matters</h2>
    <p>In a real incident, you don’t have time to mentally stitch together 47 spans. You need to see: “Ah, the database query after the cache miss took 2.8 seconds and failed.” That’s what this tool gives you — instantly.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Why not just use Sentry’s trace view?</summary>
      <p>Sentry is slow to load during incidents. This tool loads in less than 1 second, works offline, and focuses only on what matters.</p>
    </details>
    <details>
      <summary>Can I trust the duration math?</summary>
      <p>Yes. We use exact timestamp differences multiplied by 1000 and rounded — identical to Sentry’s own calculations.</p>
    </details>

    <p class="italic-note">The trace visualizer isn’t just pretty — it’s engineered for speed and clarity when seconds count.</p>
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
