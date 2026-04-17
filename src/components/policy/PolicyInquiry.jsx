import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Policy.css";

const PolicyInquiry = () => {
  return (
    <div className="policy-inquiry">
      <div className="page-header">
        <h1>Policy Inquiry</h1>
        <p>Kelola data policy, payor, plan, dan participant</p>
      </div>

      <div className="menu-cards">
        <Link to="/policy/payor" className="menu-card">
          <div className="card-icon">🏢</div>
          <h3>Registrasi Payor</h3>
          <p>Pendaftaran perusahaan/lembaga payor</p>
        </Link>

        <Link to="/policy/plan" className="menu-card">
          <div className="card-icon">📊</div>
          <h3>Registrasi Plan</h3>
          <p>Pendaftaran paket/asuransi kesehatan</p>
        </Link>

        <Link to="/policy/participant" className="menu-card">
          <div className="card-icon">👥</div>
          <h3>Registrasi Participant</h3>
          <p>Pendaftaran peserta/pasien</p>
        </Link>
      </div>
    </div>
  );
};

export default PolicyInquiry;
