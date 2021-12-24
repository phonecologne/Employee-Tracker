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

//now we want to show all employees in the system
function viewEmployee() {
  console.log("Viewing Employees\n");

  var query = `Select e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
  ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
  ON m.id  = e.manager_id`;

  connection.query(query, function (er, res) {
    if (err) throw err;

    console.table(res);
    console.log("Employees Viewed\n");

    firstPrompt();
  });
}

//now we want to be able to view employees by each department
function viewEmployeeByDeparmtent() {
  console.log("Viewing Employees by Department\n");

  var query = `Select d.id, dname, r.salary AS budget
  FROM employee e
  LEFT JOIN role r
  ON e.role_id = r.id
  LEFT JOIN depertment d
  ON d.id = r.department_id
  GROUP BY d.id, d.name`;
}

connection.query(query, function (err, res) {
  if (err) throw err;

  const departmentChoices = res.map(data => ({
    value: data.id, name: data.name
  }));

  console.table(res);
  console.log("Department view succeed!\n");

  promptDepartment(departmentChoices);
});

