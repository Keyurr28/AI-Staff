import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { MdFilterList, MdFileDownload, MdOfflineBolt, MdBadge, MdLocalHotel, MdLogout } from 'react-icons/md';
import AttendanceTable from './AttendanceTable';
import './attendance.css';

const attendanceData = [
  { id: '1', name: 'Aarav Sharma', empId: 'EMP-9021', role: 'Senior UI Designer', status: 'Present', checkIn: '09:12 AM', checkOut: '06:05 PM', hours: '8h 53m', avatarImg: 'https://i.pravatar.cc/150?img=11', date: 'Today' },
  { id: '2', name: 'Priya Patel', empId: 'EMP-8842', role: 'System Architect', status: 'Late', checkIn: '09:45 AM', checkOut: '06:12 PM', hours: '8h 27m', avatarImg: 'https://i.pravatar.cc/150?img=5', date: 'Today' },
  { id: '3', name: 'Vihaan Kumar', empId: 'EMP-1102', role: 'Philosophy Lead', status: 'Absent', checkIn: null, checkOut: null, hours: '0h 00m', avatarImg: 'https://i.pravatar.cc/150?img=12', date: 'Yesterday' },
  { id: '4', name: 'Diya Singh', empId: 'EMP-7654', role: 'Project Manager', status: 'Half Day', checkIn: '09:00 AM', checkOut: '01:30 PM', hours: '4h 30m', avatarImg: 'https://i.pravatar.cc/150?img=9', date: 'Today' },
];

const Attendance = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredData = attendanceData.filter(record => {
    // Mock time filtering logic (since we only have a tiny hardcoded dataset)
    const matchesTime = timeFilter === 'All Time' || 
                        (timeFilter === 'Today' && record.date === 'Today') ||
                        (timeFilter === 'Weekly') || // Show all for weekly/monthly in this mock
                        (timeFilter === 'Monthly');
    
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    
    return matchesTime && matchesStatus;
  });
  return (
    <div className="attendance-page p-3 pb-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 stagger-1">
        <div>
          <h3 className="fw-bold mb-1 text-on-surface">Daily Attendance Log</h3>
          <p className="text-muted small mb-0">Showing {filteredData.length} entries for Tuesday, Oct 24, 2023</p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
          <div className="toggle-group">
            <button className={`toggle-btn ${timeFilter === 'Today' ? 'active' : ''}`} onClick={() => setTimeFilter('Today')}>Today</button>
            <button className={`toggle-btn ${timeFilter === 'Weekly' ? 'active' : ''}`} onClick={() => setTimeFilter('Weekly')}>Weekly</button>
            <button className={`toggle-btn ${timeFilter === 'Monthly' ? 'active' : ''}`} onClick={() => setTimeFilter('Monthly')}>Monthly</button>
          </div>
          <Dropdown drop="down">
            <Dropdown.Toggle as="button" className="action-btn">
              <MdFilterList size={16} /> {statusFilter === 'All' ? 'Filter' : statusFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-surface-container border-ghost shadow mt-2">
              <Dropdown.Item onClick={() => setStatusFilter('All')} className="text-on-surface">All Statuses</Dropdown.Item>
              <Dropdown.Divider className="border-ghost" />
              <Dropdown.Item onClick={() => setStatusFilter('Present')} className="text-on-surface">Present</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('Late')} className="text-on-surface">Late</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('Absent')} className="text-on-surface">Absent</Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusFilter('Half Day')} className="text-on-surface">Half Day</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button className="export-btn">
            <MdFileDownload size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Table Section */}
      <AttendanceTable data={filteredData} />

      {/* Bottom Cards */}
      <Row className="g-4 stagger-3">
        {/* Real-time Activity Card */}
        <Col xs={12} lg={4}>
          <div className="activity-card">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2">
              <h6 className="fw-bold m-0 text-on-surface">Real-time Activity</h6>
              <MdOfflineBolt className="text-muted" size={20} />
            </div>
            
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-item-icon-box">
                  <MdBadge size={18} />
                  <span className="activity-status-dot dot-green"></span>
                </div>
                <div className="activity-content">
                  <div className="activity-text-main"><span className="fw-bold text-on-surface">Rohan Gupta</span> checked in</div>
                  <div className="activity-text-sub">2 minutes ago • Engineering</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-item-icon-box">
                  <MdLocalHotel size={18} />
                  <span className="activity-status-dot dot-yellow"></span>
                </div>
                <div className="activity-content">
                  <div className="activity-text-main"><span className="fw-bold text-on-surface">Neha Desai</span> requested sick leave</div>
                  <div className="activity-text-sub">15 minutes ago • Marketing</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-item-icon-box">
                  <MdLogout size={18} />
                  <span className="activity-status-dot dot-blue"></span>
                </div>
                <div className="activity-content">
                  <div className="activity-text-main"><span className="fw-bold text-on-surface">Kartik Verma</span> checked out</div>
                  <div className="activity-text-sub">1 hour ago • Operations</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-5">
              <a href="#" className="view-all-link">View All Activities</a>
            </div>
          </div>
        </Col>
        
        {/* Weekly Presence Overview Card */}
        <Col xs={12} lg={8}>
          <div className="chart-card">
            <div className="d-flex justify-content-between align-items-start border-bottom border-ghost pb-3">
              <div>
                <h6 className="fw-bold m-0 text-on-surface mb-1">Weekly Presence Overview</h6>
                <p className="text-muted mb-0" style={{fontSize:'0.70rem'}}>Aggregated data across all departments</p>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="border-ghost text-on-surface-variant d-flex align-items-center gap-1 px-3 py-1 bg-surface-lowest rounded" style={{fontSize: '0.75rem', border: 'none'}}>
                  Last 7 Days
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-surface-container border-ghost shadow">
                  <Dropdown.Item href="#" className="text-on-surface pb-2">Last 7 Days</Dropdown.Item>
                  <Dropdown.Item href="#" className="text-on-surface">Last 30 Days</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
            <div className="mock-bar-chart">
              {[
                { day: 'MON', height: '50%' },
                { day: 'TUE', height: '70%' },
                { day: 'WED', height: '60%' },
                { day: 'THU', height: '80%' },
                { day: 'FRI', height: '35%' },
                { day: 'SAT', height: '65%' },
                { day: 'SUN', height: '90%', active: true },
              ].map(item => (
                <div className="chart-bar-group" key={item.day}>
                  <div className={`chart-bar ${item.active ? 'active' : ''}`} style={{ height: item.height }}></div>
                  <div className="chart-label">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Attendance;
