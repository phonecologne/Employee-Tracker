USE employeesDB;

INSERT INTO department (name)
VALUES ("Administrative");
INSERT INTO department (name)
VALUES ("Analytics");
INSERT INTO deparment (name)
VALUES ("Communications");
INSERT INTO deparment (name)
VALUES ("Compliance");
INSERT INTO deparment (name)
VALUES ("Data");
INSERT INTO deparment (name)
VALUES ("Executive");
INSERT INTO deparment (name)
VALUES ("Financial");
INSERT INTO deparment (name)
VALUES ("Human Resources");
INSERT INTO deparment (name)
VALUES ("Legal");
INSERT INTO deparment (name)
VALUES ("Marketing");
INSERT INTO deparment (name)
VALUES ("Research");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Lead", 110100, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Communitcation Engineer", 205000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 105000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("General Counsel", 750000, 4);

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