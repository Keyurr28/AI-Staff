import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees';
import EmployeeList from './pages/employees/EmployeeList';
import AddEmployee from './pages/employees/AddEmployee';
import EditEmployee from './pages/employees/EditEmployee';
import EmployeeProfile from './pages/employees/EmployeeProfile';
import Attendance from './pages/attendance/Attendance';
import Payroll from './pages/payroll/Payroll';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="employees" element={<Employees />}>
            <Route index element={<EmployeeList />} />
            <Route path="add" element={<AddEmployee />} />
            <Route path=":id" element={<EmployeeProfile />} />
            <Route path=":id/edit" element={<EditEmployee />} />
          </Route>

          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="departments" element={<div className="p-4">Departments View</div>} />
          <Route path="reports" element={<div className="p-4">Reports View</div>} />
          <Route path="settings" element={<div className="p-4">Settings View</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
