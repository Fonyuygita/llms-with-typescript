// Generate text from text-and-image input
// The Gemini API supports multimodal inputs that combine text with media files. The following example shows how to generate text from text-and-image input:

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";

const genAI = new GoogleGenerativeAI("GOOGLE_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path: string, mimeType: any) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const prompt = "Describe how this product might be manufactured.";
const imagePart = fileToGenerativePart("/path/to/image.png", "image/png");

const result = await model.generateContent([prompt, imagePart]);
console.log(result.response.text());
