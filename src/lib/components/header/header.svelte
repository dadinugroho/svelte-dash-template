<script lang="ts">
	import { page } from '$app/stores';
	import { menu, site } from '../../config/config';
  import UserNav from "./user_nav.svelte";
	
  export let email: string;
  export let username: string;
  export let avatar: string;
</script>

<header class="bg-primary flex flex-row justify-start">
	<div class="logo">
		<a href="/">
			<span class="font-coiny text-3xl text-purple-100">{site.appName}</span>
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="text-purple-400">
			{#each menu as menuItem}
					<li aria-current={$page.url.pathname === menuItem.url ? 'page' : undefined}>
							<a href={menuItem.url} class={$page.url.pathname === menuItem.url ? 'text-purple-700' : undefined}>{menuItem.label}</a>
					</li>
			{/each}
		</ul>
		<div class="spacer"></div>
		<svg viewBox="0 0 2 3" aria-hidden="true" class="justify-self-end">
			<path d="M0,3 L0,0 C0.5,0 0.5,0 1,1 L2,3 Z" />
		</svg>
	</nav>

	<div class="logout">
		<UserNav email={email} username={username} avatar={avatar} />
	</div>
</header>

<style>
	.logo, .logout {
		width: max-content;
		height: 3em;
		padding-left: 32px;
		padding-right: 32px;
		display: flex;
		align-items: center;
	}

	nav {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 9px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-purple);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-purple);
	}

	.spacer {
		flex: 1;
		background: var(--background);
	}
</style>
