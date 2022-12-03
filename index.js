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

// Querie Functions
function departmentQuery() {
  db.query(
    "SELECT department.id AS 'ID', department.name AS 'Department' FROM department",
    function (err, result) {
      console.table(result);
      startApp();
    }
  );
}
function roleQuery() {
  db.query(
    "SELECT role.id AS 'ID', role.title AS 'Title', role.salary AS 'Salary', role.department_id AS 'Department ID' FROM role",
    function (err, result) {
      console.table(result);
      startApp();
    }
  );
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
  inquirer.prompt(mainQuestion).then((answer) => {
    if (answer.mainQuestion === "View all departments.") {
      departmentQuery();
    } else if (answer.mainQuestion === "View all roles.") {
      roleQuery();
    }
  });
}

//Initialize
startApp();
