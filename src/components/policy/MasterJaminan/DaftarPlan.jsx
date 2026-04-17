import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/Policy.css";
import api from "../../../services/api";

const DaftarPlan = () => {
  const navigate = useNavigate();
  const { programId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [planList, setPlanList] = useState([]);
  const [programDetail, setProgramDetail] = useState(null);

  const [formData, setFormData] = useState({
    payorId: "",
    planCode: "",
    planType: "",
    coverage: "",
    planName: "",
    effectiveDate: "",
  });

  //FETCH PROGRAM DETAIL + PLAN LIST
  const fetchData = async () => {
    setFetchLoading(true);
    try {
      //ambil detail master
      const programRes = await api.get(`/master-jaminan/${programId}`);
      setProgramDetail(programRes.data);

      //ambil list plan
      const planRes = await api.get(`/master-jaminan/${programId}/plans`);
      setPlanList(planRes.data || []);

      //auto isi payor dari master
      setFormData((prev) => ({
        ...prev,
        payorId: programRes.data?.payorId || "",
      }));
    } catch (err) {
      setMessage({
        type: "error",
        text: "Gagal mengambil data plan",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [programId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //SUBMIT + REFETCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post(`/master-jaminan/${programId}/plans`, formData);

      setMessage({ type: "success", text: "Plan berhasil ditambahkan!" });

      setFormData({
        payorId: programDetail?.payorId || "",
        planCode: "",
        planType: "",
        coverage: "",
        planName: "",
        effectiveDate: "",
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
      {/*HEADER*/}
      <div style={{ marginBottom: "16px" }}>
        <button onClick={() => navigate("/policy/master-jaminan")}>
          ← Kembali
        </button>

        {programDetail && (
          <div style={{ marginTop: "10px", fontSize: "13px" }}>
            <strong>Program ID:</strong> {programDetail.programId} |{" "}
            <strong>Program Name:</strong> {programDetail.programName} |{" "}
            <strong>Payor:</strong> {programDetail.payorId}
          </div>
        )}
      </div>

      <h1>Daftar Plan</h1>

      {/*BUTTON*/}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Batal" : "+ Tambah Plan"}
      </button>

      {/*FORM */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            name="planCode"
            value={formData.planCode}
            onChange={handleChange}
            placeholder="Kode Plan"
            required
          />

          <input
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            placeholder="Nama Plan"
            required
          />

          <select
            name="coverage"
            value={formData.coverage}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Coverage</option>
            <option value="IP">IP</option>
            <option value="OP">OP</option>
          </select>

          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      )}

      {/*MESSAGE*/}
      {message && <div>{message.text}</div>}

      {/*TABLE*/}
      <table>
        <thead>
          <tr>
            <th>Plan Code</th>
            <th>Plan Name</th>
            <th>Coverage</th>
            <th>Effective Date</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {fetchLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : planList.length === 0 ? (
            <tr>
              <td colSpan="5">Belum ada plan</td>
            </tr>
          ) : (
            planList.map((item) => (
              <tr key={item.planCode}>
                <td>{item.planCode}</td>
                <td>{item.planName}</td>
                <td>{item.coverage}</td>
                <td>
                  {item.effectiveDate
                    ? new Date(item.effectiveDate).toLocaleDateString("id-ID")
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/policy/master-jaminan/${programId}/plan/${item.planCode}/benefit`
                      )
                    }
                  >
                    Benefit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarPlan;
