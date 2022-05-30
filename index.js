#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;
let count;
let counter = 0;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const rainbowTitle = chalkAnimation.rainbow("Welcome to the game! 🎮 \n");

  await sleep(1000);

  rainbowTitle.stop();

  console.clear();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    Simply get all the questions right. Otherwise you will ${chalk.bgRed(
      "lose"
    )}`);

  await askName();
}

async function askName() {
  const answers = await inquirer.prompt({
    type: "input",
    name: "playerName",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.playerName;

  await askCount();
}

async function askCount() {
  const answers = await inquirer.prompt({
    type: "input",
    name: "count",
    message: "How many times should I ask the question?",
    default() {
      return 3;
    },
  });

  count = answers.count;

  await askQuestion();
}

async function askQuestion() {
  const answers = await inquirer.prompt({
    type: "list",
    name: "question1",
    message: "2 + 2 = ? \n",
    choices: ["2", "3", "4", "5"],
  });

  return handleAnswer(answers.question1 == "4");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep(500);

  if (isCorrect) {
    spinner.success({
      text: `✅ Nice work ${playerName}. That's the correct answer!`,
    });
    counter++;
    if (count == counter) winner();
    else await askQuestion();
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const message = `Congrats, ${playerName}! \n`;

  figlet(message, (err, data) => {
    err
      ? console.error(err)
      : console.log(gradient.pastel.multiline(data) + "\n");
    process.exit(0);
  });
}

await main();
// await askName();
// await askCount();
// await askQuestion();
