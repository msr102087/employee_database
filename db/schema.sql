DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (

    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (

    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (

    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)

);

INSERT INTO department (id, name)
VALUES (1, "Human Resources"), (2, "Engineering"), (3, "Accounting"), (4, "Sales"), (5, "Production");

INSERT INTO role (title, salary, department_id)
VALUES ('manager', 80000.00, 1), ('engineer', 70000.00, 2), ('accountant', 60000.00, 3), ('sales rep', 85000.00, 4), ('production associate', 50000.00, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, null), ('Jane', 'Doe', 2, 1), ('Joe', 'Brown', 3, 1), ('Jack', 'Hope', 4, 2)



