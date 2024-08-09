import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a gym", async () => {
		const { token } = await createAndAuthenticateUser(app);

		const profileResponse = await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: null,
				phone: null,
				latitude: -27.2114002,
				longitude: -49.6398757,
			});

		expect(profileResponse.statusCode).toEqual(201);
	});
});
