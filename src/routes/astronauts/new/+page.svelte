<script lang="ts">
	import { goto } from '$app/navigation';
	import AstronautForm from '$lib/shared/AstronautForm.svelte';

	async function onFormSubmit({ detail }: CustomEvent) {
		const { name, surname, birthdate, superpowers } = detail;
		const astronaut = {
			name,
			surname,
			birthdate,
			superpowers: superpowers
				.map((s) => ({ ...s, id: undefined }))
				.filter((s) => !!s.name?.trim()),
		};
		console.log(astronaut);
		await fetch('/api/astronauts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(astronaut),
		});
		goto('/astronauts');
	}
</script>

<h1>Create New Astronaut</h1>

<AstronautForm on:cancel={() => goto('/astronauts')} on:submit={onFormSubmit} />
