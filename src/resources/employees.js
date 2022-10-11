const express = require('express');

const router = express.Router();
const fs = require('fs');
const employees = require('../data/employees.json');

module.exports = router;

router.post('/createEmployee', (req, res) => {
  const employeeName = req.body.first_name;
  const employeeLastName = req.body.last_name;
  const employeeEmail = req.body.email;
  const employeePassword = req.body.password;
  const employeeTask = req.body.task;
  const employeeProject = req.body.projects;
  const newEmployee = {
    id: new Date().getTime().toString().substring(6),
    first_name: employeeName,
    last_name: employeeLastName,
    email: employeeEmail,
    task: employeeTask,
    password: employeePassword,
    projects: employeeProject,
  };
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees, null, 2), (err) => {
    if (err) {
      res.send('Cannot create new employee');
    } else {
      res.send('New employee created successfully');
    }
  });
});

router.put('/editEmployee', (req, res) => {
  const employeeId = req.body.id;
  const employeeName = req.body.first_name;
  const employeeLastName = req.body.last_name;
  const employeeEmail = req.body.email;
  const employeePassword = req.body.password;
  const employeeTask = req.body.task;
  const employeeProject = req.body.projects;
  const employeeToBeEdited = {
    id: employeeId,
    first_name: employeeName,
    last_name: employeeLastName,
    email: employeeEmail,
    task: employeeTask,
    password: employeePassword,
    projects: employeeProject,
  };
  let newEmployeesList = employees;
  newEmployeesList = newEmployeesList.map((employee) => {
    if (employee.id === employeeId) {
      return employeeToBeEdited;
    }
    return employee;
  });
  fs.writeFile('src/data/employees.json', JSON.stringify(newEmployeesList, null, 2), (err) => {
    if (err) {
      res.send('Cannot update employee');
    } else {
      res.send('Employee updated successfully');
    }
  });
});
