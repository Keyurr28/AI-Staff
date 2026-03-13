import React from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MdArrowBack, MdEmail, MdPhone, MdLocationOn, MdEdit, MdMoreHoriz } from 'react-icons/md';

const mockProfileData = {
  id: 'EMP001', name: 'Priya Sharma', role: 'Product Design Lead', dept: 'Product & UX', 
  email: 'priya.s@staffops.com', phone: '+91 98765 43210', location: 'Bengaluru, India',
  status: 'Active', avatar: 'PS', bgColor: '#638aff',
  joinDate: 'Oct 12, 2021', manager: 'Amitabh Verma',
  stats: { projects: 12, leaveBalance: 14, attendance: '98%' }
};

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { employees } = useOutletContext();
  
  const ctxProfile = employees?.find(e => e.id === id);
  const profile = ctxProfile ? { ...mockProfileData, ...ctxProfile } : mockProfileData;

  return (
    <div className="page-fade-in pb-5">
      {/* Header Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <button 
          className="btn btn-dark bg-surface-container border-ghost rounded-circle d-flex align-items-center justify-content-center hover-scale" 
          style={{width: 40, height: 40}}
          onClick={() => navigate('/employees')}
        >
          <MdArrowBack />
        </button>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary border-ghost text-on-surface d-flex align-items-center gap-2"
            onClick={() => navigate(`/employees/${id}/edit`)}
          >
            <MdEdit /> Edit Profile
          </button>
          <button className="btn btn-dark bg-surface-container border-ghost text-muted">
            <MdMoreHoriz />
          </button>
        </div>
      </div>

      {/* Cover & Avatar Area */}
      <div className="custom-card rounded-4 border-ghost mb-4 overflow-visible stagger-1 page-fade-in shadow-sm">
        <div className="profile-cover"></div>
        <div className="px-5 pb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end position-relative">
          <div className="d-flex flex-column flex-md-row align-items-md-end gap-4">
            <div 
              className="profile-avatar-large shadow-lg d-flex align-items-center justify-content-center text-white fw-bold overflow-hidden"
              style={{backgroundColor: profile.bgColor}}
            >
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-100 h-100 object-fit-cover" />
              ) : (
                profile.avatar
              )}
            </div>
            <div className="pb-2">
              <h2 className="fw-bold m-0">{profile.name}</h2>
              <p className="text-primary m-0 fw-medium">{profile.role}</p>
            </div>
          </div>
          <div className="pb-2 mt-4 mt-md-0">
             <span className="status-pill status-active px-3 py-2 fs-6">
                <span className="rounded-circle currentColor" style={{width: 8, height: 8, backgroundColor: 'currentColor'}}></span>
                {profile.status}
             </span>
          </div>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Col - Details */}
        <Col xs={12} lg={4}>
          <div className="custom-card p-4 rounded-4 shadow-sm mb-4 stagger-2 page-fade-in">
            <h6 className="fw-bold mb-4 border-bottom border-ghost pb-2">Contact Info</h6>
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-surface-lowest p-2 rounded text-muted"><MdEmail size={20}/></div>
                <div><small className="text-muted d-block">Work Email</small><span className="text-on-surface">{profile.email}</span></div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-surface-lowest p-2 rounded text-muted"><MdPhone size={20}/></div>
                <div><small className="text-muted d-block">Phone Number</small><span className="text-on-surface">{profile.phone}</span></div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="bg-surface-lowest p-2 rounded text-muted"><MdLocationOn size={20}/></div>
                <div><small className="text-muted d-block">Location</small><span className="text-on-surface">{profile.location}</span></div>
              </div>
            </div>

            <h6 className="fw-bold mb-4 border-bottom border-ghost pb-2 mt-5">Organizational</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between">
                <span className="text-muted">Employee ID</span>
                <span className="text-on-surface fw-monospace">{profile.id}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Department</span>
                <span className="text-on-surface">{profile.dept}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Joined Date</span>
                <span className="text-on-surface">{profile.joinDate}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Direct Manager</span>
                <span className="text-primary fw-medium">{profile.manager}</span>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Col - Quick Stats & Activity Placeholder */}
        <Col xs={12} lg={8}>
          <Row className="g-4 mb-4 stagger-3 page-fade-in">
            <Col xs={12} md={4}>
              <div className="custom-card p-4 rounded-4 shadow-sm text-center">
                <h3 className="fw-bold display-6 mb-1 text-on-surface">{profile.stats.projects}</h3>
                <p className="text-muted small m-0 text-uppercase">Active Projects</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="custom-card p-4 rounded-4 shadow-sm text-center border-bottom border-warning border-3">
                <h3 className="fw-bold display-6 mb-1 text-on-surface">{profile.stats.leaveBalance}</h3>
                <p className="text-muted small m-0 text-uppercase">Leave Balance (Days)</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="custom-card p-4 rounded-4 shadow-sm text-center border-bottom border-success border-3">
                <h3 className="fw-bold display-6 mb-1 text-on-surface">{profile.stats.attendance}</h3>
                <p className="text-muted small m-0 text-uppercase">12mo Attendance</p>
              </div>
            </Col>
          </Row>

          <div className="custom-card p-4 rounded-4 shadow-sm stagger-3 page-fade-in h-100 placeholder-glow">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold m-0">Recent Timeline</h6>
            </div>
            {/* Timeline UI Placeholder */}
            <div className="position-relative ps-4 ms-2 py-2 border-start border-ghost">
              <div className="mb-4 position-relative">
                <span className="position-absolute bg-primary rounded-circle" style={{width: 12, height:12, left: '-27px', top: '4px'}}></span>
                <div className="fw-medium text-on-surface">Submitted Q3 Performance Review</div>
                <div className="small text-muted">2 days ago • HR Platform</div>
              </div>
              <div className="mb-4 position-relative opacity-75">
                <span className="position-absolute bg-surface-lowest border border-ghost rounded-circle" style={{width: 12, height:12, left: '-27px', top: '4px'}}></span>
                <div className="fw-medium text-on-surface">Completed Security Compliance Training</div>
                <div className="small text-muted">1 week ago • Learning Hub</div>
              </div>
              <div className="position-relative opacity-50">
                <span className="position-absolute bg-surface-lowest border border-ghost rounded-circle" style={{width: 12, height:12, left: '-27px', top: '4px'}}></span>
                <div className="fw-medium text-on-surface">Promoted to Product Design Lead</div>
                <div className="small text-muted">Jan 15, 2024 • Management</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeProfile;
