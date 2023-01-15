<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export function load() {
		throw redirect(307, '/astronauts');
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Astronauts manager demo" />
</svelte:head>
