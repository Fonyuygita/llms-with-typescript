// Generate text from text-and-image input
// The Gemini API supports multimodal inputs that combine text with media files. The following example shows how to generate text from text-and-image input:

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.resolve(__dirname, "chop.png");
// const imagePath = path.resolve(__dirname, "chop.png");
// import fs from "fs";

const genAI = new GoogleGenerativeAI("API_KEY");

async function fileToGenerativePart(path: string, mimeType: string) {
  try {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  } catch (error) {
    console.error(`Error reading file ${path}:`, error);
    throw error;
  }
}

async function run() {
  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Describe how this product might be manufactured.";
  const imagePart = fileToGenerativePart(imagePath, "image/png");
  // @ts-ignore
  const result = await model.generateContent([prompt, imagePart]);
  console.log(result.response.text());
}

run().catch(console.error);
