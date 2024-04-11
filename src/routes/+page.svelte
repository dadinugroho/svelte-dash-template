<script lang="ts">
  import { Button } from "$lib/components/ui/button";
	import Header from '$lib/components/header/header.svelte';

  export let data: {email: string, avatar: string, username: string};
</script>

<Header email={data.email} avatar={data.avatar} username={data.username} />
<main class="px-8 py-4">
  <h1 class="font-poppins">Welcome to SvelteKit</h1>
  <p class="font-coiny">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

  <Button>Click me</Button>
</main>
