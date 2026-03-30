import React from 'react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Active Participant', value: '1.200', change: '+20', icon: '' },
    { title: 'Active Claims', value: '89', change: '+5%', icon: '' },
    { title: 'Total Claims (IDR)', value: '45.700.000', change: '+8%', icon: '' },
    { title: 'All Participants', value: '2.200', change: '+15%', icon: '' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Selamat datang di Enrollment Portal - Healthcare Provider</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activities">
        <h2>Aktivitas Terbaru</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">1.</div>
            <div className="activity-detail">
              <p>Endorsement Plan Automation</p>
              <small>2 menit yang lalu</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">2.</div>
            <div className="activity-detail">
              <p>Claim diajukan - #CLM-2026-001</p>
              <small>1 jam yang lalu</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">3.</div>
            <div className="activity-detail">
              <p>Endorsement Penambahan Peserta</p>
              <small>3 jam yang lalu</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;