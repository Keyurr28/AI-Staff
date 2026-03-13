import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown, Modal } from 'react-bootstrap';
import {
  MdAccountBalanceWallet, MdCheckCircle, MdPending,
  MdReceipt, MdFileDownload, MdSearch, MdFilterList,
  MdPlayArrow, MdClose, MdVerified, MdTrendingUp,
} from 'react-icons/md';
import SalaryTable from './SalaryTable';
import './payroll.css';

/* ── Period-aware dataset ────────────────────────────────────────── */
const periodData = {
  Weekly: {
    label: 'Week 10, 2025',
    lastRun: '08 Mar 2025',
    employees: [
      { id: '1', name: 'Aarav Sharma',  empId: 'EMP-9021', dept: 'Product & UX',    basic: 18750, allowances: 4500, deductions: 2375, net: 20875, status: 'Paid',    payDate: '08 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Priya Patel',   empId: 'EMP-8842', dept: 'Core Platform',   basic: 23750, allowances: 5500, deductions: 3125, net: 26125, status: 'Paid',    payDate: '08 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=5'  },
      { id: '3', name: 'Vihaan Kumar',  empId: 'EMP-1102', dept: 'Human Resources', basic: 13000, allowances: 3000, deductions: 1800, net: 14200, status: 'Pending', payDate: '10 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Diya Singh',    empId: 'EMP-7654', dept: 'Product & UX',    basic: 17000, allowances: 3750, deductions: 2200, net: 18550, status: 'Paid',    payDate: '08 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=9'  },
    ],
    deptBreakdown: [
      { name: 'Core Platform',   total: 54625,  pct: 90, color: '#b5c4ff' },
      { name: 'Product & UX',    total: 39425,  pct: 72, color: '#34d399' },
      { name: 'Cloud Systems',   total: 24250,  pct: 58, color: '#faad14' },
      { name: 'Finance Ops',     total: 16725,  pct: 42, color: '#f87171' },
      { name: 'Human Resources', total: 14200,  pct: 35, color: '#a78bfa' },
    ],
  },
  Monthly: {
    label: 'March 2025',
    lastRun: '01 Mar 2025',
    employees: [
      { id: '1', name: 'Aarav Sharma',  empId: 'EMP-9021', dept: 'Product & UX',    basic: 75000,  allowances: 18000, deductions: 9500,  net: 83500,  status: 'Paid',    payDate: '01 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Priya Patel',   empId: 'EMP-8842', dept: 'Core Platform',   basic: 95000,  allowances: 22000, deductions: 12500, net: 104500, status: 'Paid',    payDate: '01 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=5'  },
      { id: '3', name: 'Vihaan Kumar',  empId: 'EMP-1102', dept: 'Human Resources', basic: 52000,  allowances: 12000, deductions: 7200,  net: 56800,  status: 'Pending', payDate: '05 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Diya Singh',    empId: 'EMP-7654', dept: 'Product & UX',    basic: 68000,  allowances: 15000, deductions: 8800,  net: 74200,  status: 'Paid',    payDate: '01 Mar 2025', avatarImg: 'https://i.pravatar.cc/150?img=9'  },
      { id: '5', name: 'Rohan Gupta',   empId: 'EMP-3310', dept: 'Cloud Systems',   basic: 88000,  allowances: 20000, deductions: 11000, net: 97000,  status: 'Pending', payDate: '05 Mar 2025', bgColor: '#0ea5e9' },
      { id: '6', name: 'Neha Desai',    empId: 'EMP-4421', dept: 'Finance Ops',     basic: 61000,  allowances: 14000, deductions: 8100,  net: 66900,  status: 'Paid',    payDate: '01 Mar 2025', bgColor: '#a855f7' },
      { id: '7', name: 'Kartik Verma',  empId: 'EMP-5530', dept: 'Core Platform',   basic: 105000, allowances: 24000, deductions: 15000, net: 114000, status: 'Failed',  payDate: '01 Mar 2025', bgColor: '#f59e0b' },
      { id: '8', name: 'Ananya Reddy',  empId: 'EMP-6641', dept: 'Human Resources', basic: 47000,  allowances: 10000, deductions: 6200,  net: 50800,  status: 'Paid',    payDate: '01 Mar 2025', bgColor: '#10b981' },
    ],
    deptBreakdown: [
      { name: 'Core Platform',   total: 218500, pct: 92, color: '#b5c4ff' },
      { name: 'Product & UX',    total: 157700, pct: 75, color: '#34d399' },
      { name: 'Cloud Systems',   total: 97000,  pct: 60, color: '#faad14' },
      { name: 'Finance Ops',     total: 66900,  pct: 45, color: '#f87171' },
      { name: 'Human Resources', total: 107600, pct: 55, color: '#a78bfa' },
    ],
  },
  Quarterly: {
    label: 'Q1 2025 (Jan–Mar)',
    lastRun: '01 Jan 2025',
    employees: [
      { id: '1', name: 'Aarav Sharma',  empId: 'EMP-9021', dept: 'Product & UX',    basic: 225000, allowances: 54000, deductions: 28500, net: 250500, status: 'Paid',    payDate: '01 Jan 2025', avatarImg: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Priya Patel',   empId: 'EMP-8842', dept: 'Core Platform',   basic: 285000, allowances: 66000, deductions: 37500, net: 313500, status: 'Paid',    payDate: '01 Jan 2025', avatarImg: 'https://i.pravatar.cc/150?img=5'  },
      { id: '3', name: 'Vihaan Kumar',  empId: 'EMP-1102', dept: 'Human Resources', basic: 156000, allowances: 36000, deductions: 21600, net: 170400, status: 'Pending', payDate: '15 Jan 2025', avatarImg: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Diya Singh',    empId: 'EMP-7654', dept: 'Product & UX',    basic: 204000, allowances: 45000, deductions: 26400, net: 222600, status: 'Paid',    payDate: '01 Jan 2025', avatarImg: 'https://i.pravatar.cc/150?img=9'  },
    ],
    deptBreakdown: [
      { name: 'Core Platform',   total: 655500, pct: 95, color: '#b5c4ff' },
      { name: 'Product & UX',    total: 473100, pct: 80, color: '#34d399' },
      { name: 'Cloud Systems',   total: 291000, pct: 65, color: '#faad14' },
      { name: 'Finance Ops',     total: 200700, pct: 50, color: '#f87171' },
      { name: 'Human Resources', total: 322800, pct: 60, color: '#a78bfa' },
    ],
  },
  Yearly: {
    label: 'FY 2024–25',
    lastRun: '01 Apr 2024',
    employees: [
      { id: '1', name: 'Aarav Sharma',  empId: 'EMP-9021', dept: 'Product & UX',    basic: 900000, allowances: 216000, deductions: 114000, net: 1002000, status: 'Paid',    payDate: '01 Apr 2024', avatarImg: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Priya Patel',   empId: 'EMP-8842', dept: 'Core Platform',   basic: 1140000,allowances: 264000, deductions: 150000, net: 1254000, status: 'Paid',    payDate: '01 Apr 2024', avatarImg: 'https://i.pravatar.cc/150?img=5'  },
      { id: '3', name: 'Vihaan Kumar',  empId: 'EMP-1102', dept: 'Human Resources', basic: 624000, allowances: 144000, deductions: 86400,  net: 681600,  status: 'Paid',    payDate: '01 Apr 2024', avatarImg: 'https://i.pravatar.cc/150?img=12' },
      { id: '4', name: 'Diya Singh',    empId: 'EMP-7654', dept: 'Product & UX',    basic: 816000, allowances: 180000, deductions: 105600, net: 890400,  status: 'Pending', payDate: '01 Apr 2024', avatarImg: 'https://i.pravatar.cc/150?img=9'  },
    ],
    deptBreakdown: [
      { name: 'Core Platform',   total: 2622000, pct: 100, color: '#b5c4ff' },
      { name: 'Product & UX',    total: 1892400, pct: 85,  color: '#34d399' },
      { name: 'Cloud Systems',   total: 1164000, pct: 70,  color: '#faad14' },
      { name: 'Finance Ops',     total: 802800,  pct: 55,  color: '#f87171' },
      { name: 'Human Resources', total: 1291200, pct: 65,  color: '#a78bfa' },
    ],
  },
};

const upcomingSchedule = [
  { label: 'April 2025 Full Run', date: '01 Apr 2025', count: 158, color: '#34d399' },
  { label: 'Q2 Quarterly Bonus',  date: '15 Apr 2025', count: 48,  color: '#b5c4ff' },
  { label: 'May 2025 Full Run',   date: '01 May 2025', count: 160, color: '#faad14' },
];

const RUN_STEPS = [
  'Validating employee records…',
  'Calculating salaries & deductions…',
  'Processing bank transfers…',
  'Sending payslip notifications…',
  'Updating payroll ledger…',
  'Done! Payroll completed successfully.',
];

/* ── Helpers ─────────────────────────────────────────────────────── */
const fmtINR  = (n) => '₹' + Number(n).toLocaleString('en-IN');
const fmtKLCr = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
};

const exportCSV = (employees, period) => {
  const header = 'Employee,Emp ID,Department,Basic,Allowances,Deductions,Net Pay,Status,Pay Date';
  const rows = employees.map(e =>
    `"${e.name}","${e.empId}","${e.dept}",${e.basic},${e.allowances},${e.deductions},${e.net},"${e.status}","${e.payDate}"`
  );
  const csv  = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `payroll_${period.toLowerCase()}_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/* ── Component ───────────────────────────────────────────────────── */
const Payroll = () => {
  const [period,        setPeriod]        = useState('Monthly');
  const [statusFilter,  setStatusFilter]  = useState('All');
  const [search,        setSearch]        = useState('');

  /* Run Payroll modal state */
  const [showModal,     setShowModal]     = useState(false);
  const [runStep,       setRunStep]       = useState(0);
  const [runDone,       setRunDone]       = useState(false);

  const pData    = periodData[period];
  const empList  = pData.employees;

  const totalPayout  = empList.reduce((s, e) => s + e.net, 0);
  const totalPaid    = empList.filter(e => e.status === 'Paid').reduce((s, e) => s + e.net, 0);
  const totalPending = empList.filter(e => e.status === 'Pending').reduce((s, e) => s + e.net, 0);
  const totalTax     = empList.reduce((s, e) => s + e.deductions, 0);

  const filtered = empList.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                        emp.empId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || emp.status === statusFilter;
    return matchSearch && matchStatus;
  });

  /* Animated run payroll steps */
  const handleRunPayroll = () => {
    setRunStep(0);
    setRunDone(false);
    setShowModal(true);
  };

  useEffect(() => {
    if (!showModal || runDone) return;
    const t = setTimeout(() => {
      if (runStep >= RUN_STEPS.length - 1) {
        setRunDone(true);
      } else {
        setRunStep(s => s + 1);
      }
    }, 900);
    return () => clearTimeout(t);
  }, [showModal, runStep, runDone]);

  return (
    <div className="payroll-page p-3 pb-5">

      {/* ── Header ── */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 stagger-1">
        <div>
          <h3 className="fw-bold mb-1">Payroll Management</h3>
          <p className="text-muted small mb-0">
            {pData.label} · {empList.length} employees · Last run {pData.lastRun}
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0 flex-wrap">
          <div className="period-toggle">
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map(p => (
              <button
                key={p}
                className={`period-btn ${period === p ? 'active' : ''}`}
                onClick={() => { setPeriod(p); setStatusFilter('All'); setSearch(''); }}
              >{p}</button>
            ))}
          </div>
          <button className="export-payroll-btn" onClick={() => exportCSV(filtered, period)}>
            <MdFileDownload size={16} /> Export CSV
          </button>
          <button className="run-payroll-btn" onClick={handleRunPayroll}>
            <MdPlayArrow size={18} /> Run Payroll
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <Row className="g-4 mb-4 stagger-2">
        <Col xs={12} sm={6} xl={3}>
          <div className="payroll-stat-card psc-total">
            <div className="psc-icon"><MdAccountBalanceWallet /></div>
            <div className="psc-label">Total Payout</div>
            <div className="psc-value">{fmtKLCr(totalPayout)}</div>
            <div className="psc-trend"><span style={{color:'#34d399'}}>↑ 3.2%</span> vs last {period.toLowerCase()}</div>
          </div>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <div className="payroll-stat-card psc-paid">
            <div className="psc-icon"><MdCheckCircle /></div>
            <div className="psc-label">Paid Out</div>
            <div className="psc-value">{fmtKLCr(totalPaid)}</div>
            <div className="psc-trend">{empList.filter(e => e.status === 'Paid').length} employees settled</div>
          </div>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <div className="payroll-stat-card psc-pending">
            <div className="psc-icon"><MdPending /></div>
            <div className="psc-label">Pending</div>
            <div className="psc-value">{fmtKLCr(totalPending)}</div>
            <div className="psc-trend">{empList.filter(e => e.status === 'Pending').length} pending transfers</div>
          </div>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <div className="payroll-stat-card psc-tax">
            <div className="psc-icon"><MdReceipt /></div>
            <div className="psc-label">Total Deductions</div>
            <div className="psc-value">{fmtKLCr(totalTax)}</div>
            <div className="psc-trend">Tax &amp; PF included</div>
          </div>
        </Col>
      </Row>

      {/* ── Search & Filter ── */}
      <Row className="mb-3 g-3 stagger-3">
        <Col xs={12} md={5} lg={4}>
          <div className="position-relative">
            <MdSearch className="position-absolute text-muted" style={{top:'50%',left:'1rem',transform:'translateY(-50%)'}} size={18} />
            <input
              className="modern-input ps-5"
              placeholder="Search employee or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </Col>
        <Col xs={12} md={7} lg={8} className="d-flex gap-3 justify-content-md-end" style={{zIndex:10,position:'relative'}}>
          <Dropdown drop="down">
            <Dropdown.Toggle as="button" className="export-payroll-btn">
              <MdFilterList size={16} /> {statusFilter === 'All' ? 'Filter by Status' : statusFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{backgroundColor:'var(--color-surface_container)',borderColor:'var(--border-ghost)',boxShadow:'0 0 16px rgba(255,255,255,0.08)'}} className="py-2 mt-2">
              {['All','Paid','Pending','Failed'].map(s => (
                <Dropdown.Item key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 ${statusFilter===s?'fw-bold':''}`}
                  style={{color:'var(--text-on-surface)', backgroundColor: statusFilter===s?'var(--color-surface_lowest)':'transparent'}}
                  onMouseEnter={e => { if(statusFilter!==s) e.target.style.backgroundColor='var(--color-surface_container_highest)'; }}
                  onMouseLeave={e => { if(statusFilter!==s) e.target.style.backgroundColor='transparent'; }}
                >
                  {s === 'All' ? 'All Statuses' : s}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* ── Table ── */}
      <SalaryTable data={filtered} />

      {/* ── Bottom Cards ── */}
      <Row className="g-4 stagger-4">
        <Col xs={12} lg={5}>
          <div className="payroll-summary-card h-100">
            <h6 className="fw-bold mb-0">Department Breakdown</h6>
            <p className="text-muted mb-0" style={{fontSize:'0.72rem'}}>{pData.label} total spend by team</p>
            <div className="dept-bar-wrap">
              {pData.deptBreakdown.map(d => (
                <div className="dept-bar-row" key={d.name}>
                  <div className="dept-bar-meta">
                    <span>{d.name}</span>
                    <span style={{color:'var(--text-on-surface)',fontWeight:600}}>{fmtINR(d.total)}</span>
                  </div>
                  <div className="dept-bar-track">
                    <div className="dept-bar-fill" style={{width:`${d.pct}%`, background: d.color}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={12} lg={7}>
          <div className="payroll-summary-card h-100">
            <h6 className="fw-bold mb-1">Upcoming Payroll Schedule</h6>
            <p className="text-muted mb-3" style={{fontSize:'0.72rem'}}>Scheduled disbursements for next 60 days</p>
            <div className="d-flex flex-column gap-3">
              {upcomingSchedule.map(item => (
                <div key={item.label}
                  className="d-flex justify-content-between align-items-center p-3 rounded-3"
                  style={{background:'var(--color-surface_container_highest)',border:'1px solid var(--border-ghost)'}}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div style={{width:10,height:10,borderRadius:'50%',background:item.color,flexShrink:0}} />
                    <div>
                      <div className="fw-semibold" style={{fontSize:'0.85rem'}}>{item.label}</div>
                      <div className="text-muted" style={{fontSize:'0.72rem'}}>{item.count} employees</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div style={{fontSize:'0.80rem',color:item.color,fontWeight:700}}>{item.date}</div>
                    <div className="text-muted" style={{fontSize:'0.68rem'}}>Scheduled</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* ── Run Payroll Modal ── */}
      <Modal show={showModal} centered onHide={() => { if (runDone) setShowModal(false); }} backdrop="static">
        <Modal.Body style={{background:'var(--color-surface_container)',border:'1px solid var(--border-ghost)',borderRadius:16,padding:'2rem'}}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold m-0 text-on-surface d-flex align-items-center gap-2">
              <MdTrendingUp style={{color:'#b5c4ff'}} /> Run Payroll — {pData.label}
            </h5>
            {runDone && (
              <button onClick={() => setShowModal(false)} className="btn btn-link text-muted p-0">
                <MdClose size={22} />
              </button>
            )}
          </div>

          {/* Progress Steps */}
          <div className="d-flex flex-column gap-3 mb-4">
            {RUN_STEPS.map((step, i) => {
              const done   = i < runStep;
              const active = i === runStep;
              return (
                <div key={i} className="d-flex align-items-center gap-3">
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? '#34d399' : active ? '#b5c4ff' : 'var(--color-surface_container_highest)',
                    border: active ? '2px solid #b5c4ff' : '2px solid transparent',
                    transition: 'all 0.4s ease',
                    fontSize: '0.78rem', fontWeight: 700, color: done || active ? '#0d1226' : 'var(--text-muted)',
                  }}>
                    {done ? <MdVerified size={16} /> : i + 1}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: done ? '#34d399' : active ? 'var(--text-on-surface)' : 'var(--text-muted)',
                    fontWeight: active ? 600 : 400,
                    transition: 'color 0.4s ease',
                  }}>
                    {step}
                  </div>
                  {active && !runDone && (
                    <div className="ms-auto">
                      <div className="payroll-spinner" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{height:6, background:'var(--color-surface_container_highest)', borderRadius:99, overflow:'hidden'}}>
            <div style={{
              height:'100%', borderRadius:99,
              background: runDone ? '#34d399' : 'linear-gradient(90deg,#b5c4ff,#83a0ff)',
              width: `${Math.round((runStep / (RUN_STEPS.length - 1)) * 100)}%`,
              transition: 'width 0.8s ease, background 0.5s',
            }} />
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted" style={{fontSize:'0.70rem'}}>Processing…</span>
            <span style={{fontSize:'0.70rem', color: runDone ? '#34d399' : '#b5c4ff', fontWeight:600}}>
              {Math.round((runStep / (RUN_STEPS.length - 1)) * 100)}%
            </span>
          </div>

          {runDone && (
            <button className="run-payroll-btn w-100 justify-content-center mt-4" onClick={() => setShowModal(false)}>
              <MdVerified size={18} /> Done — Close
            </button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payroll;
