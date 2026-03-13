import React from 'react';
import { Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { MdSearch, MdNotifications, MdSettings, MdMenu } from 'react-icons/md';

const Topbar = ({ toggleMobileSidebar }) => {
  return (
    <Navbar className="topbar px-4 py-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <Button 
          variant="link" 
          className="d-lg-none text-white p-0" 
          onClick={toggleMobileSidebar}
        >
          <MdMenu size={28} />
        </Button>
        <Form className="search-form d-none d-md-block">
          <InputGroup>
            <InputGroup.Text className="search-icon-bg border-0">
              <MdSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search data, staff or files..."
              className="search-input border-0 shadow-none text-white"
            />
          </InputGroup>
        </Form>
      </div>

      <div className="topbar-actions d-flex align-items-center gap-4">
        <span className="d-none d-lg-block fw-medium text-muted">Management Dashboard</span>
        <div className="d-flex gap-3">
          <Button variant="link" className="text-muted p-0 action-btn">
            <MdNotifications size={22} />
          </Button>
          <Button variant="link" className="text-muted p-0 action-btn">
            <MdSettings size={22} />
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default Topbar;
