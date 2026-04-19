import React, { useState, useEffect } from "react";
import axios from "axios";

function Inquiries() {
  const API_URL = "http://localhost:5000/api/inquiries";

  const [inquiries, setInquiries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ status: "" });

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ FETCH
  const fetchInquiries = async () => {
    try {
      setListLoading(true);
      const res = await axios.get(API_URL);

      let data = res.data;

      // 🔥 SORT: new → read → replied
      const order = { new: 1, read: 2, replied: 3 };
      data.sort((a, b) => order[a.status] - order[b.status]);

      setInquiries(data);
      setFiltered(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // ✅ SEARCH FILTER
  useEffect(() => {
    const lower = search.toLowerCase();

    const filteredData = inquiries.filter((inq) => {
      return (
        inq.user?.name?.toLowerCase().includes(lower) ||
        inq.user?.email?.toLowerCase().includes(lower) ||
        inq.message?.toLowerCase().includes(lower) ||
        inq.status?.toLowerCase().includes(lower)
      );
    });

    setFiltered(filteredData);
  }, [search, inquiries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ UPDATE STATUS
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    const token = localStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Updated successfully");
      setEditingId(null);
      setForm({ status: "" });

      fetchInquiries();
    } catch (err) {
      setError("Update failed");
    }
  };

  const handleEdit = (inq) => {
    setEditingId(inq._id);
    setForm({ status: inq.status });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "text-blue-600";
      case "read":
        return "text-yellow-600";
      case "replied":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Inquiries</h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by name, email, message, status..."
          className="border p-2 rounded w-full mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EDIT FORM */}
      {editingId && (
        <div className="bg-white shadow p-4 rounded">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>

            <button className="bg-blue-600 text-white px-3 rounded">
              Update
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="border px-3 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="bg-white shadow rounded p-4">
        {listLoading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No data found</p>
        ) : (
          filtered.map((inq) => (
            <div key={inq._id} className="border-b p-3 flex justify-between">
              <div>
                <p>
                  <b>Name:</b> {inq.user?.name || "N/A"}
                </p>
                <p>
                  <b>Email:</b> {inq.user?.email || "N/A"}
                </p>
                <p>
                  <b>Message:</b> {inq.message || "N/A"}
                </p>
                <p>
                  <b>Date:</b> {new Date(inq.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <b>Time:</b> {new Date(inq.createdAt).toLocaleTimeString()}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`capitalize font-semibold ${getStatusColor(inq.status)}`}
                  >
                    {inq.status}
                  </span>
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(inq)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button className="text-red-600">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Inquiries;
