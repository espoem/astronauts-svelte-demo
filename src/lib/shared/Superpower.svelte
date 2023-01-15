<script lang="ts">
	import { Button, TextInput } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function onDelete() {
		dispatch('delete', { id });
	}

	export let id: number | string = crypto.randomUUID();
	export let name: string = '';
</script>

<div style="display: flex;">
	<TextInput placeholder="e.g. Super Health" bind:value={name} on:change />
	<Button size="field" kind="danger" icon={TrashCan} iconDescription="Delete" on:click={onDelete} />
</div>
