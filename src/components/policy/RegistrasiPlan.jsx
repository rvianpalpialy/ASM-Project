import React, { useState } from "react";
import "../../styles/Policy.css";
import api from "../../services/api";

const RegistrasiPlan = () => {
  const [formData, setFormData] = useState({
    // Section 1 — Registrasi Plan
    payorCode: "",
    coverage: "",
    planCode: "",
    planName: "",
    planType: "",
    effectiveDate: "",

    // Section 2 — Benefit List
    yearLimit: "",
    benefitName: "",
    benefitDescription: "",

    // Section 3 — Premi
    kategori: "",
    premiumAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post("/plan", formData);
      setMessage({
        type: "success",
        text: "Registrasi Plan berhasil disimpan!",
      });
      setFormData({
        payorCode: "",
        coverage: "",
        planCode: "",
        planName: "",
        planType: "",
        effectiveDate: "",
        yearLimit: "",
        benefitName: "",
        benefitDescription: "",
        kategori: "",
        premiumAmount: "",
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
        <h1>Registrasi Plan</h1>
        <p>Silahkan isi form pendaftaran plan di bawah ini</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        {/* ===== SECTION 1 — REGISTRASI PLAN ===== */}
        <div className="form-section">
          <h3 className="section-title">Data Plan</h3>

          <div className="form-row">
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
              <label>Coverage *</label>
              <select
                name="coverage"
                value={formData.coverage}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Coverage</option>
                <option value="IP">IP</option>
                <option value="OP">OP</option>
                <option value="MA">MA</option>
                <option value="GL">GL</option>
                <option value="DL">DL</option>
                <option value="SC">SC</option>
              </select>
            </div>
          </div>

          <div className="form-row">
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
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipe Plan</label>
              <select
                name="planType"
                value={formData.planType}
                onChange={handleChange}
              >
                <option value="">Pilih Tipe Plan</option>
                <option value="individual">Individual</option>
                <option value="family">Family</option>
                <option value="corporate">Corporate</option>
              </select>
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
          </div>
        </div>

        {/* ===== SECTION 2 — BENEFIT LIST ===== */}
        <div className="form-section">
          <h3 className="section-title">Benefit List</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Benefit Name</label>
              <input
                type="text"
                name="benefitName"
                value={formData.benefitName}
                onChange={handleChange}
                placeholder="Contoh: Rawat Inap"
              />
            </div>

            <div className="form-group">
              <label>Year Limit</label>
              <input
                type="number"
                name="yearLimit"
                value={formData.yearLimit}
                onChange={handleChange}
                placeholder="Rp 0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Benefit Description</label>
            <textarea
              name="benefitDescription"
              value={formData.benefitDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Deskripsi benefit..."
            />
          </div>
        </div>

        {/* ===== SECTION 3 — PREMI ===== */}
        <div className="form-section">
          <h3 className="section-title">Premi</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
              >
                <option value="">Pilih Kategori</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
                <option value="Anak">Anak</option>
              </select>
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
        </div>

        {/* Notifikasi */}
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

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Menyimpan..." : "Simpan Plan"}
        </button>
      </form>
    </div>
  );
};

export default RegistrasiPlan;
