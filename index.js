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
    "SELECT employee.id AS 'ID', employee.first_name AS 'First Name', employee.last_name AS 'Last name', role.title AS 'Role Title', role.salary AS 'Salary' FROM employee JOIN role ON employee.role_id = role.id",
    function (err, result) {
      console.table(result);
      startApp();
    }
  );
}

function addDepartment(name) {
  db.query(`INSERT INTO department(name) VALUES ("${name.newDepartment}")`);
  console.log("Success! Your new department has been added to the database!");
  startApp();
}

function addRole(data) {
  db.query(
    `INSERT INTO role(id, title, salary, department_id) VALUES (${data.newRoleID}, "${data.newRole}", ${data.newSalary}, ${data.newDepID})`
  );
  console.log("Success! Your new role has been added to the database!");
  startApp();
}

function addEmployee(data) {
  db.query(
    `INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES (${data.newEmployeeID}, "${data.newEmployeeFN}", "${data.newEmployeeLN}", ${data.newEmployeeRID}, ${data.newEmployeeMID})`
  );
  console.log("Success! Your new employee has been added to the database!");
  startApp();
}

function updateEmpRole(data) {
  db.query(``);
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

const addRoleQuestions = [
  {
    type: "input",
    message: "Please enter the role ID#.",
    name: "newRoleID",
  },
  {
    type: "input",
    message: "Please enter the name of the role.",
    name: "newRole",
  },
  {
    type: "input",
    message: "Please enter the salary.",
    name: "newSalary",
  },
  {
    type: "input",
    message: "Please enter the department ID.",
    name: "newDepID",
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    message: "Please enter the id for the employee you wish to add.",
    name: "newEmployeeID",
  },
  {
    type: "input",
    message: "Please enter the first name for the employee you wish to add.",
    name: "newEmployeeFN",
  },
  {
    type: "input",
    message: "Please enter the last name for the employee you wish to add.",
    name: "newEmployeeLN",
  },
  {
    type: "input",
    message: "Please enter the role id for the employee you wish to add.",
    name: "newEmployeeRID",
  },
  {
    type: "input",
    message: "Please enter the manager id for the employee you wish to add.",
    name: "newEmployeeMID",
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
    } else if (answer.mainQuestion === "Add a role.") {
      inquirer.prompt(addRoleQuestions).then((data) => {
        addRole(data);
      });
    } else if (answer.mainQuestion === "Add an employee.") {
      inquirer.prompt(addEmployeeQuestions).then((data) => {
        addEmployee(data);
      });
    }
  });
}

//Initialize
startApp();
