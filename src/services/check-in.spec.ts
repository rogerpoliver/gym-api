import { beforeEach, describe, expect, it } from 'vitest';

import {
    InMemoryCheckInsRepository
} from '@/repositories/in-memory/in-memory-check-ins.repository';

import { CheckInService } from './check-in.service';

let checkInsRepository: InMemoryCheckInsRepository;
let systemUnderTesting: CheckInService;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    systemUnderTesting = new CheckInService(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await systemUnderTesting.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
