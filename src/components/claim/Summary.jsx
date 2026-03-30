import React, { useState } from 'react';
import '../../styles/Claim.css';

const Summary = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [summaryData] = useState({
    totalClaims: 234,
    totalApproved: 198,
    totalRejected: 36,
    totalAmount: 456789000,
    averageProcessing: 5.2,
    claimByType: [
      { type: 'Rawat Inap', count: 89, amount: 234567000 },
      { type: 'Rawat Jalan', count: 112, amount: 123456000 },
      { type: 'Lab & Radiologi', count: 33, amount: 98766000 }
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="summary-container">
      <div className="page-header">
        <h1>Summary Claim</h1>
        <div className="filter-control">
          <label>Periode: </label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="2024-01">Januari 2026</option>
            <option value="2024-02">Februari 2026</option>
            <option value="2024-03">Maret 2026</option>
          </select>
        </div>
      </div>

      <div className="summary-stats">
        <div className="summary-card">
          <div className="summary-icon"></div>
          <div className="summary-info">
            <h3>{summaryData.totalClaims}</h3>
            <p>Total Klaim</p>
          </div>
        </div>

        <div className="summary-card success">
          <div className="summary-icon"></div>
          <div className="summary-info">
            <h3>{summaryData.totalApproved}</h3>
            <p>Disetujui</p>
          </div>
        </div>

        <div className="summary-card danger">
          <div className="summary-icon"></div>
          <div className="summary-info">
            <h3>{summaryData.totalRejected}</h3>
            <p>Ditolak</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon"></div>
          <div className="summary-info">
            <h3>{formatCurrency(summaryData.totalAmount)}</h3>
            <p>Total Nilai Klaim</p>
          </div>
        </div>
      </div>

      <div className="summary-table">
        <h3>Detail Klaim per Jenis Layanan</h3>
        <table>
          <thead>
            <tr>
              <th>Jenis Layanan</th>
              <th>Jumlah Klaim</th>
              <th>Total Nilai</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.claimByType.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.count}</td>
                <td>{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;