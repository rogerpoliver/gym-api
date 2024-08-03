import { Gym, Prisma } from "@prisma/client";

export interface UserLocalization {
	latitude: number;
	longitude: number;
}

export interface GymsRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>;
	findById(id: string): Promise<Gym | null>;
	findManyNearby(params: UserLocalization): Promise<Gym[]>;
	searchMany(query: string, page: number): Promise<Gym[]>;
}
