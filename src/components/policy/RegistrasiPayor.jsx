import React, { useState } from "react";
import "../../styles/Policy.css";
import api from "../../services/api";

const RegistrasiPayor = () => {
  const [formData, setFormData] = useState({
    payorCode: "",
    payorName: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    policyNo: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const formatToDisplay = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatToInput = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "date") {
      setFormData({
        ...formData,
        [name]: formatToDisplay(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post("/payor", formData);

      setMessage({
        type: "success",
        text: "Registrasi Payor berhasil disimpan!",
      });

      // reset form seperti sebelumnya
      setFormData({
        payorCode: "",
        payorName: "",
        address: "",
        phone: "",
        email: "",
        contactPerson: "",
        policyNo: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          "Gagal: " +
          (err.response?.data?.error || "Server tidak bisa dihubungi"),
      });
    } finally {
      setLoading(false);
    }
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

        <div className="form-group">
          <label>Policy No</label>
          <input
            type="text"
            name="policyNo"
            value={formData.policyNo}
            onChange={handleChange}
            placeholder="Contoh: 1250000000"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formatToInput(formData.startDate)}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formatToInput(formData.endDate)}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Notifikasi sukses / error */}
        {message && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "16px",
              borderRadius: "6px",
              background: message.type === "success" ? "#e6f4ea" : "#fce8e6",
              color: message.type === "success" ? "#1e7e34" : "#c0392b",
              border:
                message.type === "success"
                  ? "1px solid #a8d5b5"
                  : "1px solid #f5a9a9",
            }}
          >
            {message.text}
          </div>
        )}

        {/* Tombol — tambah disabled saat loading */}
        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Menyimpan..." : "Simpan Payor"}
        </button>
      </form>
    </div>
  );
};
export default RegistrasiPayor;
