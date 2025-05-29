import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully. 🔥🏦");
  } catch (error) {
    console.log("Connected to the database successfully. ❌🏦");
    throw new Error("Failed to connect to the database ❌🏦");
  }
}

export default prisma;
