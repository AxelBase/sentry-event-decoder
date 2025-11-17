<script lang="ts">
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import '../app.css';

	// --- "Buy Me a Coffee" Logic ---
	const paypalUsername = 'AxelLab427'; // <-- IMPORTANT: Enter your PayPal username here
	const donationAmounts = [1, 3, 5, 10];
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
				<button class="bmac-button" on:click={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"
						/>
					</svg>
					<span>Buy me a coffee</span>
				</button>

				{#if isDropdownOpen}
					<div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
						{#each donationAmounts as amount}
							<a
								href="https://paypal.me/{paypalUsername}/{amount}"
								target="_blank"
								rel="noopener noreferrer"
								on:click={closeDropdown}
							>
								${amount}
							</a>
						{/each}
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