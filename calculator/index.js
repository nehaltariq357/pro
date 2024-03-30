#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const calculator = await inquirer.prompt([
    {
        type: "number",
        name: "num1",
        message: "Enter first Number",
    },
    {
        type: "number",
        name: "num2",
        message: "Enter Second Number",
    },
    {
        type: "list",
        name: "operator",
        message: "Select one of the operator to perform operation",
        choices: [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
            "Exponentiation",
            "Modulus",
        ],
    },
]);
if (calculator.operator === "Addition") {
    console.log(calculator.num1 + calculator.num2);
}
else if (calculator.operator === "Subtraction") {
    console.log(calculator.num1 - calculator.num2);
}
else if (calculator.operator === "Multiplication") {
    console.log(calculator.num1 * calculator.num2);
}
else if (calculator.operator === "Division") {
    console.log(calculator.num1 / calculator.num2);
}
else if (calculator.operator === "Exponentiation") {
    console.log(calculator.num1 ** calculator.num2);
}
else if (calculator.operator === "Modulus") {
    console.log(calculator.num1 % calculator.num2);
}
else {
    console.log(chalk.bgRedBright("please select valid operator"));
}
