USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO deparment (name)
VALUES ("Finance");
INSERT INTO deparment (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gregory", "Alcala", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyler", "Posey", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Crystal", "Reed", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dylan", "O'Brien", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyler Lee", "Hoechlin", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Holland", "Roland", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Colton", "Haynes", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Linden", "Ashby", 8, 2);