import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
  prisma = new PrismaClient();
  global.prisma = prisma; // Store the Prisma client on the global object
} else {
  prisma = global.prisma; // Reuse the existing Prisma client
}

export default prisma;
