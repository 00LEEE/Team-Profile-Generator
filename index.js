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
    