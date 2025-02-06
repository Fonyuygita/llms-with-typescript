// src/models/google-gemini/1.1-chat-models/app.ts
// import { CLI } from "../../utils/promptCLI.js";
import { storyProject } from "./projects/story.js";
import { documentationProject } from "./projects/documentation.js";
import { rephrasedProject } from "./projects/rephrased.js";
import chalk from "chalk";
import { CLI } from "../utils/promptCLI.js";
import * as fs from "fs/promises";

const MENU_OPTIONS = [
  "Interactive Story Generator",
  "Technical Documentation Generator",
  "Content Rephrasing Tool",
  "Exit",
];

const main = async () => {
  try {
    CLI.clear();
    CLI.header("Welcome to AI Assistant");

    while (true) {
      console.log("");
      const choice = await CLI.selectFromOptions(
        "What would you like to do?",
        MENU_OPTIONS
      );

      if (choice === "Exit") {
        console.log(
          chalk.green("\nThank you for using AI Assistant. Goodbye! 👋\n")
        );
        break;
      }
      // @ts-ignore
      // const spinner = CLI.startSpinner("Initializing AI module...");
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // spinner.stop();

      switch (choice) {
        case "Interactive Story Generator":
          await storyProject();
          break;
        case "Technical Documentation Generator":
          await documentationProject();
          break;
        case "Content Rephrasing Tool":
          await rephrasedProject();
          break;
      }

      console.log("\n");
      if (!(await CLI.confirmPrompt("Would you like to try another tool?"))) {
        console.log(
          chalk.green("\nThank you for using AI Assistant. Goodbye! 👋\n")
        );
        break;
      }
      CLI.clear();
    }
  } catch (error) {
    console.error(chalk.red("An error occurred:"), error);
  } finally {
    CLI.close();
  }
};

main();
