const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("./lib/employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const generateHTML = require("./src/generateHTML");
const generateCSS = require("./src/generateCSS");

let team = {
    teamName: "",
    managers: [],
    engineers: [],
    interns: []
};

console.log("Welcome to Sumtwelve's Team Page Generator!");
console.log("\nA series of prompts will guide you through creating a webpage\nthat will store useful info and links about your team members.\n");
console.log("To begin, you must enter a Team Name and at least one Team Manager.\n")

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your team called?",
            name: "teamName"
        },
        {
            type: "input",
            message: "Enter the following for your Team Manager\nName:",
            name: "mgrName"
        },
        {
            type: "input",
            message: "Employee ID:",
            name: "mgrID"
        },
        {
            type: "input",
            message: "Email address:",
            name: "mgrEmail"
        },
        {
            type: "input",
            message: "Office number:",
            name: "mgrOfficeNum"
        }
    ])
    .then((answers) => {
        
        team.teamName = toNameCase(answers.teamName);

        let mgr = new Manager(
            toNameCase(answers.mgrName), 
            answers.mgrID,
            answers.mgrEmail.toLowerCase(),
            answers.mgrOfficeNum
        );

        team.managers.push(mgr);
        console.log("\nTeam name and first manager added successfully.")

        mainMenu();
    })
    .catch((error) => {
        console.error(error);
    });

function mainMenu() {
    console.log("\n=====================\n----  MAIN MENU  ----\n=====================\n");
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["Add team member", "Finish entering data and build the webpage", "Exit without generating the webpage"],
                name: "mainMenuAction"
            },
            
            {
                type: "list",
                message: "Are you sure you would like to move on? You'll have a chance to review your team and add more members if needed.",
                choices: ["Yes, continue to team review", "No, go back to the main menu"],
                name: "finishYesNo",
                when: (answers) => answers.mainMenuAction === "Finish entering data and build the webpage"
            },
            {
                type: "list",
                message: "Are you sure you want to exit now? All information entered will be permanently lost.",
                choices: ["Yes, exit now without saving", "No, go back to the main menu"],
                name: "exitYesNo",
                when: (answers) => answers.mainMenuAction === "Exit without generating the webpage"
            }
        ])
        