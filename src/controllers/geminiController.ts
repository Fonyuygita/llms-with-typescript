// src/controllers/geminiController.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK with your API key
const apiKey = process.env.API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Choose your Gemini model (adjust model parameter as needed)
export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

export const generateContent = async (prompt: string): Promise<string> => {
  const model = getGeminiModel();
  // For simplicity, assume a text-only prompt; update as needed for multimodal inputs.
  // @ts-ignore
  const result = await model.generateContent({ prompt });
  return result.response.text();
};
