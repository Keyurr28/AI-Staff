import React from 'react';
import { MdMoreVert } from 'react-icons/md';

const SalaryTable = ({ data }) => {
  const getBadge = (status) => {
    switch (status) {
      case 'Paid':
        return <span className="pay-badge paid"><span className="bdot"></span>Paid</span>;
      case 'Pending':
        return <span className="pay-badge pending"><span className="bdot"></span>Pending</span>;
      case 'Failed':
        return <span className="pay-badge failed"><span className="bdot"></span>Failed</span>;
      default:
        return null;
    }
  };

  const fmt = (n) =>
    '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });

  return (
    <div className="salary-table-wrap mb-4">
      <div className="table-responsive">
        <table className="salary-table">
          <thead>
            <tr>
              <th className="ps-4">Employee</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Pay Date</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.id}>
                <td className="ps-4">
                  <div className="d-flex align-items-center gap-3">
                    {emp.avatarImg ? (
                      <img src={emp.avatarImg} alt={emp.name} className="payroll-avatar" />
                    ) : (
                      <div className="payroll-avatar" style={{ background: emp.bgColor }}>
                        {emp.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.88rem' }}>{emp.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.70rem' }}>{emp.empId}</div>
                    </div>
                  </div>
                </td>
                <td className="text-muted" style={{ fontSize: '0.80rem' }}>{emp.dept}</td>
                <td className="amount-cell">{fmt(emp.basic)}</td>
                <td className="amount-cell" style={{ color: '#34d399' }}>+{fmt(emp.allowances)}</td>
                <td className="amount-cell" style={{ color: '#f87171' }}>−{fmt(emp.deductions)}</td>
                <td className="amount-cell fw-bold" style={{ color: '#b5c4ff' }}>{fmt(emp.net)}</td>
                <td>{getBadge(emp.status)}</td>
                <td className="text-muted" style={{ fontSize: '0.80rem' }}>{emp.payDate}</td>
                <td className="text-end pe-4">
                  <button className="btn btn-link text-muted p-1">
                    <MdMoreVert size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 d-flex justify-content-between align-items-center flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-ghost)' }}>
        <span className="text-muted" style={{ fontSize: '0.78rem' }}>
          Showing {data.length} of {data.length} employees
        </span>
        <div className="d-flex gap-2">
          {[1, 2, 3].map((n, i) => (
            <button key={n} className={`page-btn ${i === 0 ? 'active' : ''}`}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryTable;
