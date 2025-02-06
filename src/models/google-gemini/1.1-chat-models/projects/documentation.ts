// src/models/google-gemini/1.1-chat-models/projects/documentation.ts
import { model } from "../../utils/ai.js";
import { CLI } from "../../utils/promptCLI.js";
import chalk from "chalk";
import * as fs from "fs/promises";

export async function generateTechnicalDocs(codeSnippet: string) {
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

export async function documentationProject() {
  CLI.clear();
  CLI.header("Technical Documentation Generator");

  console.log(
    chalk.yellow("\nPaste your code below (press Enter twice to finish):\n")
  );
  const code = await CLI.multiLinePrompt("");

  if (!code.trim()) {
    console.log(chalk.red("No code provided. Operation cancelled."));
    return;
  }

  const spinner = CLI.spinner("Analyzing code and generating documentation...");
  try {
    const docs = await generateTechnicalDocs(code);
    spinner.stop();

    console.log(chalk.green("\n=== Generated Documentation ===\n"));
    console.log(docs);

    if (
      await CLI.confirmPrompt(
        "\nWould you like to save this documentation to a file?"
      )
    ) {
      // Add file saving logic here
      await fs.writeFile("documentation.md", docs);

      console.log(chalk.green("Documentation saved successfully!"));
    }
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("Error generating documentation:"), error);
  }
}
