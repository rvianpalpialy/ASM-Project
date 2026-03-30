import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Claim.css';

const ClaimInquiry = () => {
  return (
    <div className="claim-inquiry">
      <div className="page-header">
        <h1>Claim Inquiry</h1>
        <p>Informasi dan monitoring klaim</p>
      </div>

      <div className="menu-cards">
        <Link to="/claim/summary" className="menu-card">
          <div className="card-icon"></div>
          <h3>Summary</h3>
          <p>Ringkasan klaim per periode</p>
        </Link>

        <Link to="/claim/history" className="menu-card">
          <div className="card-icon"></div>
          <h3>History Claim</h3>
          <p>Riwayat pengajuan klaim</p>
        </Link>
      </div>
    </div>
  );
};

export default ClaimInquiry;