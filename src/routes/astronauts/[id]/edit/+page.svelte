<script lang="ts">
	import { goto } from '$app/navigation';
	import AstronautForm from '$lib/shared/AstronautForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { name, surname, birthdate, superpowers } = data.astronaut;

	async function onFormSubmit({ detail }: CustomEvent) {
		const { name, surname, birthdate, superpowers, superpowersToDelete } = detail;
		let filtered = [
			...superpowers.map((s) => ({ ...s, id: isNaN(s.id) ? undefined : s.id })),
			...superpowersToDelete.map((s) => ({ ...s, name: undefined })),
		];
		const astronaut = {
			name,
			surname,
			birthdate,
			superpowers: filtered,
		};
		await fetch(`/api/astronauts/${data.astronaut.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(astronaut),
		});
		goto('/astronauts');
	}
</script>

<h1>Edit Astronaut's Information</h1>

<AstronautForm
	{name}
	{surname}
	{birthdate}
	{superpowers}
	on:cancel={() => goto('/astronauts')}
	on:submit={onFormSubmit}
/>
