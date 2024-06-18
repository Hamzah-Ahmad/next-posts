import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";

// 2

// 3
const mockPrismaClient = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(mockPrismaClient);
});

export default mockPrismaClient;
