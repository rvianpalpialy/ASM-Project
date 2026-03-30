import React, { useState } from 'react';
import '../../styles/Policy.css';

const RegistrasiParticipant = () => {
  const [formData, setFormData] = useState({
    participantId: '',
    fullName: '',
    nik: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    address: '',
    planCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrasi Participant berhasil!\n' + JSON.stringify(formData, null, 2));
    setFormData({
      participantId: '',
      fullName: '',
      nik: '',
      dateOfBirth: '',
      gender: '',
      phone: '',
      address: '',
      planCode: ''
    });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Registrasi Participant</h1>
        <p>Silahkan isi form pendaftaran participant di bawah ini</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label>ID Participant *</label>
            <input
              type="text"
              name="participantId"
              value={formData.participantId}
              onChange={handleChange}
              placeholder="Contoh: PART001"
              required
            />
          </div>

          <div className="form-group">
            <label>NIK *</label>
            <input
              type="text"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="Nomor Induk Kependudukan"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Nama Lengkap *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nama lengkap sesuai KTP"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tanggal Lahir</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Jenis Kelamin</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Pilih</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>No. Telepon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0812-xxxx-xxxx"
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

        <div className="form-group">
          <label>Kode Plan</label>
          <input
            type="text"
            name="planCode"
            value={formData.planCode}
            onChange={handleChange}
            placeholder="PLN001"
          />
        </div>

        <button type="submit" className="btn-submit">Simpan Participant</button>
      </form>
    </div>
  );
};

export default RegistrasiParticipant;