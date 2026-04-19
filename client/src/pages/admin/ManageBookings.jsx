import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageBookings() {
  const API_URL = "http://localhost:5000/api/bookings";

  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ status: "" });

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      setListLoading(true);

      const res = await axios.get(API_URL);
      let data = res.data;

      // ✅ SORT: pending → confirmed → cancelled
      const order = { pending: 1, confirmed: 2, cancelled: 3 };

      data.sort((a, b) => {
        return order[a.status] - order[b.status];
      });

      setBookings(data);
      setFiltered(data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
      setError("Failed to load bookings");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ---------------- SEARCH ----------------
  useEffect(() => {
    const lower = search.toLowerCase();

    const result = bookings.filter((b) => {
      return (
        b.user?.name?.toLowerCase().includes(lower) ||
        b.user?.email?.toLowerCase().includes(lower) ||
        b.status?.toLowerCase().includes(lower) ||
        b.time?.toLowerCase().includes(lower) ||
        new Date(b.date).toLocaleDateString().includes(lower)
      );
    });

    setFiltered(result);
  }, [search, bookings]);

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- UPDATE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) return;

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      await axios.put(`${API_URL}/${editingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Booking updated successfully ✅");

      setForm({ status: "" });
      setEditingId(null);

      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (b) => {
    setForm({ status: b.status || "pending" });
    setEditingId(b._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchBookings();
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  // ---------------- STATUS COLORS ----------------
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "confirmed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Bookings</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search name, email, status, date, time..."
          className="border p-2 rounded w-full mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* EDIT FORM */}
      {editingId && (
        <div className="bg-white shadow rounded p-4">
          <form onSubmit={handleSubmit} className="flex gap-3 items-center">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="border px-3 py-2 rounded"
            >
              Cancel
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
      )}

      {/* LIST */}
      <div className="bg-white shadow rounded p-4">
        {listLoading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          filtered.map((b) => (
            <div
              key={b._id}
              className="border-b p-4 flex justify-between items-start"
            >
              <div>
                <p>
                  <b>UserName:</b> {b.user?.name ? b.user.name : "Guest"}
                </p>
                <p>
                  <b>Email:</b> {b.user?.email ? b.user.email : "N/A"}
                </p>
                <p>
                  <b>Service:</b> {b.serviceId?.title || "N/A"}
                </p>

                <p>
                  <b>Date:</b> {new Date(b.date).toLocaleDateString()}
                </p>

                <p>
                  <b>Time:</b> {b.time}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold capitalize ${getStatusColor(
                      b.status,
                    )}`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>

              <div className="space-x-3">
                <button onClick={() => handleEdit(b)} className="text-blue-600">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageBookings;
