<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import PocketBase from 'pocketbase';
	import { site } from '../../lib/config/config';

	const pb = new PocketBase(site.pocketbaseServer);

	let isLoading = false;
	let signInErrorMeg = '';

	async function login(form: HTMLFormElement) {
		isLoading = true;

		try {
      const formData = new FormData(form);
			const email: string | null = formData.get('email') as string;
			const password: string | null = formData.get('password') as string;

			if (!email || !password) throw new Error('Email and password are mandatory!');

			await pb.collection('users').authWithPassword(email, password);
      form.token.value = pb.authStore.token;
      form.submit();
		} catch (err: unknown) {
			signInErrorMeg = (err as Error).message ?? 'Error in sign in!';
			console.error('>>>>>ERR', signInErrorMeg);
		  isLoading = false;
		}
	}
</script>

<div
	class="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<div
		class="relative hidden h-full flex-col bg-primary p-10 text-white dark:border-r lg:flex"
	></div>
	<div class="py-8 lg:p-8">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="font-coiny text-3xl font-bold text-primary drop-shadow-2xl">{site.appName}</h1>
				<strong class="text-sm text-muted-foreground">Enter your email and password to sign in</strong>
				<p class="h-6 text-sm text-red-500">
					{signInErrorMeg}
				</p>
			</div>
      <form method="post" on:submit|preventDefault={(e) => login(e.currentTarget)}>
        <input name="token" type="hidden" />
				<div class="grid gap-3">
					<div class="grid gap-1">
						<Label class="sr-only" for="email">Email</Label>
						<Input
							id="email"
							name="email"
							placeholder="email"
							type="email"
							autocapitalize="none"
							autocomplete="off"
							autocorrect="off"
							disabled={isLoading}
              required
						/>
					</div>
					<div class="grid gap-1">
						<Label class="sr-only" for="password">Password</Label>
						<Input
							id="password"
							name="password"
							placeholder="password"
							type="password"
							autocapitalize="none"
							autocomplete="off"
							autocorrect="off"
							disabled={isLoading}
              required
						/>
					</div>
					<Button type="submit" disabled={isLoading}>Sign In</Button>
				</div>
			</form>
		</div>
	</div>
</div>
