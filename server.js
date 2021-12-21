//setting up the required SQL and NODE JS
const mysql = require("mysql");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");
require("console.table");

//MySQL connection to the server
const connection = mysql.createConnection({
  host: "localhost",

  //now we create the port for the user
  port: 3306,

  //setting up a user name
  user: "root",

  //also need a password for sercurity
  password: "PlacePassWordHere",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log(`
    (☞ﾟヮﾟ)☞ Empolyee Tracker! ☜(ﾟヮﾟ☜)`);
  //now we want to run the application after the welcome message
  firstPrompt();
});

function firstPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "task",
      message: "Please select the action you would like to take...",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add a New Employee",
        "Remove a Employee from the System",
        "Update an Employee's Role",
        "Add a new Role",
        "End",
      ],
    })
    .then(function ({ task }) {
      switch (task) {
        case "View Employees":
          viewEmployee();
          break;

        case "View Employees by Department":
          viewEmployeeByDeparmtent();
          break;

        case "Add Employee":
          adEmployee();
          break;

        case "Remove an Employee":
          removeEmployee();
          break;

        case "Update an Employee's Role":
          updateEmployeeRole();
          break;

        case "Adding a New Role":
          addRole();
          break;

        case "End":
          connection.end();
          break;
      }
    });
}

