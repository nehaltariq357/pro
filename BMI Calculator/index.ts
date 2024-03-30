import inquirer from "inquirer";

let BMI_Calculator = await inquirer.prompt([{
  name:"weight",
  type:"number",
  message:"Enter you weight in kg "
  
},
{
name:"height",
type:"number",
message:"Enter your height in meters "
}
]);

let Height = BMI_Calculator.height
let Weight = BMI_Calculator.weight

BMI_Calculator =(Weight / (Height * Height)).toFixed(2)
console.log(`Your BMI is ${BMI_Calculator}`)




