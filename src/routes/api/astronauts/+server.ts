import { createAstronaut, getAstronauts } from '$lib/prisma';
import type { AstronautDto } from '$lib/types';
import type { Prisma } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type NewAstronaut = Pick<AstronautDto, 'name' | 'surname'> &
	Partial<Omit<AstronautDto, 'name' | 'surname'>>;

export const GET: RequestHandler = async () => {
	const astronauts = await getAstronauts();

	return json(astronauts);
};

export const POST: RequestHandler = async ({ request }) => {
	const { name, surname, birthdate, superpowers }: NewAstronaut = await request.json();

	if (!name && !surname) {
		throw error(400, { message: 'Name and surname are required' });
	}

	const astronautData: Prisma.AstronautCreateInput = {
		name,
		surname,
		birthdate: birthdate ? new Date(birthdate) : '',
		superpowers: {
			create: (superpowers ?? [])
				.map((superpower) => ({ name: superpower.name }))
				.filter((superpower) => !!superpower.name),
		},
	};

	const astronaut = await createAstronaut(astronautData);

	return json(astronaut);
};
