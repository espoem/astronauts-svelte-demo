import type { AstronautDto } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const resp = await fetch('../api/astronauts');
	const astronauts: AstronautDto[] = await resp.json();

	return { astronauts };
};
