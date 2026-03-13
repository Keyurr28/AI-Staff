import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './employees.css';

const initialEmployees = [
  { id: 'EMP001', name: 'Priya Sharma', role: 'Product Design Lead', dept: 'Product & UX', email: 'priya.s@staffops.com', status: 'Active', avatar: 'PS', bgColor: '#638aff' },
  { id: 'EMP002', name: 'Rahul Patel', role: 'Senior Cloud Architect', dept: 'Cloud Systems', email: 'rahul.p@staffops.com', status: 'Active', avatar: 'RP', bgColor: '#3a4a5f' },
  { id: 'EMP003', name: 'Aditi Desai', role: 'Junior Accountant', dept: 'Finance Ops', email: 'aditi.d@staffops.com', status: 'On Leave', avatar: 'AD', bgColor: '#b5c4ff' },
  { id: 'EMP004', name: 'Vikram Singh', role: 'Engineering Manager', dept: 'Core Platform', email: 'vikram.s@staffops.com', status: 'Active', avatar: 'VS', bgColor: '#222a3d' },
  { id: 'EMP005', name: 'Neha Gupta', role: 'HR Specialist', dept: 'Human Resources', email: 'neha.g@staffops.com', status: 'Inactive', avatar: 'NG', bgColor: '#171f33' },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);

  const addEmployee = (newEmployee) => {
    setEmployees([newEmployee, ...employees]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedEmployee } : emp));
  };

  return (
    <div className="employees-module w-100 h-100">
      <Outlet context={{ employees, addEmployee, updateEmployee }} />
    </div>
  );
};

export default Employees;
