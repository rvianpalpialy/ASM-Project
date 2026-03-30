import React, { useState } from 'react';
import '../../styles/Policy.css';

const RegistrasiPayor = () => {
  const [formData, setFormData] = useState({
    payorCode: '',
    payorName: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrasi Payor berhasil!\n' + JSON.stringify(formData, null, 2));
    setFormData({
      payorCode: '',
      payorName: '',
      address: '',
      phone: '',
      email: '',
      contactPerson: ''
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Registrasi Payor</h1>
        <p>Silahkan isi form pendaftaran payor di bawah ini</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Kode Payor *</label>
          <input
            type="text"
            name="payorCode"
            value={formData.payorCode}
            onChange={handleChange}
            placeholder="Contoh: PAY001"
            required
          />
        </div>

        <div className="form-group">
          <label>Nama Payor *</label>
          <input
            type="text"
            name="payorName"
            value={formData.payorName}
            onChange={handleChange}
            placeholder="Nama perusahaan/lembaga"
            required
          />
        </div>

        <div className="form-group">
          <label>Alamat</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Alamat lengkap"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>No. Telepon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="021-xxxxxxx"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@perusahaan.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Nama PIC"
          />
        </div>

        <button type="submit" className="btn-submit">Simpan Payor</button>
      </form>
    </div>
  );
};

export default RegistrasiPayor;