const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL Username
  user: "root",
  // TODO: Add MySQL Password
  password: "",
  database: "employees_db",
});

//Database Queries
function departmentQuery() {
  db.query("SELECT * FROM department", function (err, result) {
    console.table(result);
  });
}

//Inquirer Questions
const mainQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments.",
      "View all roles.",
      "View all employees.",
      "Add a department.",
      "Add a role.",
      "Add an employee.",
      "Update an employee role.",
      "Exit.",
    ],
    name: "mainQuestion",
  },
];

//App
function startApp() {
  return inquirer.prompt(mainQuestion).then((answer) => {
    if (answer.mainQuestion === "View all departments.") {
      departmentQuery();
      //How to fire main question after returning table data?? Promise/Async/Await??
      inquirer.prompt(mainQuestion);
    }
  });
}

//Initialize
startApp();
