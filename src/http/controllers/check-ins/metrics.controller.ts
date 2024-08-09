import { makeGetUserMetricsUseCase } from "@/services/factories/make-get-user-metrics-use-case";

import type { FastifyReply, FastifyRequest } from "fastify";
export async function metrics(request: FastifyRequest, reply: FastifyReply) {
	const getUserMetrics = makeGetUserMetricsUseCase();

	const { checkInsCount } = await getUserMetrics.execute({
		userId: request.user.sub,
	});

	return reply.status(200).send({ checkInsCount });
}
