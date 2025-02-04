import { configDotenv } from "dotenv";

configDotenv();

export const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
