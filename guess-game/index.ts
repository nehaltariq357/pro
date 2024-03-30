
import inquirer from "inquirer";
import chalk from "chalk";

let chances = 3;
while (chances > 0) {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const startgame = await inquirer.prompt([
    {
      name: "nehal",
      type: "input",
      message: ` guess a number between 0 to 100 (${chalk.yellow(
        chances
      )} chances remaining)`,
      validate: (value) => {
        const validateValue = parseInt(value, 10);
        if (isNaN(validateValue) || validateValue < 1 || validateValue > 100) {
          return chalk.red(
            `\n\tplease enter a valid number bteween 0 to 100\n\t`
          );
        }
        return true;
      },
    },
  ]);
  const guessing = parseInt(startgame.nehal, 10);
  if (guessing === randomNumber) {
    console.log(
      chalk.bgGreenBright("congratulations! you guessed the correct number")
    );
    break;
  } else if (guessing > randomNumber) {
    console.log(
      chalk.yellowBright(
        `Your guess is higher than the correct number. Try a lower number. The correct number is ${chalk.redBright(
          randomNumber
        )}\n\t`
      )
    );
  } else if (guessing < randomNumber) {
    console.log(
      chalk.yellowBright(
        `Your guess is lower than the correct number. Try a higher number. The correct number is ${chalk.redBright(
          randomNumber
        )}\n\t`
      )
    );
  }
  chances--;
}

if (chances === 0) {
  console.log(
    chalk.bgRed(
      "Game Over. You've exhausted all your chances. Better luck next time!"
    )
  );
}
