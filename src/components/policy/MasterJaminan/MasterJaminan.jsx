import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Policy.css";
import api from "../../../services/api";

const MasterJaminan = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [masterList, setMasterList] = useState([]);

  const [formData, setFormData] = useState({
    payorId: "",
    coverage: "",
    programId: "",
    programName: "",
  });

  //FETCH DATA (INIT LOAD)
  const fetchMaster = async () => {
    setFetchLoading(true);
    try {
      const res = await api.get("/master-jaminan");
      setMasterList(res.data || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Gagal mengambil data master jaminan",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchMaster();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //SUBMIT + REFETCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post("/master-jaminan", formData);

      setMessage({
        type: "success",
        text: "Master Jaminan berhasil ditambahkan!",
      });

      //RESET FORM
      setFormData({
        payorId: "",
        coverage: "",
        programId: "",
        programName: "",
      });

      setShowForm(false);

      //REFETCH DATA (INI KUNCI)
      await fetchMaster();
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
        <h1>Master Program Jaminan</h1>
      </div>

      {/*Tombol Tambah*/}
      <div style={{ marginBottom: "16px" }}>
        <button
          className="btn-submit"
          style={{ width: "auto", padding: "8px 20px" }}
          onClick={() => {
            setShowForm(!showForm);
            setMessage(null);
          }}
        >
          {showForm ? "Batal" : "+ Tambah Master Jaminan"}
        </button>
      </div>

      {/*Form*/}
      {showForm && (
        <div className="form-section" style={{ marginBottom: "24px" }}>
          <h3 className="section-title">Form Tambah Master Jaminan</h3>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label>Payor ID *</label>
                <input
                  type="text"
                  name="payorId"
                  value={formData.payorId}
                  onChange={handleChange}
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
                <label>Program ID *</label>
                <input
                  type="text"
                  name="programId"
                  value={formData.programId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Program Name *</label>
                <input
                  type="text"
                  name="programName"
                  value={formData.programName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {message && (
              <div
                style={{
                  padding: "12px",
                  marginBottom: "16px",
                  borderRadius: "6px",
                  background:
                    message.type === "success" ? "#e6f4ea" : "#fce8e6",
                }}
              >
                {message.text}
              </div>
            )}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
      )}

      {/*Table*/}
      <div>
        <p style={{ marginBottom: "8px" }}>Total Data: {masterList.length}</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Payor ID</th>
              <th>Coverage</th>
              <th>Program ID</th>
              <th>Program Name</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {fetchLoading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Loading data...
                </td>
              </tr>
            ) : masterList.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Belum ada data
                </td>
              </tr>
            ) : (
              masterList.map((item) => (
                <tr key={item.programId}>
                  <td>{item.payorId}</td>
                  <td>{item.coverage}</td>
                  <td>{item.programId}</td>
                  <td>{item.programName}</td>
                  <td>
                    <button
                      className="btn-submit"
                      style={{
                        width: "auto",
                        padding: "6px 16px",
                        fontSize: "12px",
                      }}
                      onClick={() =>
                        navigate(
                          `/policy/master-jaminan/${item.programId}/plan`
                        )
                      }
                    >
                      Daftar Plan
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterJaminan;
