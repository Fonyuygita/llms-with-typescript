// src/models/google-gemini/1.1-chat-models/projects/story.ts
import { model } from "../../utils/ai.js";
import { CLI } from "../../utils/promptCLI.js";
import chalk from "chalk";
import * as fs from "fs/promises";

export async function createInteractiveStory(
  setting: string,
  characters: string[]
) {
  const storyPrompt = `
    Create an interactive story in  markdown syntax with the following elements:
    Setting: ${setting}
    Characters: ${characters.join(", ")}
    
    Format the story with 3 choice points where the reader can make decisions.
    For each choice point, provide 3 possible options.
    `;
  const result = await model.generateContent(storyPrompt);
  return result.response.text();
}

export async function storyProject() {
  CLI.clear();
  CLI.header("Interactive Story Generator");

  const setting = await CLI.prompt("\nDescribe your story setting: ");

  console.log(chalk.yellow("\nLet's add some characters to your story!"));
  const characters: string[] = [];

  while (true) {
    const character = await CLI.prompt(
      "Enter character name (or press enter to finish): "
    );
    if (!character) {
      if (characters.length === 0) {
        console.log(chalk.red("Please add at least one character."));
        continue;
      }
      break;
    }
    characters.push(character);
    console.log(chalk.green(`Added ${character} to the story!`));
  }
  // @ts-ignore

  const spinner = CLI.spinner("Creating your interactive story...");
  try {
    const story = await createInteractiveStory(setting, characters);
    spinner.stop();

    console.log(chalk.green("\n=== Your Interactive Story ===\n"));
    console.log(story);

    if (
      await CLI.confirmPrompt("\nWould you like to save this story to a file?")
    ) {
      // Add file saving logic here
      console.log(chalk.green("Story saved successfully!"));
      await fs.writeFile("output/story.md", story);
    }
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("Error generating story:"), error);
  }
}
