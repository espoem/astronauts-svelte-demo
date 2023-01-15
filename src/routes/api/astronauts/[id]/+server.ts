import { deleteAstronaut, getAstronaut, updateAstronaut } from '$lib/prisma';
import type { AstronautDto } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const astronaut = await getAstronaut({ id: +params.id });

	if (!astronaut) {
		throw error(404, { message: 'Astronaut not found' });
	}

	return json(astronaut);
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteAstronaut({ id: +params.id });
	} catch (e) {
		throw error(404, { message: 'Astronaut not found' });
	}

	return new Response(`Astronaut ${params.id} deleted`, {
		status: 200, // 204 causes server internal error
	});
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	const astronaut = await getAstronaut({ id: +params.id });

	if (!astronaut) {
		throw error(404, { message: 'Astronaut not found' });
	}

	const { name, surname, birthdate, superpowers }: Partial<AstronautDto> = await request.json();
	const updatedAstronaut = await updateAstronaut({
		id: +params.id,
		data: {
			name: name ?? astronaut.name,
			surname: surname ?? astronaut.surname,
			birthdate: birthdate ? new Date(birthdate) : astronaut.birthdate,
			updatedAt: new Date(),
			superpowers: {
				create: (superpowers ?? [])
					.filter((superpower) => !superpower.id && !!superpower.name)
					.map((superpower) => ({
						name: superpower.name,
					})),
				update: (superpowers ?? [])
					.filter((superpower) => !!superpower.id && !!superpower.name)
					.map((superpower) => ({
						where: { id: +superpower.id },
						data: { name: superpower.name, updatedAt: new Date() },
					})),
				delete: (superpowers ?? [])
					.filter((superpower) => !!superpower.id && !superpower.name)
					.map((superpower) => ({ id: +superpower.id })),
			},
		},
	});

	return json(updatedAstronaut);
};
