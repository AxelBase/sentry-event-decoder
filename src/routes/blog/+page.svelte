<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Introducing Sentry Event Decoder – Analyze Traces Instantly',
      description: 'The open-source tool that turns any Sentry event ID or JSON into a beautiful, interactive trace tree – no login required.'
    },
    {
      href: '/blog/posts/post2',
      title: 'How the Trace Visualizer Works Under the Hood',
      description: 'Deep dive into span hierarchy, duration calculation, error propagation paths, and vis-network rendering.'
    },
    {
      href: '/blog/posts/post3',
      title: 'From Event ID to Full Trace in 3 Seconds (Even Offline)',
      description: 'How the PWA + manual JSON paste makes this tool work anywhere – even on a plane or in the field.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Understanding the Red/Yellow/Green Performance Indicators',
      description: 'Exactly how we apply the >1s red, 500ms–1s yellow, <500ms green rules – with real-world examples.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Finding the Real Root Cause with Error Propagation Paths',
      description: 'Why a dashed red line from root to error span is the fastest way to debug slow or failing requests.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Export Trace as PNG or JSON – Share with Your Team',
      description: 'One-click export of the exact visual you see – perfect for Slack, Jira, or incident post-mortems.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Debugging a Real Production Outage with Sentry Event Decoder',
      description: 'A step-by-step walkthrough of how I used this tool to find a hidden N+1 database query that was slowing down checkout for 40% of users.'
    }  
  ];
  
</script>

<svelte:head>
  <title>Blog | Sentry Event Decoder</title>
  <meta name="description" content="Tutorials, deep dives, and updates about the Sentry Event ID Decoder & Trace Analyzer – the fastest way to understand performance and errors." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1>Sentry Event Decoder Blog</h1>
    <p class="subtitle">
      Real-world insights, performance debugging tips, and updates for the <strong>open-source Sentry trace visualizer</strong> used by thousands of developers. 
      Built and maintained by AxelBase in Norway.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article →</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #6f42c1, #dc3545);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.15rem;
    color: var(--text-secondary);
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .post-card {
    text-decoration: none;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: var(--card-bg);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(111, 66, 193, 0.2);
  }

  .post-card .card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--accent-secondary);
    margin-bottom: 0.8rem;
    line-height: 1.3;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1.2rem;
    line-height: 1.6;
  }

  .read-more {
    color: #6f42c1;
    font-weight: 700;
    font-size: 0.95rem;
    align-self: flex-start;
    transition: all 0.2s ease;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
    color: #5a32a3;
  }
</style>