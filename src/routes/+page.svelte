<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { validateEventId, buildEventUrl } from '$lib/sentry/eventIdParser';
  import { fetchEventJson } from '$lib/sentry/jsonFetcher';
  import { parseTrace } from '$lib/sentry/traceParser';
  import { renderTraceTree } from '$lib/ui/traceTree';
  import { exportJson, exportPng } from '$lib/ui/exportTools';
  import { formatDuration, isValidJson } from '$lib/utils';

  let inputMode: 'eventId' | 'json' = 'eventId';
  let eventId = '';
  let jsonInput = '';
  let orgSlug = '';
  let projectSlug = '';
  let validationMessage = '';
  let alertType: 'success' | 'warning' | 'danger' | '' = '';
  let eventData: any = null;
  let traceTree: HTMLElement;
  let parsedTrace: { tree: any; errorPaths: string[][] } | null = null;

  function toggleInputMode() {
    inputMode = inputMode === 'eventId' ? 'json' : 'eventId';
    reset();
  }

  function reset() {
    eventData = null;
    parsedTrace = null;
    validationMessage = '';
    alertType = '';
  }

  async function loadData() {
    reset();

    if (inputMode === 'eventId') {
      const validation = validateEventId(eventId);
      validationMessage = validation.message;
      alertType = validation.valid ? 'success' : 'danger';
      if (!validation.valid) return;

      if (!orgSlug || !projectSlug) {
        validationMessage = 'Organization slug and project slug are required.';
        alertType = 'danger';
        return;
      }

      const url = buildEventUrl(orgSlug, projectSlug, eventId);
      if (!url) {
        validationMessage = 'Failed to build URL.';
        alertType = 'danger';
        return;
      }

      eventData = await fetchEventJson(url);

      if (!eventData) {
        validationMessage = `
<strong>This event is not publicly accessible (401/403)</strong><br><br>
This is <strong>completely normal</strong> — Sentry never exposes raw event JSON publicly.<br><br>
Please switch to "Paste JSON Manually" below.
        `.trim();
        alertType = 'warning';
        return;
      }
    } else {
      if (!isValidJson(jsonInput)) {
        validationMessage = 'Invalid JSON format.';
        alertType = 'danger';
        return;
      }
      try {
        eventData = JSON.parse(jsonInput);
      } catch (err) {
        validationMessage = 'JSON parsing failed.';
        alertType = 'danger';
        return;
      }
    }

    parsedTrace = parseTrace(eventData);
    validationMessage = 'Trace loaded and visualized successfully!';
    alertType = 'success';
  }

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${base}/sw.js`).catch(() => {});
    }
  });

  $: if (parsedTrace && traceTree) {
    renderTraceTree(traceTree, parsedTrace.tree, parsedTrace.errorPaths);
  }

  function handleExportJson() {
    if (eventData) exportJson(eventData.contexts?.trace || eventData);
  }

  async function handleExportPng() {
    if (traceTree) await exportPng(traceTree);
  }
</script>

<svelte:head>
  <title>AxelBase – Sentry Event ID Decoder & Trace Analyzer</title>
  <meta name="google-site-verification" content="EA9hfLHMuiCZI5ov0iGdJqQw50HtIXlBqJf8d9_bw-U" />
  <meta name="description" content="Paste any Sentry event JSON → get a beautiful interactive trace tree in <3s. 100% offline, private, open-source." />
</svelte:head>

<div class="container py-4">
  <h1 class="text-center mb-5 display-5 fw-bold text-primary">
    Sentry Event ID Decoder & Trace Analyzer
  </h1>

  <div class="card shadow-sm mb-4">
    <div class="card-body p-4 p-md-5">
      <div class="form-check form-switch mb-4 fs-5">
        <input class="form-check-input" type="checkbox" id="inputToggle" checked={inputMode === 'json'} on:change={toggleInputMode} />
        <label class="form-check-label fw-bold" for="inputToggle">
          {inputMode === 'json' ? 'Paste JSON Manually (Recommended)' : 'Try Load by Event ID'}
        </label>
      </div>

      {#if inputMode === 'eventId'}
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <input type="text" class="form-control form-control-lg" placeholder="Organization Slug (e.g. getsentry)" bind:value={orgSlug} />
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control form-control-lg" placeholder="Project Slug (e.g. sentry)" bind:value={projectSlug} />
          </div>
        </div>
        <div class="input-group">
          <input type="text" class="form-control form-control-lg" placeholder="32-character Event ID" bind:value={eventId} />
          <button class="btn btn-primary btn-lg px-5" on:click={loadData} disabled={!eventId || !orgSlug || !projectSlug}>
            Load Event
          </button>
        </div>
      {:else}
        <!-- FIXED: Proper closing tag -->
        <textarea
          class="form-control font-monospace"
          rows="10"
          placeholder="Paste your full Sentry event JSON here (from the 'JSON' tab)..."
          bind:value={jsonInput}
        ></textarea>
        <div class="mt-3 text-end">
          <button class="btn btn-success btn-lg px-5" on:click={loadData} disabled={!jsonInput.trim()}>
            Parse & Visualize
          </button>
        </div>
      {/if}

      {#if validationMessage}
        <div class="alert alert-{alertType || 'info'} mt-4" role="alert">
          {@html validationMessage}
        </div>
      {/if}
    </div>
  </div>

  {#if parsedTrace}
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Interactive Trace Tree</h5>
        <div>
          <button class="btn btn-light btn-sm me-2" on:click={handleExportJson}>Export JSON</button>
          <button class="btn btn-light btn-sm" on:click={handleExportPng}>Export PNG</button>
        </div>
      </div>
      <div class="card-body p-0">
        <div bind:this={traceTree} id="trace-container" style="height: 620px; border-radius: 0 0 0.375rem 0.375rem;"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-header bg-dark text-white"><h5 class="mb-0">Performance Summary</h5></div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <strong>Total Duration</strong>
                <span class="badge bg-primary rounded-pill fs-6">{formatDuration(parsedTrace.tree.duration)}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Error Paths</strong>
                <span class="badge {parsedTrace.errorPaths.length > 0 ? 'bg-danger' : 'bg-success'} rounded-pill fs-6">
                  {parsedTrace.errorPaths.length}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<section id="about" class="page-section container">
  <h2>About Sentry Event Decoder</h2>
  <p class="fs-5 text-muted">The fastest, most private way to understand any Sentry trace — in seconds, anywhere.</p>

  <p>
    <strong>Sentry Event Decoder</strong> is a free, open-source, fully client-side Progressive Web App built by <strong>AxelBase</strong> in Oslo, Norway, and battle-tested in production by developers worldwide — including high-stakes e-commerce platforms.
  </p>

  <p>
    It was born from a simple frustration: during critical incidents, waiting for Sentry’s UI to load can cost minutes — and minutes cost money, users, and sleep. I needed a tool that worked <em>instantly</em>, even offline, even on a plane, even when the internet is down and the alert is screaming.
  </p>

  <p>
    So I built exactly that: paste any Sentry event JSON (or just the event ID + org/project slugs), and in under 3 seconds you get a beautiful, interactive trace tree with:
  </p>
  <ul class="feature-list">
    <li>Red/Yellow/Green performance coloring (>1s red, 500ms–1s yellow, ≤500ms green)</li>
    <li>Bold dashed red lines showing error propagation from root to failure</li>
    <li>Zoom, pan, collapse, and search powered by vis-network</li>
    <li>One-click PNG and JSON export for Slack, Jira, or post-mortems</li>
    <li>100% offline after first visit — installable as a PWA</li>
  </ul>

  <p>
    This is not a replacement for Sentry — it’s the <strong>emergency flashlight</strong> you reach for when the lights go out. No login. No rate limits. No data ever leaves your browser. Your event JSON is parsed locally and immediately discarded from memory.
  </p>

  <p>
    The entire project is open source under the MIT license. Fork it, deploy it internally, brand it — it’s yours. The public version is hosted on GitHub Pages and will remain free forever.
  </p>

  <p>
    Built with care in Oslo, Norway, and used daily by on-call engineers who can’t afford to wait.
  </p>

  <p class="mt-4">
    <a href="https://github.com/AxelBase/sentry-event-decoder" target="_blank" rel="noopener" class="btn btn-outline-primary">
      View Source on GitHub
    </a>
    <a href="{base}/blog" class="btn btn-outline-secondary ms-3">Read the Blog</a>
  </p>
</section>

<section id="how-to-use" class="page-section container">
  <h2>How to Use Sentry Event Decoder</h2>
  <p class="fs-5 text-muted">Three ways to get a trace — all instant, all private.</p>

  <div class="row g-5 mt-3">
    <div class="col-lg-4">
      <h3 class="text-primary">Method 1: Event ID (Fastest)</h3>
      <ol>
        <li>Copy the event ID from any Sentry issue (the 32-character hex string)</li>
        <li>Paste it into the "Event ID" field</li>
        <li>Enter your organization slug (e.g., <code>sentry</code>) and project slug (e.g., <code>sentry</code>)</li>
        <li>Click "Load Public Event" or press Enter</li>
      </ol>
      <p class="text-muted small">Note: Most events are private, so you’ll usually see “401 – not public”. That’s expected — move to Method 2.</p>
    </div>

    <div class="col-lg-4">
      <h3 class="text-success">Method 2: Paste Full JSON (Recommended)</h3>
      <ol>
        <li>In Sentry, open the issue → click "JSON" tab → "Copy JSON"</li>
        <li>Switch to the "Manual JSON" tab here</li>
        <li>Paste the entire JSON</li>
        <li>Click "Parse Trace" or press Ctrl+Enter</li>
      </ol>
      <p>This works 100% of the time, even with private events, and runs completely offline.</p>
    </div>

    <div class="col-lg-4">
      <h3 class="text-info">Method 3: Drag & Drop File</h3>
      <p>Export the event JSON from Sentry → save as <code>.json</code> → drag the file onto the page.</p>
    </div>
  </div>

  <hr class="my-5">

  <h3>Understanding the Trace</h3>
  <ul class="feature-list">
    <li><span class="badge bg-danger">Red spans</span> → >1 second OR any error status</li>
    <li><span class="badge bg-warning">Yellow spans</span> → 501ms–1s</li>
    <li><span class="badge bg-success">Green spans</span> → ≤500ms and successful</li>
    <li><strong>Dashed red line</strong> → error propagation path from root to failure</li>
    <li>Click any node → see full span details</li>
    <li>Use mouse wheel or buttons to zoom/drag</li>
  </ul>

  <h3 class="mt-5">Export & Share</h3>
  <p>Once rendered:</p>
  <ul>
    <li>Click <strong>Export PNG</strong> → perfect screenshot for Slack/Jira</li>
    <li>Click <strong>Export JSON</strong> → cleaned trace context for scripts</li>
  </ul>

  <p class="mt-4">
    Pro tip: Install as a PWA (Chrome/Edge/Firefox will prompt) — then use it completely offline forever.
  </p>
</section>

<section id="faq" class="page-section container">
  <h2>Frequently Asked Questions</h2>
  <p class="fs-5 text-muted">Everything you need to know — answered.</p>

  <div class="accordion accordion-flush" id="faqAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
          Why do I get “401 Unauthorized” when using Event ID?
        </button>
      </h2>
      <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          This is <strong>normal and expected</strong>. Sentry never exposes raw event JSON publicly — even for public projects. Use the “Manual JSON” tab and paste the full JSON instead. That works 100% of the time.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
          Is my data private and secure?
        </button>
      </h2>
      <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Yes — 100%. Everything runs in your browser. Your JSON never leaves your device. No servers, no logging, no analytics. Even when you use the public URL fetch, it’s done from your browser only.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
          Can I use this offline?
        </button>
      </h2>
      <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Absolutely. After your first visit, click “Install” when prompted (or Add to Home Screen on mobile). The entire app and all libraries are cached via Service Worker. Paste JSON → works forever, no internet required.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
          Why is a span >1s yellow and not red?
        </button>
      </h2>
      <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Impossible — our logic is: error status → red (highest priority), then >1000ms → red, then >500ms → yellow. If you see a >1s span that’s yellow, you’ve discovered a bug worth a GitHub issue!
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
          Can I deploy my own private version?
        </button>
      </h2>
      <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          Yes — fork the repo, click “Deploy to GitHub Pages” or Vercel/Netlify, and you have your own internal instance in under 60 seconds. Many companies do this for air-gapped environments.
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
          Is this affiliated with Sentry.io?
        </button>
      </h2>
      <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          No. This is an independent open-source tool created by AxelBase. We love Sentry and use it daily — this just makes debugging faster when every second counts.
        </div>
      </div>
    </div>
  </div>
</section>

<style>
	/* This style was in your original file and is specific to the trace tree */
	#trace-container {
		background: white;
		border: 1px solid var(--border-color);
	}

	/* Removed the :global(body) style from here as it's now in app.css */
</style>