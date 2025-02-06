// import * as dotenv from "dotenv";
// dotenv.config({ path: "./config/.env" });

// import { GoogleGenerativeAI } from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

// In this case, the prompt ("Explain how AI works") doesn't include any output examples, system instructions, or formatting information. It's a zero-shot approach. For some use cases, a one-shot or few-shot prompt might produce output that's more aligned with user expectations. In some cases, you might also want to provide system instructions to help the model understand the task or follow specific guidelines.

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs/promises";
import * as dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Project 1: Interactive Story Generator
async function createInteractiveStory(setting: string, characters: string[]) {
  const storyPrompt = `
    Create an interactive story with the following elements:
    Setting: ${setting}
    Characters: ${characters.join(", ")}
    
    Format the story with 3 choice points where the reader can make decisions.
    For each choice point, provide 3 possible options.
    `;

  const result = await model.generateContent(storyPrompt);
  return result.response.text();
}

// Project 2: Technical Documentation Generator
async function generateTechnicalDocs(codeSnippet: string) {
  const docPrompt = `
    Analyze this code and create comprehensive documentation including:
    1. Function overview
    2. Parameters explanation
    3. Return value description
    4. Usage examples
    5. Common pitfalls
    6. Best practices
    
    Code to document:
    ${codeSnippet}
    `;

  const result = await model.generateContent(docPrompt);
  return result.response.text();
}

// Project 3: Content Rephrasing Tool
interface RephraseOptions {
  tone: "professional" | "casual" | "academic";
  length: "shorter" | "similar" | "longer";
  perspective?: "first-person" | "third-person";
}

async function rephraseContent(content: string, options: RephraseOptions) {
  const rephrasePrompt = `
    Rephrase the following content with these specifications:
    - Tone: ${options.tone}
    - Length: ${options.length}
    - Perspective: ${options.perspective || "maintain current"}
    
    Original content:
    ${content}
    
    Provide the rephrased version maintaining the core message but adapting the style.
    `;

  const result = await model.generateContent(rephrasePrompt);
  return result.response.text();
}

// Example usage
async function main() {
  try {
    // Example 1: Generate an interactive story
    const story = await createInteractiveStory(
      "A cyberpunk metropolis in 2150",
      ["AI detective", "Rebel hacker", "Corporate executive"]
    );
    await fs.writeFile("story.txt", story);

    // Example 2: Generate technical documentation
    const code = `
        function calculateRisk(investment: number, volatility: number): number {
            return investment * (volatility / 100) * Math.random();
        }`;
    const docs = await generateTechnicalDocs(code);
    await fs.writeFile("documentation.md", docs);

    // Example 3: Rephrase content
    const originalContent = "This product is great. It solved all my problems.";
    const rephrased = await rephraseContent(originalContent, {
      tone: "professional",
      length: "longer",
      perspective: "third-person",
    });
    await fs.writeFile("rephrased.txt", rephrased);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
