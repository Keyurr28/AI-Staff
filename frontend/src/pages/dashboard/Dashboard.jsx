import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { MdPeopleOutline, MdCheckCircleOutline, MdWorkOutline, MdWarningAmber, MdEventNote, MdArrowForward } from 'react-icons/md';
import './dashboard.css';

// Mock Data for future Mongo integration
const mockStats = {
  totalEmployees: { value: '1,284', trend: '+2.4%', label: 'vs last month' },
  attendanceRate: { value: '94.2%', status: 'Stable' },
  openPositions: { value: '12' }
};

const mockAlerts = [
  { id: 1, type: 'error', icon: <MdWarningAmber />, title: 'Payroll Discrepancy', desc: 'Detected $420 mismatch in Q3 engineering payroll. Action required.', actionText: 'REVIEW AUDIT' },
  { id: 2, type: 'warning', icon: <MdEventNote />, title: 'New Leave Requests', desc: '3 pending medical leave requests awaiting executive sign-off.', actionText: 'MANAGE REQUESTS' }
];

const mockActivity = [
  { id: 1, name: 'Priya Sharma', role: 'Product Design Lead', avatar: 'PS', status: 'online', lastActivity: 'Updated Q4 Roadmap', dept: 'Product & UX' },
  { id: 2, name: 'Rahul Patel', role: 'Senior Cloud Architect', avatar: 'RP', status: 'online', lastActivity: 'Migration Success', dept: 'Cloud Systems' },
  { id: 3, name: 'Aditi Desai', role: 'Junior Accountant', avatar: 'AD', status: 'away', lastActivity: 'Audit Submission', dept: 'Finance Ops' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* Top Stat Cards Section */}
      <Row className="g-4 mb-4">
        {/* Total Employees Card */}
        <Col xs={12} md={6} lg={4}>
          <div className="stat-card p-4 rounded-4 shadow-sm custom-card d-flex justify-content-between h-100">
            <div>
              <p className="stat-label fw-bold mb-2 text-uppercase">Total Employees</p>
              <h2 className="stat-value display-5 fw-bold mb-3">{mockStats.totalEmployees.value}</h2>
              <p className="stat-trend m-0 small">
                <span className="text-success fw-bold">{mockStats.totalEmployees.trend}</span>
                <span className="text-muted ms-2">{mockStats.totalEmployees.label}</span>
              </p>
            </div>
            <div className="stat-icon-wrapper rounded p-3 align-self-start bg-secondary-container text-on-secondary-container">
              <MdPeopleOutline size={28} />
            </div>
          </div>
        </Col>

        {/* Attendance Rate Card */}
        <Col xs={12} md={6} lg={4}>
          <div className="stat-card p-4 rounded-4 shadow-sm custom-card d-flex justify-content-between h-100">
            <div>
              <p className="stat-label fw-bold mb-2 text-uppercase">Attendance Rate</p>
              <h2 className="stat-value display-5 fw-bold mb-3">{mockStats.attendanceRate.value}</h2>
              <div className="d-flex align-items-center gap-3">
                <div className="progress-bar flex-grow-1 bg-surface-lowest rounded-pill overflow-hidden" style={{height: '6px'}}>
                  <div className="bg-success h-100 w-75 rounded-pill"></div>
                </div>
                <span className="text-muted small">{mockStats.attendanceRate.status}</span>
              </div>
            </div>
            <div className="stat-icon-wrapper rounded p-3 align-self-start text-success" style={{backgroundColor: 'rgba(25, 135, 84, 0.1)'}}>
              <MdCheckCircleOutline size={28} />
            </div>
          </div>
        </Col>

        {/* Open Positions Card */}
        <Col xs={12} lg={4}>
          <div className="stat-card stat-card-primary p-4 rounded-4 shadow-sm text-on-primary-container h-100 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between">
              <div>
                <p className="stat-label fw-bold mb-2 text-uppercase text-on-primary-container opacity-75">Open Positions</p>
                <h2 className="stat-value display-5 fw-bold text-on-primary-container mb-0">{mockStats.openPositions.value}</h2>
              </div>
              <div className="stat-icon-wrapper rounded p-3 align-self-start bg-white bg-opacity-25">
                <MdWorkOutline size={28} />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-sm bg-white bg-opacity-25 text-on-primary-container rounded-pill px-3 fw-medium d-flex align-items-center gap-2 border-0 w-auto">
                View Pipeline <MdArrowForward />
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Middle Section: Chart & Alerts */}
      <Row className="g-4 mb-4">
        {/* Organizational Pulse Chart */}
        <Col xs={12} xl={8}>
          <div className="custom-card p-4 rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold m-0">Organizational Pulse</h5>
                <small className="text-muted">Weekly attendance trends across all departments</small>
              </div>
              <div className="btn-group rounded-3 border-ghost overflow-hidden">
                <button className="btn btn-sm btn-dark bg-surface-container-highest border-0 text-white px-3">7D</button>
                <button className="btn btn-sm btn-dark bg-transparent border-0 text-muted px-3">30D</button>
              </div>
            </div>
            
            {/* Chart Placeholder Area */}
            <div className="chart-placeholder d-flex flex-column justify-content-end pb-2 pt-5 position-relative">
               {/* Horizontal Grid lines */}
               <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between py-4" style={{top: 0, left: 0, zIndex: 0}}>
                 {[1,2,3,4].map(i => <div key={i} className="border-bottom border-ghost w-100"></div>)}
               </div>
               
               {/* X-Axis labels */}
               <div className="d-flex justify-content-between text-muted small px-3 position-relative z-1" style={{fontSize: '10px'}}>
                 {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => <span key={day}>{day}</span>)}
               </div>
               

            </div>
          </div>
        </Col>

        {/* Compliance Alerts */}
        <Col xs={12} xl={4}>
          <div className="custom-card p-4 rounded-4 shadow-sm h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold m-0">Compliance Alerts</h5>
              <div className="notification-dot bg-error rounded-circle" style={{width: 8, height: 8}}></div>
            </div>

            <div className="alerts-list d-flex flex-column gap-3 mb-4 flex-grow-1">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="alert-item p-3 rounded-3 bg-surface-lowest border border-ghost d-flex gap-3">
                  <div className={`alert-icon rounded d-flex align-items-center justify-content-center flex-shrink-0 ${alert.type === 'error' ? 'text-error bg-error-container' : 'text-warning bg-warning bg-opacity-10'}`} style={{width: 40, height: 40}}>
                    {alert.icon}
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 fs-6">{alert.title}</h6>
                    <p className="text-muted small mb-2 lh-sm">{alert.desc}</p>
                    <button className="btn btn-link p-0 text-decoration-none small text-on-surface fw-bold" style={{fontSize: '11px', letterSpacing: '1px'}}>{alert.actionText}</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-dark w-100 py-2 border-ghost bg-surface-container-highest fw-medium rounded-3 text-muted">VIEW ALL ALERTS</button>
          </div>
        </Col>
      </Row>

      {/* Recent Staff Activity */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h5 className="fw-bold m-0">Recent Staff Activity</h5>
            <small className="text-muted">Real-time updates from your leadership team</small>
          </div>
          <button 
            className="btn btn-link text-decoration-none text-on-surface p-0 d-flex align-items-center gap-1"
            onClick={() => window.location.href = '/employees'}
          >
            View Directory <MdArrowForward />
          </button>
        </div>

        <Row className="g-4">
          {mockActivity.map(staff => (
            <Col xs={12} md={6} xl={4} key={staff.id}>
              <div className="custom-card p-4 rounded-4 shadow-sm">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="position-relative">
                    <div className="avatar-lg rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold fs-5 shadow" style={{width: 50, height: 50}}>
                      {staff.avatar}
                    </div>
                    <div className={`position-absolute bottom-0 end-0 rounded-circle border border-surface bg-${staff.status === 'online' ? 'success' : 'warning'}`} style={{width: 12, height: 12}}></div>
                  </div>
                  <div>
                    <h6 className="fw-bold m-0">{staff.name}</h6>
                    <small className="text-primary">{staff.role}</small>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mb-4 small">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Last Activity</span>
                    <span className="text-on-surface fw-medium">{staff.lastActivity}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Department</span>
                    <span className="text-on-surface fw-medium">{staff.dept}</span>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-dark bg-surface-lowest border-0 flex-grow-1 text-on-surface-variant fw-medium rounded-2" onClick={() => window.location.href = `/employees/${staff.id}`}>PROFILE</button>
                  <button className="btn btn-dark bg-surface-lowest border-0 rounded-2 text-on-surface-variant d-flex align-items-center justify-content-center" style={{width: 40}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className="footer text-center py-4 border-top border-ghost mt-5">
        <small className="text-muted">© 2024 StaffManager Executive Console • Data synced 2m ago</small>
      </div>
    </div>
  );
};

export default Dashboard;
