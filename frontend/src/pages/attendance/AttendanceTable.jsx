import React from 'react';
import { MdMoreVert } from 'react-icons/md';

const AttendanceTable = ({ data }) => {

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Present':
        return <span className="status-pill-new present"><span className="dot"></span>PRESENT</span>;
      case 'Absent':
        return <span className="status-pill-new absent"><span className="dot"></span>ABSENT</span>;
      case 'Late':
        return <span className="status-pill-new late"><span className="dot"></span>LATE IN</span>;
      case 'Half Day':
        return <span className="status-pill-new halfday"><span className="dot"></span>HALF DAY</span>;
      default:
        return <span className="status-pill-new present"><span className="dot"></span>{status.toUpperCase()}</span>;
    }
  };

  return (
    <div className="attendance-table-container stagger-2 mb-4">
      <div className="table-responsive">
        <table className="attendance-new-table">
          <thead>
            <tr>
              <th className="ps-4">EMPLOYEE</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>CHECK IN</th>
              <th>CHECK OUT</th>
              <th>HOURS</th>
              <th className="text-end pe-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record.id}>
                <td className="ps-4">
                  <div className="d-flex align-items-center gap-3">
                    {record.avatarImg ? (
                      <img src={record.avatarImg} alt={record.name} className="employee-avatar-new rounded-circle" />
                    ) : (
                      <div className="employee-avatar-new rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{backgroundColor: record.bgColor, color: '#fff'}}>
                        {record.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="fw-bold text-on-surface mb-1" style={{fontSize: '0.90rem'}}>{record.name}</div>
                      <div className="text-muted" style={{fontSize: '0.70rem'}}>ID: {record.empId}</div>
                    </div>
                  </div>
                </td>
                <td className="text-muted" style={{fontSize: '0.80rem'}}>{record.role}</td>
                <td>{getStatusBadge(record.status)}</td>
                <td className="text-on-surface" style={{fontSize: '0.80rem'}}>{record.checkIn || '-:-'}</td>
                <td className="text-on-surface" style={{fontSize: '0.80rem'}}>{record.checkOut || '-:-'}</td>
                <td className="text-on-surface" style={{fontSize: '0.80rem'}}>{record.hours}</td>
                <td className="text-end pe-4">
                  <button className="btn btn-link text-muted p-2">
                    <MdMoreVert size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <span className="text-muted" style={{fontSize: '0.80rem'}}>Showing 1 to 10 of 142 employees</span>
        <div className="pagination-new">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">15</button>
          <button className="page-btn">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
