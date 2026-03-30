import React, { useState } from 'react';
import '../../styles/Claim.css';

const HistoryClaim = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [claims] = useState([
    {
      id: 'CLM001',
      date: '2026-03-15',
      participant: 'Budi Santoso',
      type: 'Rawat Inap',
      amount: 15000000,
      status: 'Approved'
    },
    {
      id: 'CLM002',
      date: '2026-03-10',
      participant: 'Siti Rahayu',
      type: 'Rawat Jalan',
      amount: 2500000,
      status: 'Pending'
    },
    {
      id: 'CLM003',
      date: '2026-03-05',
      participant: 'Ahmad Wijaya',
      type: 'Lab',
      amount: 850000,
      status: 'Rejected'
    },
    {
      id: 'CLM004',
      date: '2026-02-28',
      participant: 'Dewi Lestari',
      type: 'Rawat Inap',
      amount: 22500000,
      status: 'Approved'
    }
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <span className="badge approved">Disetujui</span>;
      case 'Pending': return <span className="badge pending">Pending</span>;
      case 'Rejected': return <span className="badge rejected">Ditolak</span>;
      default: return <span>{status}</span>;
    }
  };

  const filteredClaims = claims.filter(claim =>
    claim.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="history-container">
      <div className="page-header">
        <h1>History Claim</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Cari berdasarkan ID atau nama participant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>ID Claim</th>
              <th>Tanggal</th>
              <th>Participant</th>
              <th>Jenis Layanan</th>
              <th>Nilai Claim</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.id}</td>
                <td>{claim.date}</td>
                <td>{claim.participant}</td>
                <td>{claim.type}</td>
                <td>{formatCurrency(claim.amount)}</td>
                <td>{getStatusBadge(claim.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClaims.length === 0 && (
          <div className="no-data">Tidak ada data claim ditemukan</div>
        )}
      </div>
    </div>
  );
};

export default HistoryClaim;