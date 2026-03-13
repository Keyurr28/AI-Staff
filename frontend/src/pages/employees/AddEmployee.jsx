import React, { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MdArrowBack, MdSave, MdPersonAddAlt1 } from 'react-icons/md';
import { useNavigate, useOutletContext } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployee } = useOutletContext();
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    employmentType: 'fulltime',
    manager: '',
    consoleAccess: true,
    mobileAccess: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in the required fields (First Name, Last Name, Email).");
      return;
    }
    
    setIsSaving(true);
    
    // Create new object mapping form data to employee table schema
    const deptMap = { engineering: 'Core Platform', design: 'Product & UX', hr: 'Human Resources', finance: 'Finance Ops' };
    const deptName = deptMap[formData.department] || formData.department || 'Unassigned';
    
    const colors = ['#638aff', '#3a4a5f', '#b5c4ff', '#222a3d'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newEmp = {
      id: `EMP00${Math.floor(Math.random() * 900) + 100}`,
      name: `${formData.firstName} ${formData.lastName}`,
      role: formData.jobTitle || 'Staff Member',
      dept: deptName,
      email: formData.email,
      status: 'Active',
      avatar: (formData.firstName.charAt(0) + formData.lastName.charAt(0)).toUpperCase(),
      bgColor: randomColor,
      photo: photoPreview
    };

    // Simulate API Call delay
    setTimeout(() => {
      addEmployee(newEmp);
      setIsSaving(false);
      navigate('/employees');
    }, 800);
  };

  return (
    <div className="page-fade-in p-2 pb-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-dark bg-surface-container border-ghost rounded-circle d-flex align-items-center justify-content-center" 
            style={{width: 40, height: 40}}
            onClick={() => navigate(-1)}
          >
            <MdArrowBack />
          </button>
          <h2 className="fw-bold mb-0">Onboard New Employee</h2>
        </div>
        
        <div className="d-flex gap-3">
          <button className="btn btn-outline-secondary border-ghost text-on-surface px-4 rounded-3 d-flex align-items-center gap-2" onClick={() => navigate(-1)} disabled={isSaving}>
            Cancel
          </button>
          <button className="gradient-btn d-flex align-items-center gap-2" onClick={handleSave} disabled={isSaving}>
            <MdSave /> <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Col - Identity Details */}
        <Col xs={12} xl={8}>
          <div className="custom-card p-4 p-md-5 rounded-4 stagger-1 page-fade-in">
            <h5 className="fw-bold mb-4 border-bottom border-ghost pb-3 d-flex align-items-center gap-2">
              <MdPersonAddAlt1 className="text-primary" /> Personal Information
            </h5>
            
            <Row className="g-4 mb-4">
              <Col md={6}>
                <label className="modern-label">First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="modern-input" placeholder="e.g. Jane" />
              </Col>
              <Col md={6}>
                <label className="modern-label">Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="modern-input" placeholder="e.g. Doe" />
              </Col>
            </Row>

            <Row className="g-4 mb-4">
              <Col md={6}>
                <label className="modern-label">Work Email address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="modern-input" placeholder="jane.doe@staffops.com" />
              </Col>
              <Col md={6}>
                <label className="modern-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="modern-input" placeholder="+1 (555) 000-0000" />
              </Col>
            </Row>

            <h5 className="fw-bold mb-4 mt-5 border-bottom border-ghost pb-3">Organizational Role</h5>
            
            <Row className="g-4">
              <Col md={6}>
                <label className="modern-label">Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} className="modern-input" placeholder="e.g. Senior Developer" />
              </Col>
              <Col md={6}>
                <label className="modern-label">Department</label>
                <select name="department" value={formData.department} onChange={handleInputChange} className="modern-input appearance-none">
                  <option value="" disabled>Select department...</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance Ops</option>
                </select>
              </Col>
              <Col md={6}>
                <label className="modern-label">Employment Type</label>
                <select name="employmentType" value={formData.employmentType} onChange={handleInputChange} className="modern-input">
                  <option value="fulltime">Full-Time</option>
                  <option value="parttime">Part-Time</option>
                  <option value="contractor">Contractor</option>
                </select>
              </Col>
              <Col md={6}>
                <label className="modern-label">Reports To (Manager)</label>
                <input type="text" name="manager" value={formData.manager} onChange={handleInputChange} className="modern-input" placeholder="Search managers..." />
              </Col>
            </Row>
          </div>
        </Col>

        {/* Right Col - Visual Settings & Access */}
        <Col xs={12} xl={4}>
          <div className="d-flex flex-column gap-4">
            {/* Profile Avatar Upload */}
            <div className="custom-card p-4 rounded-4 text-center stagger-2 page-fade-in">
              <h6 className="fw-bold mb-4 text-start">Profile Photo</h6>
              <div 
                className="mx-auto mb-4 bg-surface-container-low border border-ghost border-dashed rounded-circle d-flex align-items-center justify-content-center overflow-hidden position-relative cursor-pointer" 
                style={{width: 140, height: 140, borderStyle: 'dashed', cursor: 'pointer'}}
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                   <img src={photoPreview} alt="Profile Preview" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <div className="text-muted small">
                    <MdPersonAddAlt1 size={32} className="mb-2 opacity-50" /><br/>
                    Upload<br/>Image
                  </div>
                )}
                
                {/* Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handlePhotoUpload} 
                  accept="image/png, image/jpeg, image/gif" 
                  className="d-none" 
                />
              </div>
              <button 
                className="btn btn-outline-secondary border-ghost w-100 text-on-surface"
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? 'Change Photo' : 'Choose File'}
              </button>
              <p className="text-muted small mt-3">JPG, PNG or GIF. Max size 2MB.</p>
            </div>

            {/* System Access Card */}
            <div className="custom-card p-4 rounded-4 stagger-3 page-fade-in">
               <h6 className="fw-bold mb-4">System Access Configuration</h6>
               
               <div className="mb-3 d-flex justify-content-between align-items-center p-3 rounded bg-surface-lowest border border-ghost">
                  <div>
                    <div className="fw-medium">Console Login</div>
                    <div className="small text-muted">Grant admin dashboard access</div>
                  </div>
                  <div className="form-check form-switch m-0 pb-1">
                    <input className="form-check-input mt-0 cursor-pointer" type="checkbox" role="switch" name="consoleAccess" checked={formData.consoleAccess} onChange={handleInputChange} style={{cursor: 'pointer'}} />
                  </div>
               </div>

               <div className="mb-3 d-flex justify-content-between align-items-center p-3 rounded bg-surface-lowest border border-ghost">
                  <div>
                    <div className="fw-medium">Mobile App Access</div>
                    <div className="small text-muted">Allow staff app login</div>
                  </div>
                  <div className="form-check form-switch m-0 pb-1">
                    <input className="form-check-input mt-0 cursor-pointer" type="checkbox" role="switch" name="mobileAccess" checked={formData.mobileAccess} onChange={handleInputChange} style={{cursor: 'pointer'}} />
                  </div>
               </div>

            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddEmployee;
