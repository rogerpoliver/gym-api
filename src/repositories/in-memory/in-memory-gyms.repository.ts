import { randomUUID } from "node:crypto";

import { getDistanceBetweenCoordinates } from "@/services/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";

import { GymsRepository, UserLocalization } from "../gyms.repository";

export class InMemoryGymsRepository implements GymsRepository {
	public items: Gym[] = [];

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
			created_at: new Date(),
			updated_at: new Date(),
		};

		this.items.push(gym);

		return gym;
	}

	async findById(id: string) {
		const gym = this.items.find((item) => item.id === id);

		if (!gym) {
			return null;
		}

		return gym;
	}

	async findManyNearby(params: UserLocalization) {
		return this.items.filter((item) => {
			const distance = getDistanceBetweenCoordinates(
				{
					latitude: params.latitude,
					longitude: params.longitude,
				},
				{
					latitude: item.latitude.toNumber(),
					longitude: item.longitude.toNumber(),
				},
			);

			return distance < 10;
		});
	}

	async searchMany(query: string, page: number) {
		const gyms = this.items
			.filter((checkIn) => checkIn.title.includes(query))
			.slice((page - 1) * 20, page * 20);

		if (!gyms) {
			return [];
		}

		return gyms;
	}
}
