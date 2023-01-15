import prisma from '$lib/database';
import type { Prisma } from '@prisma/client';

export async function getAstronauts() {
	return await prisma.astronaut.findMany({
		include: { superpowers: true },
	});
}

export async function getAstronaut({ id }: { id: number }) {
	return await prisma.astronaut.findUnique({
		where: { id },
		include: { superpowers: true },
	});
}

export async function createAstronaut({
	name,
	surname,
	birthdate,
	superpowers,
}: Prisma.AstronautCreateInput) {
	return await prisma.astronaut.create({
		data: {
			name,
			surname,
			birthdate,
			superpowers,
		},
		include: { superpowers: true },
	});
}

export async function updateAstronaut({
	id,
	data,
}: {
	id: number;
	data: Prisma.AstronautUpdateInput;
}) {
	return await prisma.astronaut.update({
		where: { id },
		data: data,
		include: { superpowers: true },
	});
}

export async function addSuperpowerToAstronaut({
	name,
	astronautId,
}: {
	name: string;
	astronautId: number;
}) {
	const astronaut = await prisma.astronaut.update({
		where: { id: astronautId },
		data: {
			superpowers: {
				create: { name },
			},
		},
		include: { superpowers: true },
	});

	return astronaut;
}

export async function deleteAstronaut({ id }: { id: number }) {
	const deleteSuperpowers = prisma.superpower.deleteMany({
		where: { astronautId: id },
	});
	const deleteAstronauts = prisma.astronaut.delete({
		where: { id },
	});

	await prisma.$transaction([deleteSuperpowers, deleteAstronauts]);
}

export async function deleteSuperpower({ id }: { id: number }) {
	await prisma.superpower.delete({
		where: { id },
	});
}

export async function getSuperpower({ id }: { id: number }) {
	const superpower = await prisma.superpower.findUnique({
		where: { id },
	});

	return superpower;
}
