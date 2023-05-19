const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("../lib/employee");
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

const generateHTML = require("./src/generateHTML");
const generateCSS = require("./src/generateCSS");

let team = {
    teamName: "",
    managers: [],
    engineers: [],
    interns: []
};

console.log("Welcome to OOLEEE's Team Page Generator!");
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
        .then((answers) => {
            switch (answers.mainMenuAction) {
                case "Add team member":
                    addMemberToTeam(team);
                    break;
                
                case "Edit my team":
                    editTeam(team);
                    break;

                case "Finish entering data and build the webpage":
                    if (answers.finishYesNo === "Yes, continue to team review") {
                        generateWebpage(team);
                    } else {
                        mainMenu();
                    }
                    break;

                case "Exit without generating the webpage":
                    if (answers.exitYesNo === "No, go back to the main menu") {
                        mainMenu();
                    } else {
                        
                        console.log("Teampage Generator run terminated. Goodbye!");
                    }
                    break;

                default:
                    console.log("ERROR: Invaild selection somehow passed in. Returning to main menu.");
                    mainMenu();
            }
        });
}


function addMemberToTeam(team) {
    console.log("\nEnter the following for new team member:");
    inquirer
        .prompt([
            {
                type: "list",
                message: "Role:",
                choices: ["Manager", "Engineer", "Intern"],
                name: "newMemberRole"
            },
            {
                type: "input",
                message: "Name:",
                name: "newMemberName"
            },
            {
                type: "input",
                message: "Employee ID:",
                name: "newMemberID"
            },
            {
                type: "input",
                message: "Email Address:",
                name: "newMemberEmail"
            },
            {
                type: "input",
                message: (answers) => `${getRoleSpecificDataField(answers.newMemberRole)}:`,
                name: "newMemberRoleSpecificInfo"
            },
            {
                type: "list",
                message: "Add another team member?",
                choices: ["Yes, add another", "No, go back to main menu"],
                name: "addAnotherTeamMemberYesNo"
            }
        ])
        .then((answers) => {

            let newMember;

            switch (answers.newMemberRole) {
                case "Manager":
                    newMember = new Manager(
                        toNameCase(answers.newMemberName),
                        answers.newMemberID,
                        answers.newMemberEmail.toLowerCase(),
                        toNameCase(answers.newMemberRoleSpecificInfo)
                    );
                    break;

                case "Engineer":
                    newMember = new Engineer(
                        toNameCase(answers.newMemberName),
                        answers.newMemberID,
                        answers.newMemberEmail.toLowerCase(),
                        toNameCase(answers.newMemberRoleSpecificInfo)
                    );
                    break;

                case "Intern":
                    newMember = new Intern(
                        toNameCase(answers.newMemberName),
                        answers.newMemberID,
                        answers.newMemberEmail.toLowerCase(),
                        toNameCase(answers.newMemberRoleSpecificInfo)
                    );
                    break;

                default:
                    console.error(`addMemberToTeam() :: Error when adding new member: Unexpected role "${answers.newMemberRole}" in switch statement.\nReturning to main menu.`);
                    mainMenu();
                    break;
            }

            team[`${answers.newMemberRole.toLowerCase()}s`].push(newMember);

            if (answers.addAnotherTeamMemberYesNo === "Yes, add another") {
                addMemberToTeam(team);
            } else {
                mainMenu();
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error("Error: Prompt couldn't be rendered in the current environment");
            } else {
                console.error(error);
            }
        });
}

function generateWebpage(team) {

    console.log("Here's your team so far:");

    printTeam(team);

    inquirer
        .prompt([
            {
                type: "list",
                message: "Does this look correct and complete?",
                choices: ["No, go back to main menu", "Yes, generate webpage now"],
                name: "generateNowYesNo"
            }
        ])
        .then((answers) => {
            if (answers.generateNowYesNo === "Yes, generate webpage now") {

                if (!fs.existsSync("./dist/")) {
                    fs.mkdirSync("./dist/");
                }

                let folderName = team.teamName; 
                let distFiles = fs.readdirSync(`./dist/`, (err) => {if (err) console.error(err)});
                let numDupeFolders = 0;
                for (fileName of distFiles) {
                    if (fileName.startsWith(team.teamName)) {
                        numDupeFolders++;
                        folderName = `${team.teamName}_${numDupeFolders + 1}`;
                    }
                }

                fs.mkdirSync(`./dist/${folderName}/`);
                
                fs.writeFile(
                    `./dist/${folderName}/index.html`, 
                    generateHTML(team), 
                    ((err) => err ? console.error(err) : console.log(`File ./dist/${folderName}/index.html successfully written!`)) // callback function
                );

                fs.writeFile(
                    `./dist/${folderName}/style.css`,
                    generateCSS(),
                    ((err) => err ? console.error(err) : console.log(`File ./dist/${folderName}/style.css successfully written!`))
                );

            } else {
                mainMenu();
            }
        });
}
 
function printTeam(team) {

    console.log(team.teamName);

    for (let memberListName in team) {
        if (typeof team[memberListName] !== "string") {
            console.log(`+-------------- ${memberListName.toUpperCase()} ---------------\n|`);
            for (let member of team[memberListName]) {
                
                for (let data of Object.values(member)) { 
                    console.log(`|  ${data}`);
                }
                console.log("|"); 
                
            }
        } else continue; 
    }

    console.log("+---------------------------------------");
}

function getRoleSpecificDataField(role) {
    switch (role) {
        case "Manager":
            return "Office Number";
        
        case "Engineer":
            return "GitHub Username";

        case "Intern":
            return "School";

        default:
            console.error("ERROR: Bad value detected for `role` variable inside index.js/getRoleSpecificDataField().\nIf prompted for input, enter the appropriate data for this member's role:\nManager: Office number\nEngineer: GitHub Username\nIntern: School Name.\nI apologize for this error.");
    }
}

function toNameCase(str) {
    return str.trim() 
    .split(" ") 
    .map(word => word[0].toUpperCase() + word.substring(1)) 
    .join(" ");
}