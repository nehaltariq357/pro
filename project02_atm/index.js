import inquirer from "inquirer";
import chalk from "chalk";
let balance = 1000000000;
async function pin() {
    const correctPin = 1234;
    let attempts = 0;
    while (attempts < 3) {
        const { enterPin } = await inquirer.prompt([
            {
                name: "enterPin",
                type: "number",
                message: chalk.bgBlue("Please enter your PIN   (hint -pin is 1234)"),
                validate: function (value) {
                    const parsedvalue = parseInt(value);
                    if (isNaN(parsedvalue)) {
                        return chalk.redBright(`\n\tPlease enter a valid number\n\t`);
                    }
                    return true;
                },
            },
        ]);
        if (enterPin === correctPin) {
            console.log(chalk.greenBright(`PIN is correct. Welcome to ATM`));
            return true;
        }
        else {
            attempts++;
            console.log(chalk.redBright(`Incorrect PIN`));
        }
    }
    return false;
}
async function main() {
    const pinVerified = await pin();
    if (!pinVerified) {
        console.log(chalk.underline.bgRedBright(`You have reached maximum attempts.`));
        return;
    }
    const { amount } = await inquirer.prompt([
        {
            name: "amount",
            type: "list",
            message: chalk.bgGreenBright.bold("Please select an operation:"),
            choices: [
                chalk.bgBlue.underline("Check balance"),
                chalk.bgBlue.underline("Deposit balance"),
                chalk.bgBlue.underline("Withdraw balance"),
                chalk.bgBlue.underline("Exit"),
            ],
        },
    ]);
    if (amount === chalk.bgBlue.underline("Check balance")) {
        await checkBalance();
    }
    else if (amount === chalk.bgBlue.underline("Deposit balance")) {
        await depositBalance();
    }
    else if (amount === chalk.bgBlue.underline("Withdraw balance")) {
        await withdrawBalance();
    }
    else if (amount === chalk.bgBlue.underline("Exit")) {
        console.log(chalk.bgYellowBright(`Thank you for using ATM.`));
    }
}
async function checkBalance() {
    console.log(chalk.greenBright(`Your current balance is ${balance}`));
}
async function depositBalance() {
    const { amount } = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: chalk.bgBlueBright.bold("Please enter the amount you want to deposit:"),
            validate: function (value) {
                const parsedvalue = parseInt(value);
                if (isNaN(parsedvalue) || parsedvalue <= 0) {
                    return chalk.redBright(`Please enter a valid positive amount for deposit`);
                }
                return true;
            },
        },
    ]);
    const depositAmount = parseInt(amount);
    balance += depositAmount;
    console.log(chalk.greenBright(`Successfully deposited ${depositAmount}. Your updated balance is ${balance}`));
}
async function withdrawBalance() {
    const { amount } = await inquirer.prompt([
        {
            name: "amount",
            type: "input",
            message: chalk.bgBlueBright.bold("Please enter the amount you wish to withdraw (multiples of 500 only):"),
            validate: function (value) {
                const parsedvalue = parseInt(value);
                if (isNaN(parsedvalue) ||
                    parsedvalue < 500 ||
                    parsedvalue % 500 !== 0 ||
                    parsedvalue > balance) {
                    return chalk.redBright(`Please enter a valid amount (multiples of 500 and less than or equal to your balance)`);
                }
                return true;
            },
        },
    ]);
    const withdrawalAmount = parseInt(amount);
    balance -= withdrawalAmount;
    console.log(chalk.bgGreenBright(`Successfully withdrew ${withdrawalAmount}. Your remaining balance is ${balance}`));
}
main();
