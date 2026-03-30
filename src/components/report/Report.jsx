import React, { useState } from 'react';
import '../../styles/Report.css';

const Report = () => {
  const [reportType, setReportType] = useState('claim');
  const [dateRange, setDateRange] = useState({ start: '2026-03-01', end: '2026-03-31' });

  const handleGenerate = () => {
    alert(`Report ${reportType} untuk periode ${dateRange.start} s/d ${dateRange.end} akan digenerate`);
  };

  const handleExport = () => {
    alert('Export report dalam format Excel');
  };

  return (
    <div className="report-container">
      <div className="page-header">
        <h1>Report</h1>
        <p>Generate dan export laporan</p>
      </div>

      <div className="report-filters">
        <div className="filter-group">
          <label>Tipe Report</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="claim">Laporan Klaim</option>
            <option value="policy">Laporan Policy</option>
            <option value="payor">Laporan Payor</option>
            <option value="participant">Laporan Participant</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Periode Mulai</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Periode Akhir</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </div>

        <div className="filter-actions">
          <button className="btn-generate" onClick={handleGenerate}>Generate Report</button>
          <button className="btn-export" onClick={handleExport}>Export Excel</button>
        </div>
      </div>

      <div className="report-preview">
        <h3>Preview Report</h3>
        <div className="preview-card">
          <div className="preview-header">
            <h4>Ringkasan {reportType === 'claim' ? 'Klaim' : reportType === 'policy' ? 'Policy' : 'Data'}</h4>
            <span>Periode: {dateRange.start} s/d {dateRange.end}</span>
          </div>
          <div className="preview-stats">
            <div className="preview-stat">
              <p>Total Data</p>
              <h2>0</h2>
            </div>
            <div className="preview-stat">
              <p>Pending</p>
              <h2>0</h2>
            </div>
            <div className="preview-stat">
              <p>Completed</p>
              <h2>0</h2>
            </div>
          </div>
          <div className="preview-note">
            <small>Klik "Generate Report" untuk melihat data sebenarnya</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;