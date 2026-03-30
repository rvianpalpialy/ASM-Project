import React, { useState } from 'react';
import '../../styles/Policy.css';

const RegistrasiPlan = () => {
  const [formData, setFormData] = useState({
    planCode: '',
    planName: '',
    planType: '',
    benefitLimit: '',
    premiumAmount: '',
    effectiveDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrasi Plan berhasil!\n' + JSON.stringify(formData, null, 2));
    setFormData({
      planCode: '',
      planName: '',
      planType: '',
      benefitLimit: '',
      premiumAmount: '',
      effectiveDate: ''
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Registrasi Plan</h1>
        <p>Silahkan isi form pendaftaran plan di bawah ini</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Kode Plan *</label>
          <input
            type="text"
            name="planCode"
            value={formData.planCode}
            onChange={handleChange}
            placeholder="Contoh: PLN001"
            required
          />
        </div>

        <div className="form-group">
          <label>Nama Plan *</label>
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            placeholder="Contoh: Paket Platinum"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipe Plan</label>
          <select name="planType" value={formData.planType} onChange={handleChange}>
            <option value="">Pilih Tipe Plan</option>
            <option value="individual">Individual</option>
            <option value="family">Family</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Limit Benefit</label>
            <input
              type="number"
              name="benefitLimit"
              value={formData.benefitLimit}
              onChange={handleChange}
              placeholder="Rp 0"
            />
          </div>

          <div className="form-group">
            <label>Premi</label>
            <input
              type="number"
              name="premiumAmount"
              value={formData.premiumAmount}
              onChange={handleChange}
              placeholder="Rp 0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tanggal Efektif</label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">Simpan Plan</button>
      </form>
    </div>
  );
};

export default RegistrasiPlan;