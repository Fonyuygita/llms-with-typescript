import readline from "readline";
import chalk from "chalk";

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Basic prompt function
export const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(chalk.cyan(question), (answer) => {
      resolve(answer.trim());
    });
  });
};

// Multi-line prompt function
export const multiLinePrompt = async (promptText: string): Promise<string> => {
  console.log(chalk.cyan(promptText));
  const lines: string[] = [];

  while (true) {
    const line = await prompt("");
    if (line === "") {
      if (lines.length === 0) continue;
      break;
    }
    lines.push(line);
  }

  return lines.join("\n");
};

// Select from options function
export const selectFromOptions = async (
  question: string,
  options: string[]
): Promise<string> => {
  console.log(chalk.cyan(question));
  options.forEach((option, index) => {
    console.log(chalk.yellow(`${index + 1}. ${option}`));
  });

  while (true) {
    const answer = await prompt("Select an option (enter number): ");
    const num = parseInt(answer);
    if (num > 0 && num <= options.length) {
      return options[num - 1];
    }
    console.log(chalk.red("Invalid selection. Please try again."));
  }
};

// Confirm prompt function
export const confirmPrompt = async (question: string): Promise<boolean> => {
  while (true) {
    const answer = await prompt(`${question} (y/n): `);
    const normalized = answer.toLowerCase();
    if (normalized === "y" || normalized === "yes") return true;
    if (normalized === "n" || normalized === "no") return false;
    console.log(chalk.red("Please answer with yes or no."));
  }
};

// Close the readline interface
export const closePrompt = (): void => {
  rl.close();
};

// Function to display a loading spinner
export const startSpinner = (message: string) => {
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  const spinner = setInterval(() => {
    process.stdout.write(`\r${chalk.cyan(spinnerFrames[i])} ${message}`);
    i = (i + 1) % spinnerFrames.length;
  }, 80);

  return {
    stop: () => {
      clearInterval(spinner);
      process.stdout.write("\r");
    },
  };
};

// Helper function to clear the terminal
export const clearScreen = (): void => {
  console.clear();
};

// Helper function to display a section header
export const displayHeader = (text: string): void => {
  const line = "=".repeat(text.length + 4);
  console.log(chalk.cyan(line));
  console.log(chalk.cyan(`= ${text} =`));
  console.log(chalk.cyan(line));
};

// Export an object with all utilities
export const CLI = {
  prompt,
  multiLinePrompt,
  selectFromOptions,
  confirmPrompt,
  close: closePrompt,
  spinner: startSpinner,
  clear: clearScreen,
  header: displayHeader,
};
