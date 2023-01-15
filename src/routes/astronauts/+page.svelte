<script lang="ts">
	import { goto } from '$app/navigation';
	import type { AstronautDto } from '$lib/types';
	import { dateFormatter } from '$lib/utils';
	import {
		Button,
		DataTable,
		Modal,
		Pagination,
		Tag,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
	} from 'carbon-components-svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { astronauts } = data;

	let filteredRowIds: number[] = [];
	let pageSize: number = 20;
	let page: number = 1;
	let open: boolean = false;
	let astronautToDeleteId: number | undefined = undefined;

	type Astronaut = {
		id: number;
		name: string;
		surname: string;
		birthdate: string;
		superpowers: string[];
	};

	function onDeleteAstronaut(id: number) {
		open = true;
		astronautToDeleteId = id;
	}

	async function onDeleteAstronautConfirm(id: number) {
		open = false;
		const resp = await fetch('/api/astronauts/' + id, {
			method: 'DELETE',
		});

		astronauts = astronauts.filter((astronaut) => astronaut.id !== id);
	}
</script>

<h1>Astronauts</h1>
<p>
	Welcome to our website where you can find all the information you need about astronauts. Our
	astronaut table includes data on the name, surname, birthdate, and superpowers of all the
	astronauts in our database. You can easily search for specific astronauts using our search bar,
	and filter the table by different criteria. Our table is constantly updated with the latest
	information, so you can be sure that you're getting accurate and up-to-date information on the
	astronauts. Whether you're a student doing research or just curious about astronauts, our website
	has everything you need to know.
</p>

<DataTable
	sortable
	headers={[
		{ key: 'name', value: 'Name', width: 'auto' },
		{ key: 'surname', value: 'Surname', width: 'auto' },
		{ key: 'birthdate', value: 'Birthdate', width: 'auto' },
		{ key: 'superpowers', value: 'Superpowers', width: '35%', minWidth: '100px' },
		{ key: 'action', empty: true, width: 'min-content' },
	]}
	rows={astronauts.map((astronaut) => ({
		id: astronaut.id,
		name: astronaut.name,
		surname: astronaut.surname,
		birthdate: dateFormatter.format(new Date(astronaut.birthdate)),
		superpowers: astronaut.superpowers.map((superpower) => superpower.name),
	}))}
	{pageSize}
	{page}
>
	<svelte:fragment slot="cell" let:row let:cell>
		{#if cell.key === 'superpowers'}
			{#each cell.value as superpower}
				<Tag>{superpower}</Tag>
			{/each}
		{:else if cell.key === 'action'}
			<Button
				size="small"
				kind="tertiary"
				iconDescription="Edit"
				icon={Edit}
				on:click={() => goto(`/astronauts/${row.id}/edit`)}
			/>
			<Button
				size="small"
				kind="danger"
				iconDescription="Delete"
				icon={TrashCan}
				on:click={() => {
					onDeleteAstronaut(row.id);
				}}
			/>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch persistent value="" shouldFilterRows bind:filteredRowIds />
		</ToolbarContent>
		<Button icon={Add} on:click={() => goto('/astronauts/new')}>Add astronaut</Button>
	</Toolbar>
</DataTable>
<Pagination bind:pageSize bind:page totalItems={filteredRowIds.length} pageSizeInputDisabled />

<Modal
	danger
	bind:open
	modalHeading="Delete Astronaut"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={() =>
		astronautToDeleteId != null ? onDeleteAstronautConfirm(astronautToDeleteId) : null}
	><p>Do you wish to delete this astronaut?</p></Modal
>

<style></style>
