import './App.css';

import React, { useEffect, useState } from 'react';

import axios from 'axios'

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => {
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className="App container">
      <h1 className="my-4">Employee Table</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th className="col-employee-number">Employee Number</th>
            <th className="col-last-name">Last Name</th>
            <th className="col-first-name">First Name</th>
            <th className="col-extension">Extension</th>
            <th className="col-email">Email</th>
            <th className="col-office-code">Office Code</th>
            <th className="col-job-title">Job Title</th>
            <th className="col-city">City</th>
            <th className="col-phone">Phone</th>
            <th className="col-reports-to">Reports To</th>
            <th className="col-reports-to-last-name">Reports To Last Name</th>
            <th className="col-reports-to-first-name">Reports To First Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.employeeNumber}>
              <td className="col-employee-number">{employee.employeeNumber}</td>
              <td className="col-last-name">{employee.lastName}</td>
              <td className="col-first-name">{employee.firstName}</td>
              <td className="col-extension">{employee.extension}</td>
              <td className="col-email">{employee.email}</td>
              <td className="col-office-code">{employee.officeCode}</td>
              <td className="col-job-title">{employee.jobTitle}</td>
              <td className="col-city">{employee.city}</td>
              <td className="col-phone">{employee.phone}</td>
              <td className="col-reports-to">{employee.reportsTo}</td>
              <td className="col-reports-to-last-name">{employee.reportToLastName}</td>
              <td className="col-reports-to-first-name">{employee.reportToFirstName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
