import type { AstronautDto } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const resp = await fetch(`/api/astronauts/${params.id}`);

	if (!resp.ok) {
		throw error(resp.status, 'Astronaut not found');
	}

	const astronaut: AstronautDto = await resp.json();
	return { astronaut };
}) satisfies PageLoad;
