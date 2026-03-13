import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Container } from 'react-bootstrap';

const DashboardLayout = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="dashboard-layout d-flex w-100 vh-100">
      <Sidebar 
        showMobile={showMobileSidebar} 
        onHideMobile={() => setShowMobileSidebar(false)} 
      />
      <div className="main-content d-flex flex-column flex-grow-1 overflow-auto">
        <Topbar toggleMobileSidebar={() => setShowMobileSidebar(true)} />
        <Container fluid className="px-4 py-4 content-container">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;
