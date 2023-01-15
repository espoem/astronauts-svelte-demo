import { deleteSuperpower, getSuperpower } from '$lib/prisma';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const superpower = await getSuperpower({ id: +params.id });

	if (!superpower) {
		throw error(404, { message: 'Superpower not found' });
	}

	return json(superpower);
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteSuperpower({ id: +params.id });
	} catch (e) {
		throw error(404, { message: 'Superpower not found' });
	}

	return new Response(`Superpower ${params.id} deleted`, { status: 200 }); // 204 causes server internal error
};
