import React, { useState } from 'react';
import { Row, Col, Badge, Dropdown } from 'react-bootstrap';
import { MdAdd, MdSearch, MdFilterList, MdMoreVert } from 'react-icons/md';
import { useNavigate, useOutletContext } from 'react-router-dom';

const EmployeeList = () => {
  const { employees } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'On Leave': return 'status-leave';
      case 'Inactive': return 'status-inactive';
      default: return 'status-active';
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.dept === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="page-fade-in p-2">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Employee Directory</h2>
          <p className="text-muted small">Manage your organizational workforce and access profiles.</p>
        </div>
        <button 
          className="gradient-btn d-flex align-items-center gap-2"
          onClick={() => navigate('/employees/add')}
        >
          <MdAdd size={20} />
          <span>New Employee</span>
        </button>
      </div>

      {/* Filters Area */}
      <Row className="mb-4 g-3 stagger-1 page-fade-in position-relative" style={{ zIndex: 10 }}>
        <Col xs={12} md={6} lg={4}>
          <div className="position-relative">
            <MdSearch className="position-absolute text-muted" style={{top: '50%', left: '1rem', transform: 'translateY(-50%)'}} size={20} />
            <input 
              type="text" 
              className="modern-input ps-5" 
              placeholder="Search by name, role, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
        <Col xs={12} md={6} lg={8} className="d-flex justify-content-md-end">
          <Dropdown drop="up">
            <Dropdown.Toggle 
              variant="outline-secondary" 
              className="border-ghost text-on-surface d-flex align-items-center gap-2 px-3 py-2" 
              id="dropdown-filter-dept"
            >
              <MdFilterList size={20} /> 
              <span>{filterDept === 'All' ? 'Filter by Department' : filterDept}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu 
              style={{ 
                backgroundColor: 'var(--color-surface_container)', 
                borderColor: 'var(--border-ghost)',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), 0 0 5px rgba(255, 255, 255, 0.05)',
                marginBottom: '8px'
              }} 
              className="mt-0 py-2"
            >
              <Dropdown.Item 
                onClick={() => setFilterDept('All')} 
                className={`px-3 py-2 ${filterDept === 'All' ? 'fw-bold' : ''}`}
                style={{ 
                  color: 'var(--text-on-surface)',
                  backgroundColor: filterDept === 'All' ? 'var(--color-surface_lowest)' : 'transparent' 
                }}
                onMouseEnter={(e) => {
                  if (filterDept !== 'All') e.target.style.backgroundColor = 'var(--color-surface_container_highest)';
                }}
                onMouseLeave={(e) => {
                 if (filterDept !== 'All') e.target.style.backgroundColor = 'transparent';
                }}
              >
                All Departments
              </Dropdown.Item>
              
              <Dropdown.Divider style={{ borderColor: 'var(--border-ghost)' }} className="my-1" />
              
              {[...new Set(employees.map(emp => emp.dept))].map(dept => (
                <Dropdown.Item 
                  key={dept} 
                  onClick={() => setFilterDept(dept)} 
                  className={`px-3 py-2 ${filterDept === dept ? 'fw-bold' : ''}`}
                  style={{ 
                    color: 'var(--text-on-surface)',
                    backgroundColor: filterDept === dept ? 'var(--color-surface_lowest)' : 'transparent' 
                  }}
                  onMouseEnter={(e) => {
                   if (filterDept !== dept) e.target.style.backgroundColor = 'var(--color-surface_container_highest)';
                  }}
                  onMouseLeave={(e) => {
                   if (filterDept !== dept) e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  {dept}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Glassmorphism Data Table */}
      <div className="employee-table-container stagger-2 page-fade-in">
        <div className="table-responsive">
          <table className="employee-table">
            <thead>
              <tr>
                <th className="ps-4">Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr 
                  key={emp.id} 
                  className="employee-row"
                  onClick={() => navigate(`/employees/${emp.id}`)}
                >
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="employee-avatar shadow-sm overflow-hidden d-flex align-items-center justify-content-center" style={{backgroundColor: emp.bgColor}}>
                        {emp.photo ? (
                          <img src={emp.photo} alt={emp.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                          emp.avatar
                        )}
                      </div>
                      <div>
                        <div className="fw-bold text-on-surface">{emp.name}</div>
                        <div className="small text-muted">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-monospace text-muted small">{emp.id}</td>
                  <td>
                    <Badge bg="transparent" className="border border-ghost text-on-surface-variant px-3 py-2 fw-normal rounded-pill">
                      {emp.dept}
                    </Badge>
                  </td>
                  <td className="text-muted small">{emp.email}</td>
                  <td>
                    <span className={`status-pill ${getStatusClass(emp.status)}`}>
                      <span className="rounded-circle currentColor" style={{width: 6, height: 6, backgroundColor: 'currentColor'}}></span>
                      {emp.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button 
                      className="btn btn-link text-muted p-2" 
                      onClick={(e) => { e.stopPropagation(); /* Prevent row click */ }}
                    >
                      <MdMoreVert size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock footer */}
        <div className="p-3 border-top border-ghost d-flex justify-content-between align-items-center bg-surface-lowest flex-wrap gap-3">
          <span className="small text-muted">Showing 1 to {employees.length} of {employees.length} employees</span>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-dark bg-surface-container border-0 text-muted disabled">Previous</button>
            <button className="btn btn-sm btn-dark bg-surface-container-high border-ghost text-on-surface">1</button>
            <button className="btn btn-sm btn-dark bg-surface-container border-0 text-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
