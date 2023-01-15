export type AstronautDto = {
	id: number;
	name: string;
	surname: string;
	birthdate: string;
	superpowers: SuperpowerDto[];
	createdAt: string;
	updatedAt: string;
};

export type SuperpowerDto = {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type Superpower = SuperpowerDto;
