import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    bookings: 0,
    users: 0,
    inquiries: 0,
  });

  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [servicesRes, bookingsRes, usersRes, inquiriesRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/services", config),
          axios.get("http://localhost:5000/api/bookings", config),
          axios.get("http://localhost:5000/api/users", config),
          axios.get("http://localhost:5000/api/inquiries", config),
        ]);

      setStats({
        services: servicesRes.data.length,
        bookings: bookingsRes.data.length,
        users: usersRes.data.length,
        inquiries: inquiriesRes.data.length,
      });

      // only pending inquiries
      const pending = inquiriesRes.data.filter(
        (inq) => inq.status !== "replied",
      );

      setInquiries(pending);
    } catch (error) {
      console.log("Dashboard error:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Services</h2>
          <p className="text-2xl font-bold">{stats.services}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Bookings</h2>
          <p className="text-2xl font-bold">{stats.bookings}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Pending Inquiries</h2>
          <p className="text-2xl font-bold">{inquiries.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
