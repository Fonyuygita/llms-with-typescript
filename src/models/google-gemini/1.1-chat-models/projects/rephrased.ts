// src/models/google-gemini/1.1-chat-models/projects/rephrased.ts
import { model } from "../../utils/ai.js";
import { CLI } from "../../utils/promptCLI.js";
import chalk from "chalk";

interface RephraseOptions {
  tone: "professional" | "casual" | "academic";
  length: "shorter" | "similar" | "longer";
  perspective?: "first-person" | "third-person";
}

export async function rephraseContent(
  content: string,
  options: RephraseOptions
) {
  const rephrasePrompt = `
    Rephrase the following content with these specifications:
    - Tone: ${options.tone}
    - Length: ${options.length}
    - Perspective: ${options.perspective || "maintain current"}
    
    Original content:
    ${content}
    `;
  const result = await model.generateContent(rephrasePrompt);
  return result.response.text();
}

export async function rephrasedProject() {
  CLI.clear();
  CLI.header("Content Rephrasing Tool");

  console.log(
    chalk.yellow(
      "\nEnter or paste the content you want to rephrase (press Enter twice to finish):\n"
    )
  );
  const content = await CLI.multiLinePrompt("");

  if (!content.trim()) {
    console.log(chalk.red("No content provided. Operation cancelled."));
    return;
  }

  const tone = await CLI.selectFromOptions("\nSelect the desired tone:", [
    "Professional",
    "Casual",
    "Academic",
  ]);

  const length = await CLI.selectFromOptions("\nSelect the desired length:", [
    "Shorter",
    "Similar",
    "Longer",
  ]);

  const perspective = await CLI.selectFromOptions(
    "\nSelect the desired perspective:",
    ["First-person", "Third-person", "Maintain current"]
  );

  // @ts-ignore
  const spinner = CLI.startSpinner("Rephrasing your content...");
  try {
    const rephrased = await rephraseContent(content, {
      tone: tone.toLowerCase() as RephraseOptions["tone"],
      length: length.toLowerCase() as RephraseOptions["length"],
      perspective:
        perspective === "Maintain current"
          ? undefined
          : (perspective.toLowerCase() as RephraseOptions["perspective"]),
    });
    spinner.stop();

    console.log(chalk.green("\n=== Rephrased Content ===\n"));
    console.log(rephrased);

    if (
      await CLI.confirmPrompt(
        "\nWould you like to save this content to a file?"
      )
    ) {
      // Add file saving logic here
      console.log(chalk.green("Content saved successfully!"));
    }
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("Error rephrasing content:"), error);
  }
}
