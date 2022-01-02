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

        case "To Add Employee":
          adEmployee();
          break;

        case "To Remove an Employees":
          removeEmployees();
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

  const departmentChoices = res.map((data) => ({
    value: data.id,
    name: data.name,
  }));

  console.table(res);
  console.log("Department view succeed!\n");

  promptDepartment(departmentChoices);
});

//now lets pick the department so we can see the employees
function promptDepartment(deparmtentChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "deparmentId",
        message: "Which Department Employees Would You Like to View?",
        choices: deparmtentChoices,
      },
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      var query = `SELECT e.id, e.first_name, e.last_name, r.title, d/name AS department
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    WHERE d.id = ?`;

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees:\n");

        firstPrompt();
      });
    });
}

//now we want to make an array for the employee list
function addEmployee() {
  console.log("Adding Employees");

  var query = `SELECT r.id, r.title, r.salary
   FROM role r`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log("roleChoices");
  });
}

function propmtInsert(roleChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please input the employee's first name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please input the employee's last name",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the role of the current employee?",
        choices: roleChoices,
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`;
      //once the prompts have stopped for the employee info we can use that info into the following
      connection.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(
            res.insertedRows + "Information has been added and/or updated!\n"
          );

          firstPrompt();
        }
      );
    });
}

//now we want to be able to delete employees from the network
function removeEmployees() {
  console.log("Now We Can Delete an Employee");

  var query = `SELECT e.id, e.first_name, e.last_name
FROM employee e`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(res);
    console.log("AbilityToDelete!\n!");

    promptDelete(deleteEmployeeChoices);
  });
}

//with this function, we can pick the employee from a generated list and then select which one to delete
function promptDelete(deleteEmployeeChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Please Select From the Following List for the Employee You Would Like to Remove?",
        choices: deleteEmployeeChoices
      }
    ])
    .then(function (answer) {

      var query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: answer.employeeId }, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        firstPrompt();
      });
    });
}

//updating the employee's role with a function 
function updateEmployeeRole() { 
  employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);
    console.log("employeeArray To Update!\n")

    roleArray(employeeChoices);
  });
}