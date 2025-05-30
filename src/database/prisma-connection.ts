import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully. 🔥🏦");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    throw new Error("Failed to connect to the database ❌🏦");
  }
}

connectToDatabase();

export default prisma;
