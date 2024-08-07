import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsUseCase } from "@/services/factories/make-fetch-nearby-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
	const nearbyGymsQuerySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180;
		}),
	});

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);
	const fetchNearbyGyms = makeFetchNearbyGymsUseCase();
	const { gyms } = await fetchNearbyGyms.execute({
		userLatitude: latitude,
		userLongitude: longitude,
	});

	return reply.status(201).send({ gyms });
}
