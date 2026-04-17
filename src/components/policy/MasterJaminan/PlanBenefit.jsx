import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/Policy.css";
import api from "../../../services/api";

const PlanBenefit = () => {
  const navigate = useNavigate();
  const { programId, planCode } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [benefitList, setBenefitList] = useState([]);
  const [planDetail, setPlanDetail] = useState(null);

  const [formData, setFormData] = useState({
    benefitName: "",
    yearLimit: "",
    benefitDescription: "",
  });

  //FETCH PLAN DETAIL + BENEFIT LIST
  const fetchData = async () => {
    setFetchLoading(true);
    try {
      // ambil detail plan
      const planRes = await api.get(
        `/master-jaminan/${programId}/plans/${planCode}`
      );
      setPlanDetail(planRes.data);

      // ambil benefit list
      const benefitRes = await api.get(`/plans/${planCode}/benefits`);
      setBenefitList(benefitRes.data || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Gagal mengambil data benefit",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [programId, planCode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //SUBMIT + REFETCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post(`/plans/${planCode}/benefits`, {
        ...formData,
        programId,
      });

      setMessage({
        type: "success",
        text: "Benefit berhasil ditambahkan!",
      });

      setFormData({
        benefitName: "",
        yearLimit: "",
        benefitDescription: "",
      });

      setShowForm(false);

      await fetchData();
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
      {/* HEADER */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => navigate(`/policy/master-jaminan/${programId}/plan`)}
        >
          ← Kembali ke Plan
        </button>

        {planDetail && (
          <div style={{ marginTop: "10px", fontSize: "13px" }}>
            <strong>Program ID:</strong> {programId} |{" "}
            <strong>Plan Code:</strong> {planDetail.planCode} |{" "}
            <strong>Plan Name:</strong> {planDetail.planName}
          </div>
        )}
      </div>

      <h1>Plan Benefit</h1>

      {/* BUTTON */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Batal" : "+ Tambah Benefit"}
      </button>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="benefitName"
            value={formData.benefitName}
            onChange={handleChange}
            placeholder="Benefit Name"
            required
          />

          <input
            type="number"
            name="yearLimit"
            value={formData.yearLimit}
            onChange={handleChange}
            placeholder="Year Limit"
          />

          <textarea
            name="benefitDescription"
            value={formData.benefitDescription}
            onChange={handleChange}
            placeholder="Deskripsi Benefit"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Benefit"}
          </button>
        </form>
      )}

      {/* MESSAGE */}
      {message && <div>{message.text}</div>}

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Benefit Name</th>
            <th>Year Limit</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {fetchLoading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : benefitList.length === 0 ? (
            <tr>
              <td colSpan="3">Belum ada benefit</td>
            </tr>
          ) : (
            benefitList.map((item) => (
              <tr key={item.benefitId || item.benefitName}>
                <td>{item.benefitName}</td>
                <td>{item.yearLimit}</td>
                <td>{item.benefitDescription}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlanBenefit;
