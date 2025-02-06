// src/models/google-gemini/1.1-chat-models/utils/ai.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../../../../../config/.env") });

// import * as dotenv from "dotenv";
dotenv.config({ path: "../../../../config/.env" });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
console.log(process.env.GOOGLE_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
