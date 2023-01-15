<script lang="ts">
	import {
		Button,
		DatePicker,
		DatePickerInput,
		Form,
		FormGroup,
		TextInput,
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { createEventDispatcher } from 'svelte';
	import Superpower from './Superpower.svelte';

	const dispatch = createEventDispatcher();

	type Superpower = { id: number | string; name: string };

	export let name: string = '';
	export let surname: string = '';
	export let birthdate: string = '';
	export let superpowers: Superpower[] = [{ name: '', id: crypto.randomUUID() }];

	let superpowersToDelete: Superpower[] = [];

	function addSuperpower() {
		superpowers = [...superpowers, { name: '', id: crypto.randomUUID() }];
	}

	function onSuperpowerDelete(event: CustomEvent) {
		superpowersToDelete = [
			...superpowersToDelete,
			...superpowers.filter((superpower) => superpower.id === (event.detail as Superpower).id),
		];
		superpowers = superpowers.filter(
			(superpower) => superpower.id !== (event.detail as Superpower).id
		);
	}
</script>

<Form
	on:submit={() =>
		dispatch('submit', { name, surname, birthdate, superpowers, superpowersToDelete })}
>
	<FormGroup>
		<div class="name-group">
			<TextInput bind:value={name} placeholder="e.g. Jane" labelText="Name" required />
			<TextInput bind:value={surname} placeholder="e.g. Doe" labelText="Surname" required />
		</div>
	</FormGroup>
	<FormGroup>
		<DatePicker bind:value={birthdate} datePickerType="single">
			<DatePickerInput placeholder="mm/dd/yyyy" labelText="Birth date" required />
		</DatePicker>
	</FormGroup>
	<FormGroup legendText="Superpowers">
		<div class="superpower-group">
			{#each superpowers as { name, id } (id)}
				<Superpower
					{id}
					{name}
					on:delete={onSuperpowerDelete}
					on:change={(e) => (name = String(e.detail || ''))}
				/>
			{/each}
			<Button size="field" icon={Add} kind="primary" on:click={addSuperpower}>Add superpower</Button
			>
		</div>
	</FormGroup>
	<div class="action-group">
		<Button kind="secondary" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</Form>

<style>
	.name-group {
		display: flex;
		gap: 1.2em;
	}

	.superpower-group {
		display: grid;
		grid-template-areas: 's s s';
		grid-auto-columns: 1fr;
		gap: 1.2em;
	}

	.action-group {
		display: flex;
		gap: 0.7em;
	}
</style>
