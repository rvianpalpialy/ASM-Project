import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import PolicyInquiry from './components/policy/PolicyInquiry.jsx'
import RegistrasiPayor from './components/policy/RegistrasiPayor.jsx'
import RegistrasiPlan from './components/policy/RegistrasiPlan.jsx'
import RegistrasiParticipant from './components/policy/RegistrasiParticipant.jsx'
import ClaimInquiry from './components/claim/ClaimInquiry.jsx'
import Summary from './components/claim/Summary.jsx'
import HistoryClaim from './components/claim/HistoryClaim.jsx'
import Report from './components/report/Report.jsx'
import './styles/App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Menu Utama */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/policy" element={<PolicyInquiry />} />
          <Route path="/claim" element={<ClaimInquiry />} />
          <Route path="/report" element={<Report />} />

          {/* Sub Menu Policy */}
          <Route path="/policy/payor" element={<RegistrasiPayor />} />
          <Route path="/policy/plan" element={<RegistrasiPlan />} />
          <Route path="/policy/participant" element={<RegistrasiParticipant />} />

          {/* Sub Menu Claim */}
          <Route path="/claim/summary" element={<Summary />} />
          <Route path="/claim/history" element={<HistoryClaim />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App