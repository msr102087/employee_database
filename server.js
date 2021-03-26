// Dependencies
const inquirer = require('inquirer');
const express = require('express')
const mysql = require('mysql');
const consoleTable = require('console.table');


// Establish Connection

const connection = mysql.createConnection({

host: 'localhost',
port: 3306,
user: 'root',
password: 'password1!',
database: 'employee_tracker'
});


connection.connect((err) => {
  if (err) 
  throw err;
  

  console.log(`connected as id ${connection.threadId}`);
  startMenu();

});

function startMenu() {

  inquirer
  .prompt({


// ALL USER OPTIONS

    name: 'action',
    type: 'list',
    message: 'MAIN MENU',
    choices: [
      'View all employees',
      'View roles',
      'View departments',
      'Add new employee',
      'Add new role',
      'Add new department',
      'Update employee role',
      
    ]

  })

  .then((answer) => {

    switch (answer.action) {
      case 'View all employees':
      viewAllEmp();
      break;

      case 'View roles':
        viewEmpRole();
        break;

      case 'View departments':
        viewEmpDept();
        break;
      
      case 'Add new employee':
        addNewEmp();
        break;
      
      case 'Add new role':
        addNewRole();
        break;
      
      case 'Add new department':
        addNewDept();
        break;

      case 'Update employee role':
        updateEmp();
        break;

      
    }


  })
}
 
// View ALL Employees

function viewAllEmp(){

  let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";

  connection.query(query, 

  function (err, res) {

    if (err) throw err
    console.table(res)
    startMenu()

  })

}

// View Roles

function viewEmpRole(){

  let query = "SELECT * FROM role";

  connection.query(query, 

  function (err, res) {

    if (err) throw err
    console.table(res)
    startMenu()

  })

}

// View Employees by Department

function viewEmpDept(){

  connection.query("SELECT * FROM department", 

  function (err, res) {

    if (err) throw err
    console.table(res)
    startMenu()

  })

}


//Add New Employee

function addNewEmp(){
  let query = "SELECT * FROM role";

  connection.query(query, 

  function (err, res) {

    if (err) throw err
 var roleMap = res.map(({id,title})=> ({
    name: title,
    value: id
  }))
  inquirer.prompt ([
    {
      name: "firstName",
      type: "input",
      message: "Please enter employee first name."
    },

    {
      name: "lastName",
      type: "input",
      message: "Please enter employee last name.",
    },
    {
      name: 'role',
      type: 'list',
      message: 'What is the employee role',
      choices: roleMap

    },

  ])
    .then(function (val) {
    connection.query("INSERT INTO employee SET ?", 
    {
        first_name: val.firstName,
        last_name: val.lastName,
        role_id: val.role
        
    }, function(err){
        if (err) throw err
        console.log("Employee added")
        startMenu()
    })

})

  })
 



}

// Update Current Employee

function updateEmp() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function(err, res) {
  // console.log(res)
   if (err) throw err
   console.log(res)
   var empMap = res.map(({id,first_name,last_name})=>({
    name: first_name + " " + last_name,
    value: id
   }))
  inquirer.prompt([
        {
          name: "name",
          type: "list",
          choices: empMap,
          message: "Which Employee would you like to update? ",
        },
       
    ]).then(function(val) {
      var empId = val.name
      let query = "SELECT * FROM role";

      connection.query(query, 
    
      function (err, res) {
    
        if (err) throw err
     var roleMap = res.map(({id,title})=> ({
        name: title,
        value: id
      }))
      inquirer.prompt([
        {
          name: "name",
          type: "list",
          choices: roleMap,
          message: "Which role would you like to assign to employee? ",
        },
       
    ]).then(val => {
      console.log(empId,val.name)
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", 
      [empId, val.name], 
      function(err){
          if (err) throw err
          console.log("Updated Employee Role.")
          startMenu()
      })
    })
    });



      

  });
});
}

// Add Employee Role


function addNewRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the role title"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the salary for this role?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startMenu();
            }
        )

    });
  });
  }


  // Add New Department

  function addNewDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startMenu();
            }
        )
    })
  }
