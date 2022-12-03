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

function employeeQuery() {
  db.query(
    "SELECT employee.id AS 'ID', employee.first_name AS 'First Name', employee.last_name AS 'Last name', employee.role_id AS 'Role ID', employee.manager_id AS 'Manager ID' FROM employee",
    function (err, result) {
      console.table(result);
      startApp();
    }
  );
}

function addDepartment(name) {
  db.query(`INSERT INTO department(name) VALUES ("${name.newDepartment}")`);
  console.log("Success! Your department has been added to the database!");
  startApp();
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

const addDepartmentQuestions = [
  {
    type: "input",
    message: "Please enter the name of the department you wish to add.",
    name: "newDepartment",
  },
];

//App
function startApp() {
  inquirer.prompt(mainQuestion).then((answer) => {
    if (answer.mainQuestion === "View all departments.") {
      departmentQuery();
    } else if (answer.mainQuestion === "View all roles.") {
      roleQuery();
    } else if (answer.mainQuestion === "View all employees.") {
      employeeQuery();
    } else if (answer.mainQuestion === "Add a department.") {
      inquirer.prompt(addDepartmentQuestions).then((data) => {
        addDepartment(data);
      });
    }
  });
}

//Initialize
startApp();
