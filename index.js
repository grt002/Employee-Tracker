import mysql from 'mysql2';
import inquirer from 'inquirer';

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'my_employees'
});

// function to add a new employee to the database
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the employee\'s first name?'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the employee\'s last name?'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'What is the employee\'s role ID?'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'What is the employee\'s manager ID?'
      }
    ])
    .then(answer => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

      connection.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added employee ${answer.first_name} ${answer.last_name} to the database.`);
        }
      });
    });
}

// prompt the user to choose an action
inquirer
  .prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add employee',
        'View all employees',
        'Update employee information',
        'Delete employee',
        'Exit'
      ]
    }
  ])
  .then(answer => {
    switch (answer.action) {
      case 'Add employee':
        addEmployee();
        break;
      case 'View all employees':
        // code for viewing all employees
        break;
      case 'Update employee information':
        // code for updating employee information
        break;
      case 'Delete employee':
        // code for deleting an employee
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });