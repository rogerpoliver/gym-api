import type { CheckInsRepository } from "@/repositories/check-ins.repository";
import type { GymsRepository } from "@/repositories/gyms.repository";
import type { CheckIn } from "@prisma/client";

import { MaxDistanceError } from "./errors/max-distance.error";
import { MaxNumberCheckInsError } from "./errors/max-number-check-ins.error";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates";

interface CheckInServiceRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

interface CheckInServiceResponse {
	checkIn: CheckIn;
}

export class CheckInService {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const distance = getDistanceBetweenCoordinates(
			{
				latitude: userLatitude,
				longitude: userLongitude,
			},
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		const MAX_DISTANCE_IN_KILOMETERS = 0.1;

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOrDate(
			userId,
			new Date(),
		);

		if (checkInOnSameDate) {
			throw new MaxNumberCheckInsError();
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
		});

		return {
			checkIn,
		};
	}
}
