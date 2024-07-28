import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { SearchGymsService } from "../search-gyms.service";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsService(gymsRepository);

  return useCase;
}
