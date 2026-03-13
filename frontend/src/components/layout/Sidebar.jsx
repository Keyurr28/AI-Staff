import React from 'react';
import { NavLink } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { 
  MdDashboard, 
  MdPeople, 
  MdEventAvailable, 
  MdPayments, 
  MdBusinessCenter, 
  MdBarChart, 
  MdSettings 
} from 'react-icons/md';
import './layout.css';

const NavigationLinks = () => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
    { name: 'Employees', path: '/employees', icon: <MdPeople /> },
    { name: 'Attendance', path: '/attendance', icon: <MdEventAvailable /> },
    { name: 'Payroll', path: '/payroll', icon: <MdPayments /> },
    { name: 'Departments', path: '/departments', icon: <MdBusinessCenter /> },
    { name: 'Reports', path: '/reports', icon: <MdBarChart /> },
    { name: 'Settings', path: '/settings', icon: <MdSettings /> },
  ];

  return (
    <div className="nav-links d-flex flex-column gap-2 mt-4">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) => 
            `nav-item d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none ${
              isActive ? 'active' : ''
            }`
          }
        >
          <span className="nav-icon fs-5">{link.icon}</span>
          <span className="nav-text fw-medium">{link.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

const UserProfile = () => (
  <div className="user-profile mt-auto p-3 d-flex align-items-center gap-3 rounded-3">
    <div className="avatar rounded-2 d-flex align-items-center justify-content-center fw-bold">
      AV
    </div>
    <div className="user-info">
      <div className="fw-semibold text-white">Amitabh Verma</div>
      <div className="text-muted small">Chief Operations</div>
    </div>
  </div>
);

const SidebarContent = () => (
  <div className="sidebar-content h-100 d-flex flex-column p-4">
    <div className="logo-section d-flex align-items-center gap-3 mb-2">
      <div className="logo-icon rounded shadow d-flex align-items-center justify-content-center text-white">
        <MdDashboard size={20} />
      </div>
      <div>
        <h6 className="m-0 fw-bold text-white">StaffManager</h6>
        <small className="text-muted">Admin Console</small>
      </div>
    </div>
    
    <NavigationLinks />
    <UserProfile />
  </div>
);

const Sidebar = ({ showMobile, onHideMobile }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar desktop-sidebar d-none d-lg-block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Offcanvas 
        show={showMobile} 
        onHide={onHideMobile} 
        className="mobile-sidebar"
        placement="start"
      >
        <Offcanvas.Header closeButton closeVariant="white">
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <SidebarContent />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
