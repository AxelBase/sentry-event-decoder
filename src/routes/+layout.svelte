<script lang="ts">
    import { base } from '$app/paths';
    import { fly } from 'svelte/transition';
    import '../app.css';

    // --- "Buy Me a Coffee" Logic (integrated from File 1) ---
    let isDropdownOpen = false;

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }
    function closeDropdown() {
        isDropdownOpen = false;
    }
    function clickOutside(node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event.target as Node)) {
                node.dispatchEvent(new CustomEvent('click_outside'));
            }
        };
        document.addEventListener('click', handleClick, true);
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
    // --- End BMAC Logic ---

    // --- Footer Logic ---
    const currentYear = new Date().getFullYear();
</script>

<svelte:head>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
    />
</svelte:head>

<header class="app-header">
    <nav>
        <div class="nav-left">
            <a href="{base}/" class="nav-logo-link" aria-label="Home">
                <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="nav-logo" />
            </a>
            <a href="{base}/" class="nav-brand">AxelBase</a>

            <div class="bmac-container" use:clickOutside on:click_outside={closeDropdown}>
                <button
                    class="bmac-button"
                    on:click={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    aria-label="Support options"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
                    </svg>
                    <span class="d-none d-sm-inline">Buy me a coffee</span>
                    <span class="d-sm-none">Support</span>
                </button>

                {#if isDropdownOpen}
                    <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
                        <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$3</span> One Coffee
                        </a>
                        <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$5</span> Two Coffees
                        </a>
                        <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
                            <span class="amount">$10</span> Three Coffees
                        </a>

                        <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
                            Custom Amount
                        </a>

                        <a
                            href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                            on:click={closeDropdown}
                            class="custom-amount"
                        >
                            Buy via Crypto (Bitcoin)
                        </a>
                    </div>
                {/if}
            </div>
        </div>

        <div class="nav-right">
            <ul>
                <li><a class="nav-link" href="{base}/">Home</a></li>
                <li><a class="nav-link" href="{base}/#about">About</a></li>
                <li><a class="nav-link" href="{base}/#how-to-use">How to use</a></li>
                <li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
                <li><a class="nav-link" href="{base}/blog">Blog</a></li>
            </ul>
        </div>
    </nav>
</header>

<main class="main-content">
    <slot />
</main>

<footer class="app-footer">
    <div class="footer-content">
        <span class="copyright">
            © {currentYear} AxelBase • Oslo, Norway
        </span>
        <div class="footer-links">
            <a href="{base}/privacy">Privacy Policy</a>
            <a href="{base}/terms">Terms of Use</a>
            <a href="https://github.com/AxelBase/sentry-event-decoder" target="_blank" rel="noopener" class="ms-3">
                GitHub
            </a>
        </div>
    </div>
</footer>

<style>
    /* Existing File 2 styles remain unchanged */
    :root {
        --primary-color: #f44611;
        --primary-hover: #d93e0f;
        --bg-color: #f8f9fa;
        --card-bg: #ffffff;
        --text-color: #212529;
        --text-light: #ffffff;
        --text-muted: #6c757d;
        --border-color: #dee2e6;
        --footer-bg: #343a40;
        --footer-text: #adb5bd;

        --header-height: 70px;
        --footer-height: 50px;

        --bs-primary: var(--primary-color);
        --bs-primary-rgb: 244, 70, 17;
        --bs-primary-hover: var(--primary-hover);
        --bs-body-bg: var(--bg-color);
        --bs-body-color: var(--text-color);
        --bs-card-bg: var(--card-bg);
        --bs-border-color: var(--border-color);

        --bs-success: #198754;
        --bs-warning: #ffc107;
        --bs-danger: #dc3545;
    }
	
    a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    a:hover {
        color: var(--primary-hover);
    }

    .main-content {
        padding-top: var(--header-height);
        padding-bottom: calc(var(--footer-height) + 2rem);
        min-height: 100vh;
        box-sizing: border-box;
    }

    .app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--header-height);
        background: var(--card-bg);
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
        z-index: 1030;
        box-sizing: border-box;
    }

    .app-header nav {
        width: 100%;
        max-width: 1400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-left {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .nav-logo {
        height: 40px;
        width: 40px;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .nav-logo-link:hover .nav-logo {
        transform: rotate(15deg) scale(1.1);
    }

    .nav-brand {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--primary-color);
        text-decoration: none;
    }
    .nav-brand:hover {
        color: var(--primary-hover);
        text-decoration: none;
    }

    .nav-right ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 2rem;
    }

    .nav-right .nav-link {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-color);
        text-decoration: none;
        position: relative;
        padding: 0.5rem 0;
        transition: color 0.3s ease;
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--primary-color);
        transition: width 0.3s ease-out;
    }

    .nav-link:hover::after {
        width: 100%;
    }

    .nav-link:hover {
        color: var(--primary-color);
        text-decoration: none;
    }

    .app-footer {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: var(--footer-height);
        background: var(--footer-bg);
        color: var(--footer-text);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 2rem;
        z-index: 1030;
        box-sizing: border-box;
    }

    .footer-content {
        width: 100%;
        max-width: 1400px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
    }

    .footer-links {
        display: flex;
        gap: 1.5rem;
    }

    .footer-links a {
        color: var(--text-light);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-links a:hover {
        color: var(--text-light);
        text-decoration: underline;
    }

    /* --- Integrated "Buy Me a Coffee" Styling from File 1 (adapted to File 2 structure) --- */
    .bmac-container {
        position: relative;
    }

    .bmac-button {
        background: var(--primary-color);
        color: white;
        font-size: 0.95rem;
        font-weight: 600;
        border: none;
        border-radius: 50px;
        padding: 0.65rem 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .bmac-button:hover {
        background: var(--primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .bmac-button svg {
        width: 20px;
        height: 20px;
    }

    .bmac-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateX(0);
        width: 240px;
        background: var(--card-bg);
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(244, 70, 17, 0.15);
        overflow: hidden;
        border: 1px solid rgba(244, 70, 17, 0.1);
        margin-top: 10px;
        z-index: 1001;
    }

    .bmac-dropdown a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        color: var(--text-color);
        text-decoration: none;
        font-size: 0.98rem;
        transition: all 0.2s ease;
    }

    .bmac-dropdown a:hover {
        background: rgba(244, 70, 17, 0.1);
        color: var(--primary-color);
        padding-left: 28px;
    }

    .bmac-dropdown .amount {
        font-weight: 700;
        color: var(--primary-color);
        font-size: 1.1rem;
    }

    .bmac-dropdown .custom-amount {
        font-weight: 600;
        color: var(--primary-color);
        border-top: 1px solid var(--border-color);
        justify-content: center !important;
    }

    /* Responsive adjustment for smaller screens */
    @media (max-width: 576px) {
        .bmac-dropdown {
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>