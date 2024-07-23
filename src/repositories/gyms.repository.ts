import { Gym, Prisma } from '@prisma/client';

export interface GymsRepository {
  create(dat: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
}
