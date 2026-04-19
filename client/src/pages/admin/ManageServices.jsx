import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageServices() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    isActive: true,
  });

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ FETCH SERVICES
  const fetchServices = async () => {
    try {
      setListLoading(true);
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ SUBMIT (ADD OR UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      if (editingId) {
        // 🔥 UPDATE
        await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          { ...form, price: Number(form.price) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSuccess("Service updated successfully ✅");
      } else {
        // 🔥 CREATE
        await axios.post(
          "http://localhost:5000/api/services",
          { ...form, price: Number(form.price) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSuccess("Service added successfully ✅");
      }

      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        isActive: true,
      });

      setEditingId(null);
      fetchServices();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDIT CLICK
  const handleEdit = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
      imageUrl: service.imageUrl,
      isActive: service.isActive,
    });

    setEditingId(service._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // nice UX
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchServices();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <p className="text-gray-500">
          Add, edit, and manage your agency services
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Service Title"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            required
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />

          <div className="col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-600">Active</span>
          </div>

          {/* ERROR / SUCCESS */}
          {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="col-span-2 text-green-600 text-sm">{success}</p>
          )}

          {/* BUTTON */}
          <div className="col-span-2 flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    title: "",
                    description: "",
                    price: "",
                    imageUrl: "",
                    isActive: true,
                  });
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? editingId
                  ? "Updating..."
                  : "Adding..."
                : editingId
                  ? "Update Service"
                  : "Add Service"}
            </button>
          </div>
        </form>
      </div>

      {/* SERVICE LIST */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">All Services</h2>

        {listLoading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500">No services found</p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  <p className="text-sm">Price: ${service.price}</p>
                  <p className="text-sm">Image: {service.imageUrl}</p>

                  <span
                    className={`text-xs ${
                      service.isActive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageServices;
